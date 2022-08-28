const pool = require('../helpers/database')

const express = require('express')
const router = express.Router()

// Rota que retorna uma lista de todos os restaurantes cadastrados no DB
router.get('/', async (req, res) => {
  try {
    const readRestaurantesQuery = 'SELECT * FROM restaurantes;'
    const rows = await pool.query(readRestaurantesQuery)

    res.status(200).json(rows)
  } catch (error) {
    res.status(400).json(error)
  }
})

// Rota que retorna um restaurante pelo Id informado na URL
router.get('/:id', async (req, res) => {
  const { id } = req.params

  try {
    const readRestauranteByIdQuery = 'SELECT * FROM restaurantes WHERE id = ?;'
    const rows = await pool.query(readRestauranteByIdQuery, id)

    res.status(200).json(rows)
  } catch (error) {
    res.status(400).json(error)
  }
})

// Rota que gera um novo registro de restaurantes no DB
router.post('/', async (req, res) => {
  const { img_path, name, address } = req.body

  try {
    const insertRestauranteQuery =
      'INSERT INTO restaurantes (img_path, name, address) VALUES (?, ?, ?)'
    await pool.query(insertRestauranteQuery, [img_path, name, address])

    res.status(200).json('message: Novo registro inserido com sucesso!')
  } catch (error) {
    res.status(400).json(error)
  }
})

module.exports = router
