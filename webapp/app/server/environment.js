require('dotenv').config()
module.exports = {
  db: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
  },
  webapp: {
    port: process.env.PORT,
    send_to_url: process.env.SEND_TO_URL,
  }
}