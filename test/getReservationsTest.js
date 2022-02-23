
import { expect } from 'chai';
import dataSetup, { testSuccess } from '../framework/base.js';

let testData;

dataSetup('./test/getReservations.json', data => testData = data);

describe('getReservations', () => {

  describe('Primary Flow', () => {

    // single day stay
    const simpleUrl = '/getReservations?Checkin=2032-01-02T00:00:00.000Z&Checkout=2032-01-03T00:00:00.000Z';

    testSuccess('should return data properly', simpleUrl, response => {
      console.log(Object.keys(response));

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
      expect(reservationResponse.TotalCharge).to.equal(reservationData.managementReserved);
      expect(reservationResponse.ManagementReserved).to.equal(reservationData.managementReserved);
      expect(reservationResponse.ManagementReserved).to.equal(reservationData.managementReserved);
      expect(reservationResponse.ManagementReserved).to.equal(reservationData.managementReserved);


    });

  });

});
