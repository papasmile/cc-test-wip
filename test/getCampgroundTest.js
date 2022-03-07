
import { expect } from 'chai';
import dataSetup, { testSuccess } from '../framework/base.js';
import { formatApiDate } from '../framework/data-utils.js'

let testData;

dataSetup('./test/getCampground.json', '/getCampground', data => testData = data);

describe("getCampground", () => {

  describe('Primary Flow', () => {

    testSuccess('should return data properly', '/getCampground', response => {
      const campgroundResponse = response.Campground;
      const campgroundData = testData.Campgrounds[0];

      expect(campgroundResponse.Name).to.equal(campgroundData.name);

      const campsiteResponse = campgroundResponse.Campsites[0];
      const campsiteData = testData.Campsites[0];
      const bondaryData = testData.ObjectLocations[1];

      expect(campsiteResponse.Id).to.exist;
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
      expect(campsiteResponse.maintenanceStart).to.equal(formatApiDate(campsiteData.maintenanceStart));
      expect(campsiteResponse.maintenanceEnd).to.equal(formatApiDate(campsiteData.maintenanceEnd));
      expect(campsiteResponse.boundaries.BoundaryPoints.points).to.equal(boundaryData.boundaryDisplayPoints);

      const boundaryResponse = campgroundResponse.Boundaries;
      const boundaryData = testData.ObjectLocations[0];

      expect(boundaryResponse.BoundaryPoints.points).to.equal(boundaryData.boundaryDisplayPoints);
      expect(boundaryResponse.CenterPoint.lat).to.equal(boundaryData.centerLat);
      expect(boundaryResponse.CenterPoint.lng).to.equal(boundaryData.centerLon);
      expect(boundaryResponse.FacingDirection).to.equal(boundaryData.facingDirection);
      expect(boundaryResponse.ObjectType).to.equal(boundaryData.objectType);


      const amenitiyResponse = campgroundResponse.Amenities[0];
      const amenitiyData = testData.Amenities[0];

      expect(amenitiyResponse.name).to.equal(amenitiyData.name);
      expect(amenitiyResponse.iconUrl).to.equal(amenitiyData.iconUrl);
      expect(amenitiyResponse.description).to.equal(amenitiyData.description);
      expect(amenitiyResponse.centerPoint.CenterPoint.lat).to.equal(amenitiyData.centerLat);
      expect(amenitiyResponse.centerPoint.CenterPoint.lng).to.equal(amenitiyData.centerLon);

      const roadResponse = campgroundResponse.Roads[0];
      const roadData = testData.ObjectLocations[2];

      expect(roadResponse.road.BoundaryPoints.points).to.equal(roadData.boundaryPoints);
    });

  });

});
