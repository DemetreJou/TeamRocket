const request = require('supertest');
const expect = require('chai').expect;

const log_1 = {
  message: 'test message 1',
  logLevel: 'INFO',
  machineId: 'test-machine-1',
  requestId: 12345
}
const log_2 = {
  message: 'test message 2',
  logLevel: 'ERROR',
  machineId: 'test-machine-2',
  requestId: 12346
}
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
  after(async function () {
    server.close()
    return await prisma.$disconnect()
  })

  async function add_default_data() {
    await prisma.log.createMany({
      data: [
        log_1,
        log_2
      ]
    })
  }

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
      request_id: '12345',
      id: 213,
      timestamp: '2020-01-01T00:00:00.000Z'
    }
    request(server)
      .post('/log')
      .send(
        message
      )
      .expect('Content-Type', /json/)
      .expect(message)
      .expect(201)
      .then(res => {
        expect(res.body).to.deep.equal(message)
        done()
      })
  })
  it('posts to /log with just message', async () => {
    const message = {
      message: 'just message'
    }
    return await request(server)
      .post('/log')
      .send(
        message
      )
      .expect('Content-Type', /json/)
      .expect(message)
      .expect(201)
  })
  it('gets no messages', async () => {
    return await request(server)
      .get('/logs/search/all')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(res => {
        expect(res.body).to.be.an('array')
        expect(res.body.length).to.equal(0)
      })

  })
  it('gets 2 messages', async () => {
    await add_default_data()

    return await request(server)
      .get('/logs/search/all')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(res => {
        for (let i = 0; i < res.body.length; i++) {
          delete res.body[i].id
          delete res.body[i].timestamp
        }
        expect(res.body.length).to.equal(2)
        expect(res.body).to.be.an('array')
        expect(res.body).to.deep.include(log_1)
        expect(res.body).to.deep.include(log_2)
      })
  })
  it('searches by machine_id', async () => {
    await add_default_data()
    return await request(server)
      .get('/logs/search/machine_id')
      .query({
        machine_id: 'test-machine-1'
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then(res => {
        expect(res.body.length).to.equal(1)
      })
  })
  it('searches by empty time period', async () => {
    await add_default_data()
    return await request(server)
      .get('/logs/search/time_period')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(res => {
        expect(res.body.length).to.equal(2)
      })
  })
});