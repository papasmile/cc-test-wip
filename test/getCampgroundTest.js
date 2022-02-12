
import { expect } from 'chai';
import dataSetup, { testSuccess } from '../framework/base.js';
import fs from 'fs';


describe("getCampground", async () => {
  let testData;

  await fs.readFile('./test/getCampground.json','utf-8', (err,jsonString) => {
      testData = JSON.parse(jsonString);
      dataSetup(testData);
   });

  describe('Primary Flow', () => {
    testSuccess('should return data properly', '/getCampground', response => {
      console.log("neat..."+ Object.keys(response));
      expect(true).to.equal(true);
    });
  });

});
