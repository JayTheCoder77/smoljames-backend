import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import db from '../db.js'

const router = express.Router()

// register a new user /auth/register
router.post('/register',(req,res) => {
    const {username , password} = req.body
    // save username and irreversibly encrypt password
    // save jay@gmail.com | ajfjoifjaif

    // encrypt password
    const hashedPassword = bcrypt.hashSync(password,8)

    res.sendStatus(201)
})

router.post('/login',(req,res) => {
    // we get email and look password asscociated with it in db
    // but we get the encrypted password which means we cannot compare it to the one which the user entered
    // so what we can do is again one way encrypt the password the user just entered 


})

export default router