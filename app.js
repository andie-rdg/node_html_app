const express = require('express');
var path = require('path');
const port = 3000;
var bodyParser = require('body-parser')
const app = express();
  
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static(path.join(__dirname, 'public'))); 

app.post('/', urlencodedParser, (req, res) => {
    app.use(express.static(__dirname + '/public'));
    console.log("From the server:", req.body.data);
});

app.listen(port);
console.log('Listening on port : ' + port);