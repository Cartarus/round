var express = require('express');
var app = express();
const axios = require('axios');

var dbcon = require('../server-roundRobin/DbConnection');
var connection = dbcon();
connection.connect();
var pdf = require('html-pdf');

const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

let count = 0;
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'public','views', 'home.html'));
});

app.get('/search', function (req, res) {
    connection.query('SELECT CONCAT(nombre," "+apellidos) AS total    from datos where institucion ="' + req.query.key + '"',(err, rows, fields)=> {
        res.json(JSON.stringify(rows));
       // res.json(rows.lenth);

        //console.log(JSON.stringify(rows))

    })
});


app.post('/pdf', function (req, res) {
    res.send(req.body)
});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});