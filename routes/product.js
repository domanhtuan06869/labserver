const express = require('express');
const router = express.Router();
const Product = new require('../models/product');
const { ensureAuthenticated, forwardAuthenticated} = require('../config/auth');
const Userlogin = new require('../models/userlogin');
const Nwk = new require('../models/Networking');

const mongoose = require('mongoose');

router.get('/',ensureAuthenticated,(req,res)=>{
  Userlogin.find({email:req.user.email}).then(docs=>{
    var user=JSON.parse(JSON.stringify(docs))
    var role=user[0].__v;
    if(role==0||role==0){
      var search = {}
      if(req.query.search != undefined){
        search = {name: {'$regex':req.query.search}}
      }
      
      Product.find(search).then(docs=>{
        res.render('examples/product',{user:req.user.email,item:docs,active:'activeb'})
      })
    }else{
      res.send('<H1> Bạn không có quyền truy cập </H1>')
    }

  })




req.flash(
  'success',
  '')

})
router.get('/mobile',function(req,res){
 
Product.find({}).then(docs=>{
  console.log(docs)
res.send(docs)
})

})
router.get('/mobile/search',function(req,res){
  Product.find({category: {'$regex':'may giat'}}).then(docs=>{
    console.log(docs)
  res.send(docs)
  })

})
router.post("/",function(req,res){
    console.log(req.body.name);
    var name=(req.body.name);
    var category=(req.body.category);
    var price =(req.body.price);
    var urlimage=(req.body.imgurl);
    var description=(req.body.description);

    const  Prd =new Product({name:name,category:category,price:price,urlimage:urlimage,description:description})
 
  Prd.save(function(err){
console.log(Prd)

  })
  req.flash(
    'success',
    'save'
  );
  
  res.redirect('/product')
})
router.get('/delete',function(req,res){
const Prd=new Product({_id:req.query.id});
     Prd.remove();
     console.log(Prd)
     req.flash(
      'success',
      'delete'
    );
  
     res.redirect('/product')
})
router.get('/edit',function(req,res){

 const {id,name,category,price,urlimage,description}=req.query;
      res.render('examples/productedit',{user:'email',id:id,name:name,category,price:price,urlimage:urlimage,description:description,active:'activea'})
  })
  router.get('/editproduct',function(req,res){

    const {id,name,category,price,urlimage,description}=req.query;
    Product.findOneAndUpdate({_id:id},{name:name,category:category,price:price,urlimage:urlimage,description:description},{
      new: true,                    
      runValidators: true             
    })
    .then(doc => {
    console.log(doc)
    req.flash(
      'success',
      'edit'
    );
  
    res.redirect('/product')
    })
    .catch(err => {
    console.error(err)
    })


     })
   router.get('/search',function(req,res){
    Product.find({name:'vcdbcx'}).then(docs=>{
      console.log(docs)
      res.redirect('/product?array='+docs)
    })
 
  })
  router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
  });

  router.get('/aa',function(req,res){
    const  nwk =new Nwk({flower:a})
 
  nwk.save(function(err){
console.log(nwk)
res.send(nwk)
  })
})
  router.get('/getlist',function(req,res){
Nwk.findOne({_id:req.query.id}).then((doc)=>{
  
    res.send(doc.urlimage)
})
  })
  router.get('/cc',function(req,res){
    
  Nwk.findOneAndUpdate({_id: '5d96bcd085809d18282a8cea'}, {$push: {urlimage:a}}, function (error, success) {
    if (error) {
        console.log(error);
    } else {
        console.log(success);
        res.send(success)
    }
    });
})
module.exports = router;