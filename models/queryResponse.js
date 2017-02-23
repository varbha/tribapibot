var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var QueryResponse   = new Schema({
    query: String,
    response: String,
    session_Id:String,
    status: Number,
    date: Date,
    meta : Object
});

module.exports = mongoose.model('QueryResponse', QueryResponse);
