const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { PrismaClient } = require('@prisma/client')

const router = express.Router()
const prisma = new PrismaClient()

router.post('/', async (req, res) => {
    console.log(req.body)
    // https://www.npmjs.com/package/bcrypt    password,      salt-rounds 10
    const hashedPassword = await bcrypt.hash(req.body.password, 10)

    try {
        const newUser = await prisma.user.create({
            data: {
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword
            }
        })

        res.send({msg: "New user created!"})
    } catch (error) {
        console.log(error.message)
        res.status(500).send({msg: "ERROR"})
    }

    
    
})

router.post('/login', async (req, res) => {
    const user = await prisma.user.findUnique({
        where: { email: req.body.email }
    })

    if (user == null) {
        console.log("BAD USERNAME")
        return res.status(401).send({ msg: "Authentication failed" })
    }
    // kolla att det skickade lösenordet matchar hashen i databasen
    const match = await bcrypt.compare(req.body.password, user.password)

    if (!match) {
        console.log("BAD PASSWORD")
        return res.status(401).send({ msg: "Authentication failed" })
    }

    const token = await jwt.sign({
        sub: user.id,
        email: user.email,
        name: user.name,
        role: user.role
    }, process.env.JWT_SECRET, { expiresIn: '30d' })

    res.send({msg: "Login OK", jwt: token})
})


module.exports = router