// * Deverá ser acessado apenas por pessoas autorizadas (Autentição)
const pool = require('../helpers/database')

const express = require('express')
const route = express.Router()

// READ: Metodo para listar todos os produto cadastrador no DB
route.get('/', async (req, res) => {
  try {
    const readProdutosQuery = 'SELECT * FROM produtos'
    const rows = await pool.query(readProdutosQuery)

    res.status(200).json(rows)
  } catch (error) {
    res.status(400).json(error)
  }
})

// READ: Metodo para buscar um produto pela Id informado na URL
route.get('/:id', async (req, res) => {
  const { id } = req.params

  try {
    const readProdutosByIdQuery = 'SELECT * FROM produtos WHERE id = ?'
    const rows = await pool.query(readProdutosByIdQuery, id)

    res.status(200).json(rows)
  } catch (error) {
    res.status(400).json(error)
  }
})

// CREATE: Metodo para criar um novo registro de produto no DB
route.post('/', async (req, res) => {
  const { img_path, name, category } = req.body

  try {
    const insertProdutosQuery =
      'INSERT INTO produtos (img_path, name, category) VALUES(?, ?, ?)'
    await pool.query(insertProdutosQuery, [img_path, name, category])

    res.status(200).json('message: Registro inserido com sucesso')
  } catch (error) {
    res.status(400).json(error)
  }
})

// UPDATE: Metodo para alterar um registro de produto no DB
route.put('/:id', async (req, res) => {
  const { id } = req.params
  const { img_path, name, category } = req.body

  try {
    const updateProdutoQuery =
      'UPDATE produtos SET img_path = ?, name = ?, category = ? WHERE id = ?'
    await pool.query(updateProdutoQuery, [img_path, name, category, id])

    res.status(200).json('message: Registro alterado com sucesso')
  } catch (error) {
    res.status(400).json(error)
  }
})

// DELETE: Metodo para deletar um registro no DB
route.delete('/:id', async (req, res) => {
  const { id } = req.params

  try {
    const deleteProdutoQuery = 'DELETE FROM produtos WHERE id = ?'
    await pool.query(deleteProdutoQuery, id)

    res.status(200).json('message: Registro deletado com sucesso')
  } catch (error) {
    res.status(400).json(error)
  }
})

module.exports = route
