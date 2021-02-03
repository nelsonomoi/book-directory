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
    var all_books = null
    conn.connect(function(err){
        if(err) throw err
        var sql = "SELECT * FROM BOOKS ORDER BY UPDATED_AT ";
        conn.query(sql,function(err,results){
            if(err) throw err;
            
            all_books = results
        })
    })

    res.sendFile('index.html',{ root: path.join(__dirname,'/src')})
})


app.listen(5000,function(){
    console.log('Listening to port 5000')
})