const express = require('express')
const path = require('path')
const { render } = require('ejs')
const app = express()
const port = process.env.PORT || 80
const mysql = require('mysql')
const bodyParser = require('body-parser')
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'cadastro'
})
const deprendencies = {
    connection
}

const pessoas = require('./routes/pessoas')

app.use(bodyParser.urlencoded({ extended: false}))

app.use(express.static('public'))

//view engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/', (req, res) => res.render('home'))
app.use('/pessoas', pessoas(deprendencies))

connection.connect(()=> {
    app.listen(port, ()=>console.log('CRUD Listening on port: '+port))
})
