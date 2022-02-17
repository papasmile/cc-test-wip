import request from 'supertest';
import { expect } from 'chai';
import mysql from 'mysql';
import fs from 'fs';

const req = request('https://getcampground-ntxpstvepa-uc.a.run.app')

var connection = mysql.createConnection({
  host     : '34.122.228.45',
  user     : 'cceng',
  password : 'Eng56THabM7u',
  database : 'Campgrounds'
});

connection.connect();

const foreignKeyMap = {
  campgroundId: 'Campgrounds',
  campsiteId: 'Campsites'
}

const setupTest = (dataFile, extraInit) => {
  before(done => {
    fs.readFile(dataFile,'utf-8', (err,jsonString) => {
      const testData = JSON.parse(jsonString);
      createData(testData, {}, 0, 0, () => {
        console.log('a');
        extraInit(testData);
        console.log('b');
        done();
      });
    });
  });
};

const createData = (testData, rowIds, tableNameIndex, rowIndex, complete) => {
  if (rowIds[getTableName(testData, tableNameIndex)]) {
    peformInsert();
  } else {
    performDelete(testData, rowIds, tableNameIndex, rowIndex, complete);
  }
};

const getTableName = (testData, tableNameIndex) => {
  const tableNames = Object.keys(testData);
  const tableName = tableNames[tableNameIndex];
}

const performInsert = (testData, rowIds, tableNameIndex, rowIndex, complete) => {
  console.log('insert' + tableNameIndex);
  const tableName = getTableName(testData, tableNameIndex);
  const rawItem = testData[tableName][rowIndex];
  const item = swapIds(item, rowIds);
  connection.query(`INSERT INTO ${tableName} SET ?`, item, (error, results, fields) => {
    console.log(`row inserted into ${tableName}`);
    // console.log(error);
    // console.log(results);
    rowIds[tableName].push(results.insertId);
    if (rowIndex === testData[tableName].length -1) {
      if (tableNameIndex === tableNames.length - 1) {
        complete();
      } else {
        createData(testData, rowIds, tableNameIndex + 1, 0, complete);
      }
    } else {
      createData(testData, rowIds, tableNameIndex, rowIndex + 1, complete);
    }
  });
}

const swapIds = (rawItem, rowIds) => {
  const item = { ...rawItem };
  Object.keys(foreignKeyMap).forEach(key => {
    const foreignObjectIndex = item[key];
    if (foreignObjectIndex) item[key] = rowIds[foreignKeyMap[key]][foreignObjectIndex];
  })
}

const performDelete = (testData, rowIds, tableNameIndex, rowIndex, complete) => {
  console.log('delete' + tableNameIndex);
  const tableName = getTableName(testData, tableNameIndex);
  connection.query(`DELETE FROM ${tableName}`, (error, results, fields) => {
    if (error) {
      console.log(error);
      return complete();
    }
    rowIds[tableName] = [];
    createData(testData, rowIds, tableNameIndex, rowIndex, complete);
  });
}


export default setupTest;

export const testSuccess = (scenario, url, handleSuccess) => {
  it(scenario, function(done) {
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
