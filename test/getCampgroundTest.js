
import { expect } from 'chai';
import dataSetup, { testSuccess } from '../framework/base.js';

let testData;

dataSetup('./test/getCampground.json', data => testData = data);

describe("getCampground", () => {

  describe('Primary Flow', () => {

    testSuccess('should return data properly', '/getCampground', response => {
      console.log("neat..."+ Object.keys(response));

      expect(true).to.equal(true);

      const campgroundData = testData.Campgrounds[0];
      const campgroundResponse = response.Campground;

      expect(campgroundResponse.Name).to.equal(campgroundData.name);

      const campsiteData = testData.Campsites[0];
      const campsiteResponse = campgroundResponse.Campsites[0];

      expect(campsiteResponse.name).to.equal(campsiteData.name);
    });

  });

});
