const request = require('supertest');

describe('loading express', function () {
  const {server, app} = require('../server/server')
  it('responds to /', function testSlash(done) {
    request(server)
      .get('/')
      .expect(200, done);
  });
  it('connects to database', function testConnection(done){
    request(app)
      .get('/check-db-connection')
      .expect(200, done);
  });
  it('404 everything else', function testPath(done) {
    request(server)
      .get('/foo/bar')
      .expect(404, done);
  });
});