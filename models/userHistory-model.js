


const mongoose = require("mongoose");


const historySchema = mongoose.Schema({
username:{
    type:String
},
useremail:{
    type:String
},
userphone:{
    type:String
},
bookname:{
    type:String
},
bookauthor:{
    type:String
},
bookurl:{
    type:String
},
bookaddnumber:{
    type:Number
},
bookprice:{
    type:Number
},
totalprice:{
    type:Number
},
createAt:{
    type:Date,
    default:Date.now
  }
});


const UserHistory = new mongoose.model("paymentuser",historySchema);

module.exports =UserHistory;
