import express from 'express'
import db from '../db.js'

const router = express.Router()

// get all todos for logged in user
router.get('/', (req, res) => {
    const getTodos = db.prepare(`
            SELECT * FROM todos WHERE user_id  = ?
        `)
    const todos = getTodos.all(req.userId)
    res.json(todos)
})

// create new todo
router.post('/', (req, res) => {})

// update todo
router.put('/:id', (req, res) => {})

// delete todo
router.delete('/:id', (req, res) => {})

export default router