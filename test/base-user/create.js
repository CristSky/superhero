const MODEL = 'BaseUser'
const MODEL_PATH = `/api/${MODEL}`;
const METHOD = 'post';


module.exports = (Server, Token) => describe(`POST /${MODEL} create`, () => {
  describe('Response', () => {
    it('200 created', (done) => {
      Server[METHOD](MODEL_PATH)
        .set('Authorization', Token.id)
        .send({ username: 'user1', password: '123' })
        .end((err, res) => {
          res.should.have.status(200);
          // res.body.should.include.like({ });
          // bodyAssertion(res, done);
          done();
        });
    });
  });

  describe('ACL', () => {});
});
