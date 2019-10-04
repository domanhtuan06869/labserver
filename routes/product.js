const express = require('express');
const router = express.Router();
const Product = new require('../models/product');
const { ensureAuthenticated, forwardAuthenticated} = require('../config/auth');
const Userlogin = new require('../models/userlogin');
const Nwk = new require('../models/Networking');
var a=[
  
  {
      "largeImageURL":"https://pixabay.com/get/54e0d44a495bb108f5d08460962934761437d6e7564c704c722f7ad3954bc75d_1280.jpg",
      "webformatHeight":480,
      "webformatWidth":640,
      "likes":451,
      "imageWidth":2560,
      "id":201939,
      "user_id":5337,
      "views":96954,
      "comments":92,
      "pageURL":"https://pixabay.com/photos/brandenburger-tor-dusk-dawn-201939/",
      "imageHeight":1920,
      "webformatURL":"https://pixabay.com/get/54e0d44a495bb108f5d08460962934761437d6e7564c704c722f7ad3954bc75d_640.jpg",
      "type":"photo",
      "previewHeight":112,
      "tags":"brandenburger tor, dusk, dawn",
      "downloads":41982,
      "user":"ArtTower",
      "favorites":362,
      "imageSize":741393,
      "previewWidth":150,
      "userImageURL":"https://cdn.pixabay.com/user/2019/07/27/00-12-46-447_250x250.jpg",
      "previewURL":"https://cdn.pixabay.com/photo/2013/10/28/18/51/brandenburger-tor-201939_150.jpg"
  },
  {
      "largeImageURL":"https://pixabay.com/get/57e3d0424f57a514f6da8c7dda79367d1d3ed6ed51546c4870287bd5904fc35abd_1280.jpg",
      "webformatHeight":426,
      "webformatWidth":640,
      "likes":309,
      "imageWidth":3600,
      "id":1351559,
      "user_id":1670164,
      "views":57776,
      "comments":22,
      "pageURL":"https://pixabay.com/photos/sea-sand-coast-beach-seashells-1351559/",
      "imageHeight":2400,
      "webformatURL":"https://pixabay.com/get/57e3d0424f57a514f6da8c7dda79367d1d3ed6ed51546c4870287bd5904fc35abd_640.jpg",
      "type":"photo",
      "previewHeight":99,
      "tags":"sea, sand, coast",
      "downloads":31446,
      "user":"croisy",
      "favorites":355,
      "imageSize":3334580,
      "previewWidth":150,
      "userImageURL":"https://cdn.pixabay.com/user/2015/11/20/14-04-35-712_250x250.jpg",
      "previewURL":"https://cdn.pixabay.com/photo/2016/04/25/10/17/sea-1351559_150.jpg"
  },
  {
      "largeImageURL":"https://pixabay.com/get/57e0d0454f5ba414f6da8c7dda79367d1d3ed6ed51546c4870287bd5904fc35abd_1280.jpg",
      "webformatHeight":426,
      "webformatWidth":640,
      "likes":269,
      "imageWidth":5184,
      "id":1056598,
      "user_id":725076,
      "views":67904,
      "comments":25,
      "pageURL":"https://pixabay.com/photos/tree-snow-winter-landscape-1056598/",
      "imageHeight":3456,
      "webformatURL":"https://pixabay.com/get/57e0d0454f5ba414f6da8c7dda79367d1d3ed6ed51546c4870287bd5904fc35abd_640.jpg",
      "type":"photo",
      "previewHeight":99,
      "tags":"tree, snow, winter",
      "downloads":41367,
      "user":"Sorbyphoto",
      "favorites":377,
      "imageSize":4670971,
      "previewWidth":150,
      "userImageURL":"https://cdn.pixabay.com/user/2019/05/12/23-09-42-913_250x250.jpg",
      "previewURL":"https://cdn.pixabay.com/photo/2015/11/22/17/15/tree-1056598_150.jpg"
  }
]
const mongoose = require('mongoose');

router.get('/',ensureAuthenticated,(req,res)=>{
  Userlogin.find({email:req.user.email}).then(docs=>{
    var user=JSON.parse(JSON.stringify(docs))
    var role=user[0].__v;
    if(role==1||role==2){
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
      res.render('examples/productedit',{user:'email',id:id,name:name,category,price:price,urlimage:urlimage,description:description})
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