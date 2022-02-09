
import { expect } from 'chai';
import dataSetup, { testSuccess } from '../framework/tryme.js';
import fs from 'fs';


describe("getCampground", async () => {
  await fs.readFile('./test/getCampground.json','utf-8', (err,jsonString) => {
      const data = JSON.parse(jsonString);
      dataSetup(data);
   });

  describe('Primary Flow', () => {
    testSuccess('should return data properly', '/somepath', response => {
      console.log("neat...");
      expect(true).to.equal(true);
    });
  });

});
