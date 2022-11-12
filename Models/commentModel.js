const { use } = require('express/lib/router');
const mongoose = require('mongoose');
const { strike } = require('pdfkit');
const db="mongodb+srv://DHEERAJ:MjFDow2mjiDywPvy@cluster0.axgs5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
mongoose.connect(db).then(function(db){
    
}).catch(function(err){
    console.log(err);
})
const commentSchema=mongoose.Schema({
       user:{
        type:mongoose.Schema.ObjectId,
        ref:'userModel',
        required:[true,'comment must belong to a user']
       },
       body:{
           type:String,
           required: true
       }
       ,
       likes:{
           type: Number,
           default:0
       }

})
commentSchema.pre(/^find/, function (next) {
    this.populate("user")
     next();
   });
const commentModel=mongoose.model('commentModel',commentSchema);
module.exports=commentModel
