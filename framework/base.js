import request from 'supertest';
import { expect } from 'chai';
import mysql from 'mysql';

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
        doStuff(testData, () => {
          extraInit(testData);
          done();
        });
    });
  });

};

const doStuff = (testData, complete) => {
  const updates = {}; // table: row count
  const ticker = 0;

  // for each arg key, delete table, populate data from table
  Object.keys(testData).forEach(tableName => {
    testData[tableName].forEach(item => {
    ticker++;
    connection.query(`DELETE FROM ${tableName}`, (error, results, fields) => {
        connection.query(`INSERT INTO ${tableName} SET ?`, item, (error, results, fields) => {
          console.log(`row inserted into ${tableName}`);
          console.log(error);
          console.log(results);
          ticker--;
          if (ticker == 0) complete();
        });
      });
    })
  });
};

export default setupTest;

export const testSuccess = (scenario, url, handleSuccess) => {
  it(scenario, done => {
    this.timeout(20000);
    req.get('/eng' + url)
      .set('X-API-Auth', 'daa49316-bc03-4811-9781-d74c0defa62e')
      .set('Accept', 'application/json')
      //.expect('Content-Type', /json/)  TODO: MENTION TO SIMON
      .expect(200)
      .then(response => { handleSuccess(JSON.parse(response.text)); done() })
      .catch(err => done(err))
      // .end((err, res) => console.log(res)) // uncomment to debug
  });
};
