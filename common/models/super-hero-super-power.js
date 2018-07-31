const { pagedFind, remoteMethodDescription } = require('../../server/services/paged-find');

module.exports = (SuperHeroSuperPower) => {
  /**
   * override get all to be paged
   */
  SuperHeroSuperPower.pagedFind = pagedFind;
  SuperHeroSuperPower.remoteMethod('pagedFind', remoteMethodDescription);
};
