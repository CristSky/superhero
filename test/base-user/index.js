const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('../../server/server');

chai.should();
chai.use(chaiHttp);

const testServer = chai.request(server).keepOpen();

const create = require('./create');


describe('BaseUser', () => {
  let token = '';
  before((done) => {
    const { BaseUser } = server.models;
    BaseUser.login({ username: 'admin', password: 'boss' }, (err, userToken) => {
      token = userToken;
      done();
    });
  });

  create(testServer, token);

  after(done => {
    testServer.close();
    done();
  });
});
