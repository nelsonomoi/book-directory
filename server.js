var express = require('express')
var bodyParser = require('body-parser')
var path = require('path')
var mysql = require('mysql')


var config = {
    user: 'root',
    password: '',
    server: 'localhost', 
    database: 'book-directory' 
}

var app = express()
var conn = mysql.createConnection(config)

app.use(bodyParser.urlencoded({extended: false}))

app.use(express.static(__dirname+'/public/'))

app.get('/',function(req,res){
    res.sendFile('index.html',{ root: path.join(__dirname,'/src')})
})

app.get('/all-books',function(req,res) {
    var sql = "SELECT * FROM BOOKS ORDER BY UPDATED_AT ";
    conn.query(sql,function(err,results){
        if(err) throw err;
        res.send(JSON.stringify(results))
    })
})


app.listen(5000,function(){
    console.log('Listening to port 5000')
})