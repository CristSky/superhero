const ACTION = {
  CREATE: 'CREATE',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE',
};

/**
 * Build AuditEvent Object
 * @param {object} ctx - loopback context
 * @param {string} action
 * @returns {Promise<{entity: string, entityId: string, username: string, action: string}>}
 */
const buildEventObject = async (ctx, action) => {
  const {
    options: { accessToken },
    Model,
    instance,
    where,
  } = ctx;
  const entityId = action === ACTION.DELETE ? where.id : instance.id;
  const username = accessToken && accessToken.username ? accessToken.username : 'guest_user';

  return {
    entity: Model.name,
    username,
    action,
    entityId,
  };
};

/**
 * Save AuditEvents
 * @param {object} ctx - loopback context
 * @param {string} action
 * @returns {Promise<undefined>}
 */
const eventCreate = async (ctx, action) => {
  const { Model } = ctx;
  const { app: { models: { AuditEvent } } } = Model;
  const event = await buildEventObject(ctx, action);
  return AuditEvent.create(event);
};

/**
 * Creates AuditEvents for any persisted methods
 * @param {object} ctx - loopback context
 * @returns {Promise<undefined>}
 */
const auditPersistence = async (ctx) => {
  const action = ctx.isNewInstance ? ACTION.CREATE : ACTION.UPDATE;
  return eventCreate(ctx, action);
};


/**
 * Creates AuditEvents for deleting method
 * @param {object} ctx - loopback context
 * @returns {Promise<undefined>}
 */
const auditDestroy = async ctx => eventCreate(ctx, ACTION.DELETE);

module.exports = {
  auditPersistence,
  auditDestroy,
};
