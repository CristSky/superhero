const { pagedFind, remoteMethodDescription } = require('../../server/services/paged-find');

module.exports = (User) => {
  /**
   * Disable email validation from base class
   */
  delete User.validations.email;

  /**
   * override get all to be paged
   */
  User.pagedFind = pagedFind;
  User.remoteMethod('pagedFind', remoteMethodDescription);
};
