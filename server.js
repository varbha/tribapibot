var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var apiai = require('apiai');
global.mongoose=require('mongoose');
var things= require('./index.js');

mongoose.connect("mongodb://localhost:27017/oosedb", function (err) {
    if (err) {
        console.log("DB Error: ", err);

        process.exit(1);
    } else {
        console.log('MongoDB Connectedd');
    }
});

//-----------------middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
extended: true }));
app.use(bodyParser.json());

app.use("/",things);

/* //---------------route handling
app.get('/', function(req, res) {
	  console.log(__dirname);
    res.sendFile(__dirname+'/public/homepage.html');
});


  app.post('/query/',function(req,res){
	  
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




  }); */
 /*  app.post("/query/",function(req,res){
	  console.log(req.body.query);
	  res.json("thanks");
  }); */

var port = process.env.PORT || 8080;        // set the port




app.listen(port);
console.log('Magic happens on port ' + port);
