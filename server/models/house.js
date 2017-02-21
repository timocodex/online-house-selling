var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// create a schema
var houseSchema = new Schema({
  seller:String,
  address:String,
  price:Number,
  image:String,
  createdAt:Date,
  longitude:Number,
  latitude:Number
});


// the schema is useless so far
// we need to create a model using it
var House = mongoose.model('houses', houseSchema);

// make this available to our users in our Node applications
module.exports = House;
