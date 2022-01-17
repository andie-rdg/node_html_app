const express = require('express');
const moment = require("moment");
const {MongoClient} = require("mongodb");

var path = require('path');
const port = 3000;
var bodyParser = require('body-parser')
const app = express();

const config = require('./config.js');
  
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static(path.join(__dirname, 'public'))); 

app.post('/', urlencodedParser, (req, res) => {
    app.use(express.static(__dirname + '/public'));

    let toSend = {
      message: req.body.answer,
      date: moment().format()
    }

    console.log("Send from the server:", toSend);

    //connect to my mongodb w/ connectionurl
     MongoClient.connect(config.MONGO_DB_CONNECTION_URL,
      {useUnifiedTopology: true},
      (err, db) => {
      if (err) throw err;
      let databaseMongo = db.db(config.MONGO_DB_NAME);
  
      // Connect to the meme entry collection of the db
      // Insert the data;
      databaseMongo.collection(config.MONGO_DB_COLLECTION).
      insertOne({
        data: toSend,
      }).then(() => {
  
        console.log("this data had been inserted", toSend);

      })
    }); 

});

app.listen(port);
console.log('Listening on port : ' + port);