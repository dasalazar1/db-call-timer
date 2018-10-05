require('dotenv').config()
const {promisify} = require('util');
var fs = require('fs');
var fsP = require('fs-readfile-promise');

var MongoClient = require('mongodb').MongoClient;
var url = process.env.MONGO_URL;
var mongoConnectAsync = promisify(MongoClient.connect);

var before = Date.now();

fsP('MOCK_DATA.json', 'utf8')
  .then((data) =>{
    console.log(data.length); 
    var json = JSON.parse(data);
    //console.log(json[0])
    var after = Date.now();
    console.log("Read Time: " + (after - before));
    return json;
  })
  .then( (json) => {
    
    return insert(json);
  })
  .then((rows) => {
    after = Date.now();
    console.log("Write Time: " + (after - before));
    console.log(rows);
  })
  .then(() => {
    before = Date.now();
    return getAll();
  })
  .then((res) => {
    after = Date.now();
    console.log("Pull Time: " + (after - before));
    console.log(res)
  })
  .catch((err) => {console.log(err)});

function insert(json){
  return new Promise(function(fulfill, reject){
    MongoClient.connect(url, { useNewUrlParser: true },  function(err, db) {
      if (err) reject( err );
      var dbo = db.db("fcc-dasalazar1");
      var myobj = { name: "Company Inc", address: "Highway 37" };
      dbo.collection("TestData").insertMany(json, function(err, res) {
        if (err) reject( err );
        db.close();
        fulfill("Number of documents inserted: " + res.insertedCount);
      });
    });
  })
}

function getAll(){
  return new Promise(function(fulfill, reject){
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
      if (err) reject( err );
      var dbo = db.db("fcc-dasalazar1");
      dbo.collection("TestData").find({}).toArray(function(err, result) {
        if (err) reject( err );
        db.close();
        fulfill("Found " + result.length + " documents");
      });
    });
  });
}