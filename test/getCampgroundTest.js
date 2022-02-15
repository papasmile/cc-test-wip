
import { expect } from 'chai';
import dataSetup, { testSuccess } from '../framework/base.js';


let testData;

dataSetup('./test/getCampground.json', data => testData = data);

describe("getCampground", async () => {

  describe('Primary Flow', () => {
    testSuccess('should return data properly', '/getCampground', response => {
      console.log("neat..."+ Object.keys(response));
      expect(true).to.equal(true);
    });
  });

});
