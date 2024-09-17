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

module.exports = router

