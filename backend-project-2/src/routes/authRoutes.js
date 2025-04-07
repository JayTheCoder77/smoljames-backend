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

    // save the new user and hased password to the db
    try {
        const insertUser = db.prepare(`
            INSERT INTO users(username,password) VALUES (? , ?)
            `)        
            const result = insertUser.run(username,hashedPassword)


            // creating a default todo as we have a new user 
            const defaultTodo = `Hello !  :=) Add your first todo`
            const insertTodo = db.prepare(`INSERT INTO todos (user_id , task) VALUES (? , ?)`)
            insertTodo.run(result.lastInsertRowid , defaultTodo)

            // added users and todo now we create a token
            const token = jwt.sign({id:result.lastInsertRowid} , process.env.JWT_SECRET,{expiresIn : '24h'})
            res.json({token})

    } catch (error) {
        console.log(error.message);
        res.sendStatus(503)
    }
    
})

router.post('/login',(req,res) => {
    // we get email and look password asscociated with it in db
    // but we get the encrypted password which means we cannot compare it to the one which the user entered
    // so what we can do is again one way encrypt the password the user just entered 

    const {username,password} = req.body

    try {
        const getUser = db.prepare(`
                SELECT * FROM users WHERE username = ?
            `)

        // if we cannot find user asscoiated with uesrname return out of function
        const user = getUser.get(username)
        if(!user) {return res.status(404).send({message : 'user not found'})}

        // compares our password with hashed password
        const passwordIsValid = bcrypt.compareSync(password, user.password)
        // if password doesnt match return out
        if(!passwordIsValid) {return res.status(401).send({message : "Invalid Password"})}

        // if all these passed we have successfull auth
    } catch (error) {
        console.log(error.message);
        res.sendStatus(503)        
    }

})

export default router