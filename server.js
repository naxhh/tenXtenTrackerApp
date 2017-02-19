const express = require('express')
const path = require('path');

//const fs = require('fs')
//const sqlite = require('sql.js')

const app = express()
app.set('port', (process.env.PORT || 3001))

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
}

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './client/build', 'index.html'))
})

app.get('/api/hot', (req, res) => {
    // const param.query.q

    // fetch url etc..
    res.json({'test': 'hi'})
})

app.listen(app.get('port'), () => {
    console.log(`Server up at http://localhost:${app.get('port')}/`)
})