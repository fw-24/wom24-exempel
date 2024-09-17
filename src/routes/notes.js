const express = require('express')
const router = express.Router()

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

router.post('/', (req, res) => {
    console.log(req.body)

    // ersätts snart med databas
    tempNotes.push({ 
        id: tempNotes.length+1, 
        note: req.body.note 
    })

    res.send({msg: "New note created!"})
})

router.put('/:id', (req, res) => {
    console.log(req.body)

    // ersätts snart med databas
    tempNotes[req.params.id-1].note = req.body.note 

    res.send({msg: `note ${req.params.id} updated`})
})

module.exports = router

