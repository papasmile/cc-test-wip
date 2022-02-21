
import { expect } from 'chai';
import dataSetup, { testSuccess } from '../framework/base.js';

let testData;

dataSetup('./test/getRates.json', data => testData = data);

describe("getRates", () => {

  describe('Primary Flow', () => {

    // single day stay
    const simpleUrl = '/getRates?Checkin=2032-01-02T00:00:00.000Z&Checkout=2032-01-03T00:00:00.000Z';

    testSuccess('should return data properly', simpleUrl, response => {
      const rateResponse = response.Rates[Object.keys(response.Rates)[0]];
      const rateData = testData.SiteRates[1];

      expect(rateResponse.BaseRate).to.equal(rateData.rate);
      expect(rateResponse.TotalCharge).to.equal(rateData.rate);
      expect(rateResponse.Tax).to.equal(0);
      expect(rateResponse.ProcFee).to.equal(0);
      expect(rateResponse.DiscountAmt).to.equal(0);
      expect(rateResponse.DynamicAdjust).to.equal(0);
    });

  });

});
