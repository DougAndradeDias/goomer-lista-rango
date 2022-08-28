const dotenv = require('dotenv')
dotenv.config({ path: '.env' })

const mariadb = require('mariadb')

const pool = mariadb.createPool({
  host: process.env.HOST,
  user: process.env.USER_DB,
  password: process.env.PASS_DB,
  database: process.env.DB_NAME,
  connectionLimit: 5
})

pool.getConnection((error, connection) => {
  if (error) {
    if (error.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('Erro de conexão com o banco de dados')
    }
    if (error.code === 'ERR_CON_COUNT_ERROR') {
      console.error('Limite de conexão com o banco de dados alcançado')
    }
    if (error.code === 'ECONNREFUSED') {
      console.error('Conexão com o banco de dados foi recusada')
    }
  }

  if (connection) {
    connection.release()
  }

  return
})

module.exports = pool
