import request from 'supertest';
import { expect } from 'chai';
import mysql from 'mysql';
import fs from 'fs';
import { createData } from './tdm.js';

const req = request('https://getcampground-ntxpstvepa-uc.a.run.app')

var connection = mysql.createConnection({
  host     : '34.122.228.45',
  user     : 'cceng',
  password : 'Eng56THabM7u',
  database : 'Campgrounds'
});

connection.connect();

const setupTest = (dataFile, extraInit) => {
  before(done => {
    fs.readFile(dataFile,'utf-8', (err,jsonString) => {
      const testData = JSON.parse(jsonString);
      createData(connection, testData, {}, 0, 0, () => {
        extraInit(testData);
        done();
      });
    });
  });

  after(done => {
    connection.end(function(err) {
      done();
    });
  })
};

export const testSuccess = (scenario, url, handleSuccess) => {
  it(scenario, function(done) {
    this.timeout(20000);
    req.get('/eng' + url)
      .set('X-API-Auth', 'daa49316-bc03-4811-9781-d74c0defa62e')
      .set('Accept', 'application/json')
      //.expect('Content-Type', /json/)  TODO: MENTION TO SIMON
      .expect(200)
      .then(response => { handleSuccess(JSON.parse(response.text)); done(); })
      .catch(err => done(err))
      // .end((err, res) => console.log(res)) // uncomment to debug
  });
};

export default setupTest;
