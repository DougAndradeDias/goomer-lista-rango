const dotenv = require('dotenv')
dotenv.config({ path: '.env' })

const express = require('express')
const app = express()

const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.status(200).json('Hello Application')
})

const produtosRouter = require('./routes/produtos')
app.use('/produtos', produtosRouter)

const restaurantesRouter = require('./routes/restaurantes')
app.use('/restaurantes', restaurantesRouter)

app.listen(PORT, () => {
  console.log(`Aplicação funcionando na porta ${PORT}`)
})
