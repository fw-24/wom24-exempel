const express = require('express')
const router = express.Router()
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

// ersätts snart med databas
tempNotes = [
    { id: 1, note: "köp bröd"}, 
    { id: 2, note: "gå på gym"}
]

// routing relativ till notes/
router.get('/', (req, res) => {
    console.log("notes / GET")
    res.send({msg: "Notes GET!", notes: tempNotes})
})

router.post('/', async (req, res) => {
    console.log(req.body)

    try {
        const newNote = await prisma.notes.create({
            data: {
                note: req.body.note
            }
        })

        res.send({msg: "New note created!"})
    } catch (error) {
        res.status(500).send({msg: "ERROR"})
    }
    
})

router.put('/:id', (req, res) => {
    console.log(req.body)

    // ersätts snart med databas
    tempNotes[req.params.id-1].note = req.body.note 

    res.send({msg: `note ${req.params.id} updated`})
})

module.exports = router

