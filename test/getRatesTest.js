
import { expect } from 'chai';
import dataSetup, { testSuccess, testError } from '../framework/base.js';

let testData;
let testRowIds;

dataSetup('./test/getRates.json', '/getRates', (data, rowIds) => {
  testData = data;
  testRowIds = rowIds;

  describe('getRates', () => {
    describe('Edge/Error Flows', edgeDataScenarios);
  });
});

describe('getRates', () => {

  describe('Primary Flow', () => {

    // single day stay
    const simpleUrl = '/getRates?Checkin=2032-01-02T00:00:00.000Z&Checkout=2032-01-03T00:00:00.000Z';

    testSuccess('should return data properly', simpleUrl, response => {
      const subResponse = response.Rates;

      if (!subResponse) fail('No rates found in response');

      const rateResponse = subResponse[Object.keys(subResponse)[0]];
      const rateData = testData.SiteRates[1];

      expect(rateResponse.BaseRate).to.equal(rateData.rate);
      expect(rateResponse.TotalCharge).to.equal(rateData.rate);
      expect(rateResponse.Tax).to.equal(0);
      expect(rateResponse.ProcFee).to.equal(0);
      expect(rateResponse.DiscountAmt).to.equal(0);
      expect(rateResponse.DynamicAdjust).to.equal(0);
    });

  });

  describe('Edge/Error Flows', () => {

    testError('Missing parameters return an error', '/getRates?Checkin=2032-01-02T00:00:00.000Z', 400);

  });

});

const edgeDataScenarios = () => {

  // with discount id param
  const baseDiscountUrl = '/getRates?Checkin=2032-01-02T00:00:00.000Z&Checkout=2032-01-03T00:00:00.000Z&DiscountId=';

  testSuccess('Discount can be applied', baseDiscountUrl + testRowIds['Discounts'][0], response => {
    const subResponse = response.Rates;

    if (!subResponse) fail('No rates found in response');

    const rateResponse = subResponse[Object.keys(subResponse)[0]];
    const rateData = testData.SiteRates[1];
    const discountData = testData.Discounts[0];

    expect(rateResponse.BaseRate).to.equal(rateData.rate);
    expect(rateResponse.TotalCharge).to.equal(rateData.rate - discountData.discount);
    expect(rateResponse.DiscountAmt).to.equal(discountData.discount);
  });

};
