const { pagedFind, remoteMethodDescription } = require('../../server/services/paged-find');

module.exports = (SuperHeroPower) => {
  /**
   * override get all to be paged
   */
  SuperHeroPower.pagedFind = pagedFind;
  SuperHeroPower.remoteMethod('pagedFind', remoteMethodDescription);
};
