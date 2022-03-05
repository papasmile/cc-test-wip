/*
  base.js provides test data management based on a json file and REST api test support.
*/

import request from 'supertest';
import { expect } from 'chai';
import mysql from 'mysql';
import fs from 'fs';
import { createData } from './tdm.js';

var connection = mysql.createConnection({
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PASS,
  database : process.env.DB_NAME
});

connection.connect();

const req = request(process.env.API_HOST);

/*

To initialize, call default export with a relative path to json data representing tables and columns.
A callback function can be passed to perform any extra pre-suite initalization or to capture json data.
If generated data (esp. a row identifier) is needed in tests, those can be run inside that callback function.

Example 'data.json':

{
	"Campgrounds": [{
		"name": "Test Campground",
		"urlName": "eng",
		"productionLive": 1
	}]
}

Example test code, 'test/mytest.js':

import setup from '../framework/base.js';

var testData;

dataSetup('./test/data.json', data => testData = data);

describe("my tests", () => { ... });

*/
const setupTest = (dataFile, baseUrl, extraInit) => {
  before(done => {
    fs.readFile(dataFile,'utf-8', (err,jsonString) => {
      const testData = JSON.parse(jsonString);
      const rowIds = {};
      createData(connection, testData, rowIds, 0, 0, () => {
        extraInit(testData, rowIds);
        done();
      });
    });
  });

  after(done => {
    connection.end(function(err) {
      done();
    });
  })

  describe(`Authentication for ${baseUrl}`, () => {
    it('requires authentication', function(done) {
      this.timeout(20000);
      req.get('/eng' + baseUrl)
        .set('X-API-Auth', '')
        .then(response => {
          if (response.statusCode === 401) done(); else throw Error('Expected authentication to fail');
        })
        .catch(err => { if (err.statusCode == 401) done(); else done(err); });
        // .end((err, res) => console.log(res)) // uncomment to debug
    });
  });
};

/*

  To test a successful REST GET scenario pass a descrption, route, and handler for response data.

  Example test code, 'test/mygettest.js':

  import { testSuccess } from '../framework/base.js';

  describe('my test', () => {
    testSuccess('should work', '/getCampground', response => { ... });
  });

*/
export const testSuccess = (scenario, url, handleSuccess) => {
  it(scenario, function(done) {
    this.timeout(20000);
    req.get('/eng' + url)
      .set('X-API-Auth', 'daa49316-bc03-4811-9781-d74c0defa62e')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => { handleSuccess(JSON.parse(response.text)); done(); })
      .catch(err => done(err));
      // .end((err, res) => console.log(res)) // uncomment to debug
  });
};

/*

  To test an unsuccessful REST GET scenario pass a descrption, route, and expected status code.

  Example test code, 'test/mygettest.js':

  import { testError } from '../framework/base.js';

  describe('my test', () => {
    testError('should not work', '/getAvailable', 400);
  });

*/
export const testError = (scenario, url, expectedStatus) => {
  it(scenario, function(done) {
    this.timeout(20000);
    req.get('/eng' + url)
      .set('X-API-Auth', 'daa49316-bc03-4811-9781-d74c0defa62e')
      .then(response => {
        if (response.statusCode === expectedStatus) done();
        else throw Error(`Expected ${expectedStatus} but got ${response.statusCode}`);
      })
      .catch(err => { if (err.statusCode === expectedStatus) done(); else done(err); });
  });
};

export default setupTest;
