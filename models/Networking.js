const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  urlimage: {
    type: Array,
 
  },
  animal:{
    type:Array
  }
  ,nature:{
    type:Array
  },
  flower:{
    type:Array
  }

});

const Product = mongoose.model('nwk',ProductSchema);

module.exports =  Product;
