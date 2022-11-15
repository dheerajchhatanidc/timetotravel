// const { use } = require('express/lib/router');
const mongoose = require('mongoose');
const { strike } = require('pdfkit');
const db="mongodb+srv://DHEERAJ:MjFDow2mjiDywPvy@cluster0.axgs5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
mongoose.connect(db).then(function(db){
    
}).catch(function(err){
    console.log(err);
})
const PostSchema=mongoose.Schema({
      user:{
        type:mongoose.Schema.ObjectId,
        ref:'userModel',
        required:[true,'post must belong to a user']
      },  
      comments:{
        type:mongoose.Schema.ObjectId,
        ref:'commentModel',
        
      },
    createdAt:{
        type:Date,
        default:Date.now
    } , 
    likes:{
        type:Number,
        default : 0
    },    
title :{
    type:String,
    required:true
},
body :{
    type:String,
    required:true
},
media:{
  type:Array
  
},
comments:{
type:Array,

}



})
PostSchema.pre(/^find/, function (next) {
   this.populate("user").populate("comments")
    next();
  });
const postModel=mongoose.model('postModel',PostSchema);
module.exports=postModel
