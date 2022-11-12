const { use } = require('express/lib/router');
const mongoose = require('mongoose');
const { strike } = require('pdfkit');
const db="mongodb+srv://DHEERAJ:MjFDow2mjiDywPvy@cluster0.axgs5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
mongoose.connect(db).then(function(db){
    
}).catch(function(err){
    console.log(err);
})
const guestSchema=mongoose.Schema({
       count:{
            type:Number,
            default:0
       }
})
const guestModel=mongoose.model('guestModel',guestSchema);
module.exports=guestModel
