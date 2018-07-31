const { GeoPoint } = require('loopback');

const { pagedFind, remoteMethodDescription } = require('../../server/services/paged-find');


module.exports = (ProtectionArea) => {
  ProtectionArea.validatesUniquenessOf('name', { message: 'Protection Area already exists' });

  /**
   * override get all to be paged
   */
  ProtectionArea.pagedFind = pagedFind;
  ProtectionArea.remoteMethod('pagedFind', remoteMethodDescription);

  /**
   * Remote method helpMe
   * Find up to 8 closest Super Heroes in a 10km radius
   * @param {number} lat
   * @param {number} lng
   * @param {object} options
   * @param {function} next
   */
  ProtectionArea.helpMe = (lat, lng, options, next) => {
    const geopoint = new GeoPoint(lat, lng);
    ProtectionArea.find({
      where: {
        location: { near: geopoint, maxDistance: 10, unit: 'kilometers' },
      },
      limit: 8,
    }, options, (err, instances) => {
      if (err) next(err);
      else next(null, instances);
    });
  };
  ProtectionArea.remoteMethod('helpMe', {
    description: 'Find up to 8 closest Super Heroes in a 10km radius.',
    accepts: [
      { arg: 'lat', type: 'number', required: true },
      { arg: 'lng', type: 'number', required: true },
      { arg: 'options', type: 'object', http: 'optionsFromRequest' },
    ],
    returns: { type: 'array', root: true },
    http: { verb: 'GET', path: '/helpMe' },
  });
};
