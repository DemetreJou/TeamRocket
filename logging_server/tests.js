const request = require('supertest');

describe('loading express', function () {
  let server
  let prisma

  before(function (done) {
    server = require('./app').server
    prisma = require('./app').prisma
    prisma.log.deleteMany({})
    done()
  })
  beforeEach(async function () {
    return await prisma.log.deleteMany({})
  })
  after(function (done) {
    server.close()
    prisma.$disconnect()
    done()
  })

  it('responds to /', (done) => {
    request(server)
      .get('/')
      .expect(200, done)
  })
  it('posts to /log with all information', (done) => {
    const message = {
      message: 'test message',
      level: 'INFO',
      machine_id: 'test-machine-id',
      request_id: '12345'
    }
    request(server)
      .post('/log')
      .send(
        message
      )
      .expect('Content-Type', /json/)
      .expect(message)
      .expect(201, done)
  })
  it('posts to /log with just message', (done) => {
    const message = {
      message: 'just message'
    }
    request(server)
      .post('/log')
      .send(
        message
      )
      .expect('Content-Type', /json/)
      .expect(message)
      .expect(201, done)
  })
  it('gets all log messages', (done) => {
    request(server)
      .get('/logs/search/all')
      .expect('Content-Type', /json/)
      .expect(200, done)
      .expect(function (res) {
        console.log(res.body)
        // res.body.data.length.should.be.above(0)
      })
  })
});