const express = require('express')
const checkName = require('./middleware/check-name')
const app = express();
const PORT = 3000;

/**
 * Middleware
 */
const logParams = (req, res, next) => {
    console.log({ remote_ip: req.ip, params: req.params})
    next()
}
const requestLog = (req, res, next) => {
    console.log(`${req.method} request ${req.path}`)
    next()
}

app.use(requestLog) // Körs för varje rutt efter detta

app.get('/', (req, res) => {
    console.log(req.myVar)
    res.send("<h1>Hello!</h1>")
})

app.get('/shop', logParams, (req, res) => {
    res.send("<h1>Köp våra produkter!</h1>")
})

/**
 * Code Challenge: Expressrutt
 */
app.get('/hello/:name', logParams, checkName, (req, res) => {
    res.send(`Hello ${req.params.name}`)
})
// denna rutt lyssnar endast efter heltal: ( :wd(\\d+) )
app.get('/weekdays/:wd(\\d+)', (req, res) => {
    /*if (req.params.wd < 1 || req.params.wd > 7) {
        return res.send(`Ge ett tal mellan 1 och 7`)
    }*/
    
    const weekdays = [ 'måndag', 'tisdag', 'onsdag', 'torsdag', 'fredag', 'lördag', 'söndag' ]
    res.send(`Det är ${weekdays[(req.params.wd-1) % 7]}`)
})


app.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}`)
})
