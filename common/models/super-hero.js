const { pagedFind, remoteMethodDescription } = require('../../server/services/paged-find');

module.exports = (SuperHero) => {
  SuperHero.validatesUniquenessOf('name', { message: 'Super Hero already exists' });

  /**
   * override get all to be paged
   */
  SuperHero.pagedFind = pagedFind;
  SuperHero.remoteMethod('pagedFind', remoteMethodDescription);
};
