const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
 
  },
  category: {
    type: String,
  
  },
  price:{
    type:Number
  },
  urlimage:{
    type:String
  },
  description:{
    type:String
  }
});

const Product = mongoose.model('product',ProductSchema);

module.exports =  Product;
