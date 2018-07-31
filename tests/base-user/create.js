module.exports = (Server, MODEL, auth) => describe(`POST /${MODEL} create`, () => {
  const MODEL_PATH = `/api/${MODEL}`;
  const METHOD = 'post';
  const MODEL_KEYS = ['id', 'username'];
  const username = `user_${Date.now()}`;

  before((done) => {
    Server
      .post(MODEL_PATH)
      .set('Authorization', auth.token.id)
      .send({ username, password: '1234' })
      .end(() => done());
  });

  describe('API', () => {
    it('200 created', (done) => {
      Server[METHOD](MODEL_PATH)
        .set('Authorization', auth.token.id)
        .send({ username: `user_${Date.now()}`, password: '1234' })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.include.keys(MODEL_KEYS);
          done();
        });
    });

    it('422 username uniqueness', (done) => {
      Server[METHOD](MODEL_PATH)
        .set('Authorization', auth.token.id)
        .send({ username, password: '1234' })
        .end((err, res) => {
          res.should.have.status(422);
          res.body.error.details.messages.should.have.property('username');
          done();
        });
    });

    ['username', 'password']
      .forEach(item => it(`422 "${item}" can\'t be blank`, (done) => {
        Server[METHOD](MODEL_PATH)
          .set('Authorization', auth.token.id)
          .send(Object.assign({}, {
            username: `user_${Date.now()}`,
            password: '1234'
            }, { [item]: undefined }))
          .end((err, res) => {
            res.should.have.status(422);
            res.body.error.details.messages.should.have.property(item);
            done();
          });
      }))
  });
});
