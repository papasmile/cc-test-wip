import request from 'supertest';
import { expect } from 'chai';

const req = request('https://getcampground-ntxpstvepa-uc.a.run.app')

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
    req.get('/eng' + url)
      .set('X-API-Auth', 'daa49316-bc03-4811-9781-d74c0defa62e')
      .set('Accept', 'application/json')
      //.expect('Content-Type', /json/)  TODO: MENTION TO SIMON
      .expect(200)
      .then(response => { handleSuccess(JSON.parse(response.text)); done() })
      .catch(err => done(err))
      // .end((err, res) => console.log(res)) // uncomment to debug
  });
};
