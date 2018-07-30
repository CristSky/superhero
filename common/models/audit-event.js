const { pagedFind, remoteMethodDescription } = require('../../server/services/paged-find');

module.exports = (AuditEvent) => {
  /**
   * override get all to be paged
   */
  AuditEvent.prototype.pagedFind = pagedFind;
  AuditEvent.remoteMethod('pagedFind', remoteMethodDescription);
};
