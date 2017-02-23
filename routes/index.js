module.exports=function(app){

  var apiai = require('apiai');
  var api = apiai("2c5ab231fb2448c2ba1464dcb3a4e9e7"); //apiai key
  var QueryResponse= require('../models/QueryResponse');

  app.get('/', function(req, res) {
	  console.log(__dirname);
    res.sendFile(__dirname+'/homepage.html');
});





  app.get('/query',function(req,res){
    var request = api.textRequest(req.param('data'), {
        sessionId: '1223'
    });

    request.on('response', function(response) {
      console.log(response.result.fulfillment.speech);

      res.json(response.result.fulfillment.speech);
      var post= new QueryResponse({query:req.param('data'),response:response.result.fulfillment.speech,session_Id:1223,status:response.status.code, meta: response.result.metadata,date: new Date().toISOString()});
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
  app.post("/query/",function(req,res){
	  console.log(req);
	  res.json("thanks");
  });

  };
