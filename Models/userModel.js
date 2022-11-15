// const { use } = require('express/lib/router');
const mongoose = require('mongoose');
const { strike } = require('pdfkit');
const db="mongodb+srv://DHEERAJ:MjFDow2mjiDywPvy@cluster0.axgs5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
mongoose.connect(db).then(function(db){
    
})
.catch(function(err){
    console.log(err);
})

let userSchema=mongoose.Schema({
        username :{
            type: String,
            required:true,
            unique:true
            

        },
        email :{
            type: String,
            required:true
           
        },
        password :{
            type:String,
            required:true,
            minLength:5,
    

        },

confirmpassword :{
    type:String,
    required:true,
    minLength:5,
    validate:function(){
      return this.confirmpassword==this.password
    }
},
        
// resetToken:String,
profileImage:{
    type:String,
    default:"user.png"
},
likedPost:{
    type:Array,
    default:[-1]
}


})

let userModel=mongoose.model('userModel',userSchema);
// userModel.createIndexes()
module.exports=userModel