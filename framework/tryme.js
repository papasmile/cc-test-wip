import request from 'supertest';
import { expect } from 'chai';

const testo = (args, extraInit) => {
  const updates = {}; // table: row count

  before(() => {
    console.log(args);
    // for each arg key, delete table, populate data from table
    extraInit && extraInit();
  })

  describe("Setup", () => {
    it("does work", () => {
      // read db and validate updates 
      expect(true).to.equal(true);
    });
  });

};

export default testo;

export const testSuccess = (scenario, url, handleSuccess) => {
  it(scenario, function(done) {
    this.timeout(20000);
    request('http://api.campgroundcommander.com/')
        .get(url)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => { handleSuccess(response); done() })
        .catch(err => done(err));
    });
};
