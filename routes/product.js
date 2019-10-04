const express = require('express');
const router = express.Router();
const Product = new require('../models/product');
const { ensureAuthenticated, forwardAuthenticated} = require('../config/auth');
const Userlogin = new require('../models/userlogin');
const Nwk = new require('../models/Networking');
var a=[
  {
      "largeImageURL":"https://pixabay.com/get/57e0d4464853a914f6da8c7dda79367d1d3ed6ed51546c4870287bd59645c25db0_1280.jpg",
      "webformatHeight":426,
      "webformatWidth":640,
      "likes":128,
      "imageWidth":3328,
      "id":1015215,
      "user_id":1455691,
      "views":38014,
      "comments":5,
      "pageURL":"https://pixabay.com/photos/water-lily-lily-water-nature-1015215/",
      "imageHeight":2219,
      "webformatURL":"https://pixabay.com/get/57e0d4464853a914f6da8c7dda79367d1d3ed6ed51546c4870287bd59645c25db0_640.jpg",
      "type":"photo",
      "previewHeight":99,
      "tags":"water lily, lily, water",
      "downloads":16532,
      "user":"nguyenthanh",
      "favorites":176,
      "imageSize":451890,
      "previewWidth":150,
      "userImageURL":"https://cdn.pixabay.com/user/2015/09/28/08-52-15-322_250x250.jpg",
      "previewURL":"https://cdn.pixabay.com/photo/2015/10/31/10/53/water-lily-1015215_150.jpg"
  },
  {
      "largeImageURL":"https://pixabay.com/get/51e8d7464b51b108f5d08460962934761437d6e7564c704c722f7ad59f4ac050_1280.jpg",
      "webformatHeight":426,
      "webformatWidth":640,
      "likes":107,
      "imageWidth":6000,
      "id":782513,
      "user_id":422737,
      "views":25661,
      "comments":6,
      "pageURL":"https://pixabay.com/photos/rose-pink-nature-petals-purple-782513/",
      "imageHeight":4000,
      "webformatURL":"https://pixabay.com/get/51e8d7464b51b108f5d08460962934761437d6e7564c704c722f7ad59f4ac050_640.jpg",
      "type":"photo",
      "previewHeight":99,
      "tags":"rose, pink, nature",
      "downloads":13186,
      "user":"422737",
      "favorites":152,
      "imageSize":4516513,
      "previewWidth":150,
      "userImageURL":"",
      "previewURL":"https://cdn.pixabay.com/photo/2015/05/24/22/47/rose-782513_150.jpg"
  },
  {
      "largeImageURL":"https://pixabay.com/get/57e7d6414d5aae14f6da8c7dda79367d1d3ed6ed51546c4870287bd59645c25db0_1280.jpg",
      "webformatHeight":426,
      "webformatWidth":640,
      "likes":130,
      "imageWidth":5184,
      "id":1732782,
      "user_id":1627417,
      "views":73594,
      "comments":17,
      "pageURL":"https://pixabay.com/photos/rose-rose-bloom-flower-blossom-1732782/",
      "imageHeight":3456,
      "webformatURL":"https://pixabay.com/get/57e7d6414d5aae14f6da8c7dda79367d1d3ed6ed51546c4870287bd59645c25db0_640.jpg",
      "type":"photo",
      "previewHeight":99,
      "tags":"rose, rose bloom, flower",
      "downloads":15969,
      "user":"Myriams-Fotos",
      "favorites":169,
      "imageSize":962272,
      "previewWidth":150,
      "userImageURL":"https://cdn.pixabay.com/user/2019/09/21/21-25-17-360_250x250.jpg",
      "previewURL":"https://cdn.pixabay.com/photo/2016/10/11/21/18/rose-1732782_150.jpg"
  },
  {
      "largeImageURL":"https://pixabay.com/get/55e0d0474257ae14f6da8c7dda79367d1d3ed6ed51546c4870287bd59645c25db0_1280.jpg",
      "webformatHeight":365,
      "webformatWidth":640,
      "likes":115,
      "imageWidth":3500,
      "id":3054852,
      "user_id":512893,
      "views":11705,
      "comments":11,
      "pageURL":"https://pixabay.com/photos/bellflower-flowers-blossom-bloom-3054852/",
      "imageHeight":2000,
      "webformatURL":"https://pixabay.com/get/55e0d0474257ae14f6da8c7dda79367d1d3ed6ed51546c4870287bd59645c25db0_640.jpg",
      "type":"photo",
      "previewHeight":85,
      "tags":"bellflower, flowers, blossom",
      "downloads":5734,
      "user":"Soorelis",
      "favorites":112,
      "imageSize":1152149,
      "previewWidth":150,
      "userImageURL":"https://cdn.pixabay.com/user/2014/12/05/19-40-25-41_250x250.jpg",
      "previewURL":"https://cdn.pixabay.com/photo/2018/01/01/19/51/bellflower-3054852_150.jpg"
  },
  {
      "largeImageURL":"https://pixabay.com/get/57e2dc434957ad14f6da8c7dda79367d1d3ed6ed51546c4870287bd59645c25db0_1280.jpg",
      "webformatHeight":426,
      "webformatWidth":640,
      "likes":83,
      "imageWidth":6000,
      "id":1290351,
      "user_id":526143,
      "views":37851,
      "comments":12,
      "pageURL":"https://pixabay.com/photos/tulip-flower-blossom-bloom-orange-1290351/",
      "imageHeight":4000,
      "webformatURL":"https://pixabay.com/get/57e2dc434957ad14f6da8c7dda79367d1d3ed6ed51546c4870287bd59645c25db0_640.jpg",
      "type":"photo",
      "previewHeight":99,
      "tags":"tulip, flower, blossom",
      "downloads":27913,
      "user":"Pezibear",
      "favorites":118,
      "imageSize":1949422,
      "previewWidth":150,
      "userImageURL":"https://cdn.pixabay.com/user/2019/03/28/14-46-04-252_250x250.jpg",
      "previewURL":"https://cdn.pixabay.com/photo/2016/03/30/09/55/tulip-1290351_150.jpg"
  },
  {
      "largeImageURL":"https://pixabay.com/get/54e2d44a4852ad14f6da8c7dda79367d1d3ed6ed51546c4870287bd59645c25db0_1280.jpg",
      "webformatHeight":426,
      "webformatWidth":640,
      "likes":123,
      "imageWidth":5184,
      "id":2219201,
      "user_id":3202135,
      "views":17477,
      "comments":22,
      "pageURL":"https://pixabay.com/photos/tulips-tulip-field-tulip-fields-2219201/",
      "imageHeight":3456,
      "webformatURL":"https://pixabay.com/get/54e2d44a4852ad14f6da8c7dda79367d1d3ed6ed51546c4870287bd59645c25db0_640.jpg",
      "type":"photo",
      "previewHeight":99,
      "tags":"tulips, tulip field, tulip fields",
      "downloads":6033,
      "user":"John-Silver",
      "favorites":155,
      "imageSize":3554484,
      "previewWidth":150,
      "userImageURL":"https://cdn.pixabay.com/user/2016/12/25/19-59-22-291_250x250.jpg",
      "previewURL":"https://cdn.pixabay.com/photo/2017/04/10/17/48/tulips-2219201_150.jpg"
  },
  {
      "largeImageURL":"https://pixabay.com/get/57e3d3464257ab14f6da8c7dda79367d1d3ed6ed51546c4870287bd59645c25db0_1280.jpg",
      "webformatHeight":426,
      "webformatWidth":640,
      "likes":251,
      "imageWidth":6000,
      "id":1365857,
      "user_id":2,
      "views":65626,
      "comments":26,
      "pageURL":"https://pixabay.com/photos/forget-me-not-flower-1365857/",
      "imageHeight":4000,
      "webformatURL":"https://pixabay.com/get/57e3d3464257ab14f6da8c7dda79367d1d3ed6ed51546c4870287bd59645c25db0_640.jpg",
      "type":"photo",
      "previewHeight":99,
      "tags":"forget me not, flower, brunnera vergissmeinnicht",
      "downloads":44017,
      "user":"Hans",
      "favorites":232,
      "imageSize":3270256,
      "previewWidth":150,
      "userImageURL":"https://cdn.pixabay.com/user/2019/01/29/15-01-52-802_250x250.jpg",
      "previewURL":"https://cdn.pixabay.com/photo/2016/05/01/20/43/forget-me-not-1365857_150.jpg"
  },
  {
      "largeImageURL":"https://pixabay.com/get/55e4d04b4c5baf14f6da8c7dda79367d1d3ed6ed51546c4870287bd59645c25db0_1280.jpg",
      "webformatHeight":426,
      "webformatWidth":640,
      "likes":136,
      "imageWidth":4896,
      "id":3458693,
      "user_id":1195798,
      "views":48405,
      "comments":58,
      "pageURL":"https://pixabay.com/photos/roses-bloom-yellow-orange-flower-3458693/",
      "imageHeight":3264,
      "webformatURL":"https://pixabay.com/get/55e4d04b4c5baf14f6da8c7dda79367d1d3ed6ed51546c4870287bd59645c25db0_640.jpg",
      "type":"photo",
      "previewHeight":99,
      "tags":"roses, bloom, yellow",
      "downloads":39213,
      "user":"Couleur",
      "favorites":114,
      "imageSize":2333029,
      "previewWidth":150,
      "userImageURL":"https://cdn.pixabay.com/user/2019/07/30/15-24-04-643_250x250.jpg",
      "previewURL":"https://cdn.pixabay.com/photo/2018/06/06/20/14/roses-3458693_150.jpg"
  },
  {
      "largeImageURL":"https://pixabay.com/get/55e4d1474957a514f6da8c7dda79367d1d3ed6ed51546c4870287bd59645c25db0_1280.jpg",
      "webformatHeight":532,
      "webformatWidth":640,
      "likes":136,
      "imageWidth":3270,
      "id":3444359,
      "user_id":686414,
      "views":40398,
      "comments":30,
      "pageURL":"https://pixabay.com/photos/rose-flower-blossom-bloom-nature-3444359/",
      "imageHeight":2719,
      "webformatURL":"https://pixabay.com/get/55e4d1474957a514f6da8c7dda79367d1d3ed6ed51546c4870287bd59645c25db0_640.jpg",
      "type":"photo",
      "previewHeight":124,
      "tags":"rose, flower, blossom",
      "downloads":32797,
      "user":"Alexas_Fotos",
      "favorites":136,
      "imageSize":1612563,
      "previewWidth":150,
      "userImageURL":"https://cdn.pixabay.com/user/2019/08/26/14-22-19-653_250x250.jpg",
      "previewURL":"https://cdn.pixabay.com/photo/2018/05/31/16/10/rose-3444359_150.jpg"
  },
  {
      "largeImageURL":"https://pixabay.com/get/57e1d14a4a5ba514f6da8c7dda79367d1d3ed6ed51546c4870287bd59645c25db0_1280.jpg",
      "webformatHeight":480,
      "webformatWidth":640,
      "likes":181,
      "imageWidth":4608,
      "id":1149099,
      "user_id":242387,
      "views":42445,
      "comments":9,
      "pageURL":"https://pixabay.com/photos/bouquet-of-flowers-table-setting-1149099/",
      "imageHeight":3456,
      "webformatURL":"https://pixabay.com/get/57e1d14a4a5ba514f6da8c7dda79367d1d3ed6ed51546c4870287bd59645c25db0_640.jpg",
      "type":"photo",
      "previewHeight":112,
      "tags":"bouquet of flowers, table setting, bouquet",
      "downloads":14180,
      "user":"Free-Photos",
      "favorites":300,
      "imageSize":3950740,
      "previewWidth":150,
      "userImageURL":"https://cdn.pixabay.com/user/2014/05/07/00-10-34-2_250x250.jpg",
      "previewURL":"https://cdn.pixabay.com/photo/2016/01/19/14/57/bouquet-of-flowers-1149099_150.jpg"
  },
  {
      "largeImageURL":"https://pixabay.com/get/54e5d1475753ae01f7c5d57cc42036761d3ddbf852547649742e73d39245_1280.jpg",
      "webformatHeight":426,
      "webformatWidth":640,
      "likes":161,
      "imageWidth":5616,
      "id":2544,
      "user_id":14,
      "views":53825,
      "comments":13,
      "pageURL":"https://pixabay.com/photos/tulips-tulip-orange-red-background-2544/",
      "imageHeight":3744,
      "webformatURL":"https://pixabay.com/get/54e5d1475753ae01f7c5d57cc42036761d3ddbf852547649742e73d39245_640.jpg",
      "type":"photo",
      "previewHeight":99,
      "tags":"tulips, tulip, orange",
      "downloads":11701,
      "user":"PublicDomainPictures",
      "favorites":119,
      "imageSize":3390909,
      "previewWidth":150,
      "userImageURL":"https://cdn.pixabay.com/user/2012/03/08/00-13-48-597_250x250.jpg",
      "previewURL":"https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2544_150.jpg"
  },
  {
      "largeImageURL":"https://pixabay.com/get/53e0d4464d4fad0bffd8992cc62b3f7f1d37dce04e50744e752e7adc9048cd_1280.jpg",
      "webformatHeight":427,
      "webformatWidth":640,
      "likes":177,
      "imageWidth":3862,
      "id":50157,
      "user_id":768,
      "views":41475,
      "comments":22,
      "pageURL":"https://pixabay.com/photos/floral-daisy-blossom-plant-natural-50157/",
      "imageHeight":2578,
      "webformatURL":"https://pixabay.com/get/53e0d4464d4fad0bffd8992cc62b3f7f1d37dce04e50744e752e7adc9048cd_640.jpg",
      "type":"photo",
      "previewHeight":100,
      "tags":"floral, daisy, blossom",
      "downloads":11020,
      "user":"GLady",
      "favorites":156,
      "imageSize":2499827,
      "previewWidth":150,
      "userImageURL":"https://cdn.pixabay.com/user/2014/07/12/21-19-34-426_250x250.jpg",
      "previewURL":"https://cdn.pixabay.com/photo/2012/06/17/17/32/floral-50157_150.jpg"
  },
  {
      "largeImageURL":"https://pixabay.com/get/57e8d0474a55a814f6da8c7dda79367d1d3ed6ed51546c4870287bd59645c25db0_1280.jpg",
      "webformatHeight":425,
      "webformatWidth":640,
      "likes":85,
      "imageWidth":2799,
      "id":1854074,
      "user_id":2286921,
      "views":30850,
      "comments":8,
      "pageURL":"https://pixabay.com/photos/bouquet-celebration-color-colorful-1854074/",
      "imageHeight":1863,
      "webformatURL":"https://pixabay.com/get/57e8d0474a55a814f6da8c7dda79367d1d3ed6ed51546c4870287bd59645c25db0_640.jpg",
      "type":"photo",
      "previewHeight":99,
      "tags":"bouquet, celebration, color",
      "downloads":15641,
      "user":"Pexels",
      "favorites":192,
      "imageSize":689248,
      "previewWidth":150,
      "userImageURL":"https://cdn.pixabay.com/user/2016/03/26/22-06-36-459_250x250.jpg",
      "previewURL":"https://cdn.pixabay.com/photo/2016/11/23/17/56/bouquet-1854074_150.jpg"
  },
  {
      "largeImageURL":"https://pixabay.com/get/52e2dd474b50ac14f6da8c7dda79367d1d3ed6ed51546c4870287bd59645c25db0_1280.jpg",
      "webformatHeight":426,
      "webformatWidth":640,
      "likes":90,
      "imageWidth":5472,
      "id":4284120,
      "user_id":2331152,
      "views":28526,
      "comments":22,
      "pageURL":"https://pixabay.com/photos/morning-sip-wood-anemone-flower-4284120/",
      "imageHeight":3648,
      "webformatURL":"https://pixabay.com/get/52e2dd474b50ac14f6da8c7dda79367d1d3ed6ed51546c4870287bd59645c25db0_640.jpg",
      "type":"photo",
      "previewHeight":99,
      "tags":"morning, sip, wood anemone",
      "downloads":24158,
      "user":"Zazu70",
      "favorites":81,
      "imageSize":3993192,
      "previewWidth":150,
      "userImageURL":"https://cdn.pixabay.com/user/2016/09/16/15-36-13-215_250x250.jpg",
      "previewURL":"https://cdn.pixabay.com/photo/2019/06/19/07/06/morning-4284120_150.jpg"
  },
  {
      "largeImageURL":"https://pixabay.com/get/55e4dd424354aa14f6da8c7dda79367d1d3ed6ed51546c4870287bd59645c25db0_1280.jpg",
      "webformatHeight":426,
      "webformatWidth":640,
      "likes":137,
      "imageWidth":6000,
      "id":3481966,
      "user_id":4023294,
      "views":39877,
      "comments":62,
      "pageURL":"https://pixabay.com/photos/nature-insect-butterfly-six-moth-3481966/",
      "imageHeight":4000,
      "webformatURL":"https://pixabay.com/get/55e4dd424354aa14f6da8c7dda79367d1d3ed6ed51546c4870287bd59645c25db0_640.jpg",
      "type":"photo",
      "previewHeight":99,
      "tags":"nature, insect, butterfly",
      "downloads":32245,
      "user":"Schwoaze",
      "favorites":97,
      "imageSize":2889458,
      "previewWidth":150,
      "userImageURL":"https://cdn.pixabay.com/user/2017/11/25/23-27-34-498_250x250.jpg",
      "previewURL":"https://cdn.pixabay.com/photo/2018/06/18/06/43/nature-3481966_150.jpg"
  },
  {
      "largeImageURL":"https://pixabay.com/get/52e3d7414c51a914f6da8c7dda79367d1d3ed6ed51546c4870287bd59645c25db0_1280.jpg",
      "webformatHeight":415,
      "webformatWidth":640,
      "likes":71,
      "imageWidth":4298,
      "id":4322635,
      "user_id":1767157,
      "views":12778,
      "comments":53,
      "pageURL":"https://pixabay.com/photos/tulip-tulip-field-blossom-bloom-4322635/",
      "imageHeight":2787,
      "webformatURL":"https://pixabay.com/get/52e3d7414c51a914f6da8c7dda79367d1d3ed6ed51546c4870287bd59645c25db0_640.jpg",
      "type":"photo",
      "previewHeight":97,
      "tags":"tulip, tulip field, blossom",
      "downloads":10761,
      "user":"Capri23auto",
      "favorites":37,
      "imageSize":1677552,
      "previewWidth":150,
      "userImageURL":"https://cdn.pixabay.com/user/2019/06/21/09-21-09-355_250x250.jpg",
      "previewURL":"https://cdn.pixabay.com/photo/2019/07/07/15/01/tulip-4322635_150.jpg"
  },
  {
      "largeImageURL":"https://pixabay.com/get/55e5dd4b4d50a914f6da8c7dda79367d1d3ed6ed51546c4870287bd59645c25db0_1280.jpg",
      "webformatHeight":426,
      "webformatWidth":640,
      "likes":80,
      "imageWidth":4896,
      "id":3588725,
      "user_id":1195798,
      "views":15679,
      "comments":26,
      "pageURL":"https://pixabay.com/photos/calla-flower-hy-blossom-bloom-3588725/",
      "imageHeight":3264,
      "webformatURL":"https://pixabay.com/get/55e5dd4b4d50a914f6da8c7dda79367d1d3ed6ed51546c4870287bd59645c25db0_640.jpg",
      "type":"photo",
      "previewHeight":99,
      "tags":"calla, flower, hy",
      "downloads":12169,
      "user":"Couleur",
      "favorites":70,
      "imageSize":1635151,
      "previewWidth":150,
      "userImageURL":"https://cdn.pixabay.com/user/2019/07/30/15-24-04-643_250x250.jpg",
      "previewURL":"https://cdn.pixabay.com/photo/2018/08/06/23/51/calla-3588725_150.jpg"
  },
  {
      "largeImageURL":"https://pixabay.com/get/55e5d4464b5aad14f6da8c7dda79367d1d3ed6ed51546c4870287bd59645c25db0_1280.jpg",
      "webformatHeight":640,
      "webformatWidth":640,
      "likes":102,
      "imageWidth":3000,
      "id":3515181,
      "user_id":7009216,
      "views":32910,
      "comments":79,
      "pageURL":"https://pixabay.com/photos/tulip-tulips-flowers-spring-plant-3515181/",
      "imageHeight":3000,
      "webformatURL":"https://pixabay.com/get/55e5d4464b5aad14f6da8c7dda79367d1d3ed6ed51546c4870287bd59645c25db0_640.jpg",
      "type":"photo",
      "previewHeight":150,
      "tags":"tulip, tulips, flowers",
      "downloads":23247,
      "user":"susan-lu4esm",
      "favorites":77,
      "imageSize":1132523,
      "previewWidth":150,
      "userImageURL":"https://cdn.pixabay.com/user/2019/06/09/02-16-44-703_250x250.jpg",
      "previewURL":"https://cdn.pixabay.com/photo/2018/07/04/01/15/tulip-3515181_150.jpg"
  },
  {
      "largeImageURL":"https://pixabay.com/get/52e1dc454a54a814f6da8c7dda79367d1d3ed6ed51546c4870287bd59645c25db0_1280.jpg",
      "webformatHeight":427,
      "webformatWidth":640,
      "likes":133,
      "imageWidth":3000,
      "id":4196064,
      "user_id":526143,
      "views":35948,
      "comments":84,
      "pageURL":"https://pixabay.com/photos/anemone-blue-spring-garden-nature-4196064/",
      "imageHeight":2003,
      "webformatURL":"https://pixabay.com/get/52e1dc454a54a814f6da8c7dda79367d1d3ed6ed51546c4870287bd59645c25db0_640.jpg",
      "type":"photo",
      "previewHeight":100,
      "tags":"anemone, blue, spring",
      "downloads":31356,
      "user":"Pezibear",
      "favorites":68,
      "imageSize":729867,
      "previewWidth":150,
      "userImageURL":"https://cdn.pixabay.com/user/2019/03/28/14-46-04-252_250x250.jpg",
      "previewURL":"https://cdn.pixabay.com/photo/2019/05/11/16/53/anemone-4196064_150.jpg"
  },
  {
      "largeImageURL":"https://pixabay.com/get/5ee2d4415753ae01f7c5d57cc42036761d3ddbf852547649742e73d39245_1280.jpg",
      "webformatHeight":480,
      "webformatWidth":640,
      "likes":110,
      "imageWidth":3264,
      "id":8212,
      "user_id":2,
      "views":48533,
      "comments":8,
      "pageURL":"https://pixabay.com/photos/gerbera-flowers-plant-summer-8212/",
      "imageHeight":2448,
      "webformatURL":"https://pixabay.com/get/5ee2d4415753ae01f7c5d57cc42036761d3ddbf852547649742e73d39245_640.jpg",
      "type":"photo",
      "previewHeight":112,
      "tags":"gerbera, flowers, plant",
      "downloads":7243,
      "user":"Hans",
      "favorites":92,
      "imageSize":1124250,
      "previewWidth":150,
      "userImageURL":"https://cdn.pixabay.com/user/2019/01/29/15-01-52-802_250x250.jpg",
      "previewURL":"https://cdn.pixabay.com/photo/2011/06/29/15/47/gerbera-8212_150.jpg"
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
    const  nwk =new Nwk({urlimage:a})
 
  nwk.save(function(err){
console.log(nwk)
res.send(nwk)
  })
})
  router.get('/getlist',function(req,res){
Nwk.findOne({_id:'5d96bcd085809d18282a8cea'}).then((doc)=>{
res.send(doc.urlimage)
})
  })
  router.get('/cc',function(req,res){
    
  Nwk.findOneAndUpdate({_id: '5d961a1a0bedc10f6cdb5663'}, {$push: {urlimage:a}}, function (error, success) {
    if (error) {
        console.log(error);
    } else {
        console.log(success);
        res.send(success)
    }
    });
})
module.exports = router;