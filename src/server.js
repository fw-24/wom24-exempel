const express = require('express')
const checkName = require('./middleware/check-name')
require('dotenv').config()

const app = express();
const PORT = process.env.PORT || 8080;


// läs variabel från env:
console.log(process.env.HELLO_DOTENV)

app.get('/', (req, res) => { 
    console.log(req.myVar)
    res.send("<h1>Hello docker!!</h1>")
})

// Behövs för att vi ska kunna ta emot JSON i request bodyn:
app.use(express.json())

const notesRouter = require('./routes/notes')
app.use('/notes', notesRouter)


app.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}`)
})
