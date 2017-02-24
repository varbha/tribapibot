var express= require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var apiai = require('apiai');
global.mongoose=require('mongoose');
var apiai = require('apiai');
var api = apiai("2c5ab231fb2448c2ba1464dcb3a4e9e7"); //apiai key
var QueryResponse= require('./models/QueryResponse');


router.get("/", function(req,res){
	console.log(__dirname);
	res.sendFile(__dirname+'/public/homepage.html');
});

router.post("/query/", function(req,res){
	
	console.log(req.body.query);
    var request = api.textRequest(req.body.query, {
        sessionId: 'somerandomthing'
    });

    request.on('response', function(response) {
      console.log(response);
      res.json(response);
      var post= new QueryResponse({query:req.body.query,response:response.result.fulfillment.speech,session_Id:1223,status:response.status.code, meta: response.result.metadata,date: new Date().toISOString()});
      post.save(function (err) {
        if (err) {
            return err;
          }
          else {
             console.log("Post saved in oosedb");
           }
         });

    });

    request.on('error', function(error) {
        res.json(error);
    });

    request.end();




  });
  
module.exports=router;

