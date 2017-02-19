const express = require('express')
const path = require('path')
const bgg = require('bgg')({timeout: 10000})

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
    bgg('hot', {'type': 'boardgame'})
    .then((r) => res.json(r))
    .catch(error => res.status(500).json({"mec": error}))
})

app.get('/api/collection', (req, res) => {
    bgg('collection', {
        'subtype': 'boardgame',
        'excludesubtype': 'boardgameexpansion',
        'username': req.query.username
    })
    .then((r) => {
        // Query has been queued
        if (!!r.message) {
            res.status(202).json(r)
        } else {
            res.json(r)
        }
    })
    .catch(error => res.status(500).json({"mec": error}))
})

app.get('/api/plays', (req, res) => {
    const date = new Date()
    bgg('plays', {
        'subtype': 'boardgame',
        'mindate': `${date.getFullYear()}-01-01`,
        'maxdate': `${date.getFullYear()}-12-31`,
        'username': req.query.username,
        'id': req.query.id
    })
    .then((r) => res.json(r))
    .catch(error => res.status(500).json({"mec": error}))
})

app.listen(app.get('port'), () => {
    console.log(`Server up at http://localhost:${app.get('port')}/`)
})