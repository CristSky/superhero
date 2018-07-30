const { pagedFind, remoteMethodDescription } = require('../../server/services/paged-find');


/**
 * Deletion Forbidden helper
 * @returns {Error}
 * @constructor
 */
const DeletionForbidden = () => {
  const err = new Error('The instance SuperPower is currently associated to a SuperHero');
  err.status = 403;
  err.name = 'Deletion Forbidden';
  return err;
};

module.exports = (SuperPower) => {
  SuperPower.validatesUniquenessOf('name', { message: 'Super Power already exists' });

  /**
   * override get all to be paged
   */
  SuperPower.pagedFind = pagedFind;
  SuperPower.remoteMethod('pagedFind', remoteMethodDescription);

  /**
   * Before delete observer for denying deletion of associated Super Hero Super Power instances
   */
  SuperPower.observe('before delete', (ctx, next) => {
    const { SuperHeroPower } = SuperPower.app.models;
    const superPowerId = ctx.where.id;

    SuperHeroPower.find({ where: { superPowerId } }, (err, instance) => {
      if (err) return next(err);
      if (instance.length) return next(DeletionForbidden());
      return next();
    });
  });
};
