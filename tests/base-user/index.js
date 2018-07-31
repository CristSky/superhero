const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('../../server/server');

chai.should();
chai.use(chaiHttp);

const testServer = chai.request(server).keepOpen();
const MODEL = 'Users';

const create = require('./create');


describe(MODEL, () => {
  const auth = { token: {} };
  before((done) => {
    const { BaseUser } = server.models;
    BaseUser.login({ username: 'admin', password: 'boss' }, (err, token) => {
      auth.token = token;
      done();
    });
  });

  create(testServer, MODEL, auth);


  after(done => {
    testServer.close();
    done();
  });
});
