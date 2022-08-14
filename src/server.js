const dotenv = require('dotenv')
dotenv.config({ path: '.env' })

const express = require('express')
const app = express()

const PORT = process.env.PORT || 3000

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.get('/', (req, res) => {
  res.status(200).json('Hello World')
})

const routeRestaurantes = require('./routes/restaurantes')
app.use('/restaurantes', routeRestaurantes)

const routeProdutos = require('./routes/produtos')
app.use('/restaurantes/produtos', routeProdutos)

app.listen(PORT, () => {
  console.log(`Aplicação funcionando na porta ${PORT}`)
})
