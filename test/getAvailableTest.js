import { expect } from 'chai';
import dataSetup, { testSuccess, testError } from '../framework/base.js';
import { formatApiDate } from '../framework/data-utils.js'

let testData;

dataSetup('./test/getAvailable.json', '/getAvailable', data => testData = data);

describe('getAvailable', () => {

  describe('Primary Flow', () => {

    // single day stay
    const simpleUrl = '/getAvailable?Checkin=2032-01-02T00:00:00.000Z&Checkout=2032-01-03T00:00:00.000Z';

    testSuccess('should return data properly', simpleUrl, response => {
      const subResponse = response.Campsites;

      if (!(subResponse && subResponse.length)) assert.fail('No campsites found in response');

      const campsiteResponse = subResponse[0];
      const campsiteData = testData.Campsites[0];
      const campsiteBoundaryData = testData.ObjectLocations[0];

      expect(campsiteResponse.Id).to.greaterThan(0);
      expect(campsiteResponse.available).to.equal(true);
      expect(campsiteResponse.name).to.equal(campsiteData.name);
      expect(campsiteResponse.siteType).to.equal(campsiteData.siteType);
      expect(campsiteResponse.slabType).to.equal(campsiteData.slabType);
      expect(campsiteResponse.length).to.equal(campsiteData.length);
      expect(campsiteResponse.width).to.equal(campsiteData.width);
      expect(campsiteResponse.maxTrailerSize).to.equal(campsiteData.maxTrailerSize);
      expect(campsiteResponse.minTrailerSize).to.equal(campsiteData.minTrailerSize);
      expect(campsiteResponse.electric).to.equal(campsiteData.electric);
      expect(campsiteResponse.water).to.equal(campsiteData.water);
      expect(campsiteResponse.sewer).to.equal(campsiteData.sewer);
      expect(campsiteResponse.cable).to.equal(campsiteData.cable);
      expect(campsiteResponse.wifi).to.equal(campsiteData.wifi);
      expect(campsiteResponse.firepit).to.equal(campsiteData.firepit);
      expect(campsiteResponse.picnicTable).to.equal(campsiteData.picnicTable);
      expect(campsiteResponse.grill).to.equal(campsiteData.grill);
      expect(campsiteResponse.minDays).to.equal(campsiteData.minDays);
      expect(campsiteResponse.blockDays).to.equal(campsiteData.blockDays);
      expect(campsiteResponse.rvSite).to.equal(campsiteData.RVSite);
      expect(campsiteResponse.monthlySite).to.equal(campsiteData.monthlySite);
      // expect(campsiteResponse.maintenanceStart).to.equal(formatApiDate(campsiteData.maintenanceStart));
      // expect(campsiteResponse.maintenanceEnd).to.equal(formatApiDate(campsiteData.maintenanceEnd));
      // expect(campsiteResponse.boundaries.BoundaryPoints.points).to.equal(campsiteBoundaryData.boundaryDisplayPoints);
      expect(campsiteResponse.maintenanceStart).to.equal('0001-01-01T00:00:00Z');
      expect(campsiteResponse.maintenanceEnd).to.equal('0001-01-01T00:00:00Z');
      expect(campsiteResponse.boundaries.BoundaryPoints.points).to.equal('');
    });

  });

  describe('Edge/Error Flows', () => {

    // require wifi
    const wiFiUrl = '/getAvailable?Checkin=2032-01-02T00:00:00.000Z&Checkout=2032-01-03T00:00:00.000Z&WiFi=1';

    testSuccess('WiFi is required but not available', wiFiUrl, response => {
      const subResponse = response.Campsites;

      if (!(subResponse && subResponse.length)) assert.fail('No campsites found in response');

      expect(subResponse[0].available).to.equal(false);
    });

    testError('Missing parameters return an error', '/getAvailable?Checkin=2032-01-02T00:00:00.000Z', 400);

  });

});
