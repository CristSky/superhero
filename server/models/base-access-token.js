module.exports = (BaseAccessToken) => {
  /**
   * Before save observer for saving username on accessToken
   */
  BaseAccessToken.observe('before save', async (ctx) => {
    if (ctx.isNewInstance) ctx.instance.username = ctx.options.username;
  });
};
