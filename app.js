const express = require('express');
const moment = require("moment");
const {MongoClient} = require("mongodb");

var path = require('path');
const port = 3000;
var bodyParser = require('body-parser')
const app = express();

const config = require('./config.js');


const {
  MONGO_DB_CONNECTION_URL,
  MONGO_DB_NAME,
  MONGO_DB_COLLECTION
} = config;

  
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static(path.join(__dirname, 'public'))); 


app.post('/client-to-server', urlencodedParser, (req, res) => {


  console.log(req.body);
  
  let toSend = {
    message: req.body,
    date: moment().format()
  }
  
  //connect to my mongodb w/ connectionurl
   MongoClient.connect(MONGO_DB_CONNECTION_URL,
    {useUnifiedTopology: true},
    (err, db) => {
    if (err) throw err;
    let databaseMongo = db.db(MONGO_DB_NAME);
    // Connect to the meme entry collection of the db
    // Insert the data;
    databaseMongo.collection(MONGO_DB_COLLECTION).
    insertOne({
      data: toSend,
    }).then(() => {
      console.log("this data had been inserted", toSend);
    })
  }); 


});



// get the info from the db
app.get('/db-to-client', (req, res) => {

  MongoClient.connect(MONGO_DB_CONNECTION_URL,
    {useUnifiedTopology: true},
    (err, db) => {
    if (err) throw err;
    let databaseMongo = db.db(MONGO_DB_NAME);
    databaseMongo
    .collection(MONGO_DB_COLLECTION)
    .find({})
    .toArray((error, entries) => {
      if (err) throw error;
      let entriesTextOnly = entries
      .map((ele, index) => {
        const {
          message
        } = ele.data; 
        return message;

      });


      res.send({ 
        data: entriesTextOnly
      });
  });
});
});

app.listen(port);
console.log('Listening on port : ' + port);