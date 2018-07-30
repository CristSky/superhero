const { auditPersistence, auditDestroy } = require('../services/audit-event');

module.exports = (Basemodel) => {
  /**
   * After save observer for saving AuditEvents from persisted methods
   */
  Basemodel.observe('after save', auditPersistence);

  /**
   * After delete observer for saving AuditEvents from deleting methods
   */
  Basemodel.observe('after delete', auditDestroy);
};
