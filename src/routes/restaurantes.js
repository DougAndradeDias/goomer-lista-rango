const pool = require('../helpers/database')

const express = require('express')
const router = express.Router()

// READ: Metodo para listar todos os restaurantes cadastrados no DB
router.get('/', async (req, res) => {
  try {
    const readRestaurantesQuery = 'SELECT * FROM restaurantes;'
    const rows = await pool.query(readRestaurantesQuery)

    res.status(200).json(rows)
  } catch (error) {
    res.status(400).json(error)
  }
})

// READ: Metodo para buscar o restaurante pela Id informado na URL
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

// CREATE: Metodo que cria um novo restaurante no DB
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

// UPDATE: Metodo que altera algum dado de um restaurante já resgitrado no DB, pelo ID na URL
router.put('/:id', async (req, res) => {
  const { id } = req.params
  const { img_path, name, address } = req.body

  try {
    const updateRestauranteQuery =
      'UPDATE restaurantes SET img_path = ?, name = ?, address = ? WHERE id = ?'
    await pool.query(updateRestauranteQuery, [img_path, name, address, id])

    res.status(200).json('message: Registro alterado com sucesso!')
  } catch (error) {
    res.status(400).json(error)
  }
})

// DELETE: Metodo que faz o delete do resgitro do restaurante no DB, pelo ID na URL
router.delete('/:id', async (req, res) => {
  const { id } = req.params

  try {
    const deleteResaturanteQuery = 'DELETE FROM restaurantes WHERE id = ?'
    await pool.query(deleteResaturanteQuery, id)

    res.status(200).json('message: Registro deletado com sucesso')
  } catch (error) {
    res.status(400).json(error)
  }
})

module.exports = router
