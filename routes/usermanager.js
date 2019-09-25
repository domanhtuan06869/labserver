const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated} = require('../config/auth');
//const { ObjectId } = require('mongodb').ObjectID;
//const MongoClient = require('mongodb').MongoClient;

const Userlogin = new require('../models/userlogin');

router.get('/',ensureAuthenticated , (req, res) =>{
  Userlogin.find({email:req.user.email}).then(docs=>{
    var user=JSON.parse(JSON.stringify(docs))
    var role=user[0].__v;
  if(role==2){
    
    Userlogin.find({}).then(docs=>{
      var user=JSON.parse(JSON.stringify(docs))
  
    
       res.render('examples/usermanager',{user:req.user.email,item:user,active:'activea'})
   
      })


  }else{
    res.send('<H1> Bạn không có quyền truy cập </H1>')
  }
  })

    })
router.post('/edituser',ensureAuthenticated,(req,res)=>{
  
   var itemEmail=(req.query.email);
   var itemRole=(req.body.roleedit);
   var itemId=(req.query.id);
console.log(itemId)
console.log(itemRole)


Userlogin.findOneAndUpdate({email:itemEmail},{__v:itemRole[0]},{
  new: true,                    
  runValidators: true             
})
.then(doc => {
//console.log(doc)
res.redirect('/usermanager')
})
.catch(err => {
console.error(err)
})
 
    })

    router.get('/logout', (req, res) => {
      req.logout();
      req.flash('success_msg', 'You are logged out');
      res.redirect('/users/login');
    });
module.exports = router;