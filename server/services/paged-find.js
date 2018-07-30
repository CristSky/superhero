/**
 * Paged method find
 * @param {object} filter
 * @param {number|string} limit
 * @param {number|string} offset
 * @param {object} options
 * @param {function} next
 */
function pagedFind(filter = {}, limit = 10, offset = 0, options, next) {
  const query = Object.assign({}, filter, { limit, offset });
  this.find(query, (err, instances) => {
    if (err) next(err);
    else next(null, instances);
  });
}

/**
 * remote method description for pagedFind
 * @type {object}
 */
const remoteMethodDescription = {
  isStatic: true,
  description: 'Find paged instances of the model matched by filter from the data source.',
  accepts: [
    { arg: 'filter', type: 'string', http: { source: 'query' } },
    { arg: 'limit', type: 'number', http: { source: 'query' } },
    { arg: 'offset', type: 'number', http: { source: 'query' } },
    { arg: 'options', type: 'object', http: 'optionsFromRequest' },
  ],
  returns: { type: 'array', root: true },
  http: { verb: 'GET', path: '/' },
};

module.exports = {
  pagedFind,
  remoteMethodDescription,
};
