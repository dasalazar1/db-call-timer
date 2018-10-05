require('dotenv').config()
const {promisify} = require('util');
var fs = require('fs');
var fsP = require('fs-readfile-promise');

var mssql = require('mssql')
var url = '';

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