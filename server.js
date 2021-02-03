var express = require('express')
var bodyParser = require('body-parser')
var path = require('path')


var app = express()


app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(__dirname+'/public/'))

app.get('/',function(req,res){
    res.sendFile('index.html',{ root: path.join(__dirname,'/src')})
})

app.listen(5000,function(){
    console.log('Listening to port 5000')
})