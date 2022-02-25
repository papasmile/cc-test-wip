
import { expect } from 'chai';
import dataSetup, { testSuccess } from '../framework/base.js';

let testData;

dataSetup('./test/getReservations.json', data => testData = data);

describe('getReservations', () => {

  describe('Primary Flow', () => {

    // single day stay
    const simpleUrl = '/getReservations?Checkin=2032-01-02T00:00:00.000Z&Checkout=2032-01-03T00:00:00.000Z';

    testSuccess('should return data properly', simpleUrl, response => {
      const subResponse = response.Reservations;

      if (!subResponse) fail('No reservation found in response');

      const reservationResponse = subResponse[Object.keys(subResponse)[0]];
      const reservationData = testData.Reservations[0];
      const campgroundData = testData.Campgrounds[0];
      const customerData = testData.Customers[0];

      expect(reservationResponse.CampgroundName).to.equal(campgroundData.urlName);
      expect(reservationResponse.Customer.FirstName).to.equal(customerData.firstName);
      expect(reservationResponse.Campsite.Id).to.greaterThan(0);
      expect(reservationResponse.ManagementReserved).to.equal(reservationData.managementReserved);
      expect(reservationResponse.ManagerCreated).to.equal(reservationData.managerCreated);
      expect(reservationResponse.ManagerUpdated).to.equal(reservationData.managerUpdated);
      expect(reservationResponse.Checkin).to.equal('2032-01-02T00:00:00Z');
      expect(reservationResponse.Checkout).to.equal('2032-01-03T00:00:00Z');
      expect(reservationResponse.TotalCharge).to.equal(reservationData.totalCharge);
      expect(reservationResponse.BaseRate).to.equal(reservationData.baseRate);
      expect(reservationResponse.Taxes).to.equal(reservationData.taxes);
      expect(reservationResponse.ProcessingFee).to.equal(reservationData.processingFee);
      expect(reservationResponse.DiscountAmount).to.equal(reservationData.discountAmount);
      expect(reservationResponse.DynamicAdjust).to.equal(reservationData.dynamicAdjust);
      expect(reservationResponse.DiscountId).to.equal(reservationData.discountId);
      expect(reservationResponse.CustomerNotes).to.equal(reservationData.customerNotes);
      expect(reservationResponse.Cancelled).to.equal('0001-01-01T00:00:00Z');
    });

  });

});
