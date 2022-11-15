// const { data } = require("cheerio/lib/api/attributes");
const express = require("express");
const userModel=require('../Models/userModel')
const jwt = require("jsonwebtoken");
const {JWT_KEY}=require('../secrets.js');
const { use } = require("express/lib/router");

module.exports.updateUser=async function updateUser(req,res){
try{
let id=req.params.id
let user=await userModel.findById(id);
if(user){
let arr=req.body;
let keys=[];
for(let key in arr){
    keys.push(key);
}


for(let i=0;i<keys.length;i++){
    let actkey=keys[i];
    if(keys[i]=='likedPost'){
    let keyarr=arr[actkey];
    if(keyarr!=null){
        if(user[actkey].includes(keyarr[0])){
           for(let j=0;j<user[actkey].length;j++){
               if(user[actkey][j]==keyarr[0]){
                   user[actkey].splice(j,1);
                   break;
               }
           }
        }
        else{
        user[actkey].push(keyarr[0]);
    }
    }

       
    }
    else{
        user[actkey]=arr[actkey];

    }
}
const x=await user.save();

res.json({
    message:"user updated!",
    data :user
})


}
else{
    res.json({
        message:"no user found"
    })
}


}
catch(err){

    res.json({
        message:err.message,
      
    })
}

}
module.exports.updateProfileImage= async function updateProfileImage(req,res){
    res.json({
      message:'file uploaded succesfully'
    });
  }
module.exports.get=async function get(req,res){
try{
    let cookie=req.cookies.login
   // console.log(cookie)
    const decoded = jwt.verify(cookie, JWT_KEY);  
    var userId = decoded.payload  
let user=await userModel.findById(userId)
if(req.body.username){
    user=await userModel.find({username:req.body.username})
}

if(user){
res.json({
    message:"Success",
    link:user.profileImage,
    arr:user.likedPost,
    name:user.username
})
}
else{

res.json({

    message:'User not Found'
})
}
}
catch(err){
    res.json({
    message:err.message

    })

}

}
module.exports.get1 =async function get1(req,res){
try{
let users= await userModel.find();
let my={}
for(let i=0;i<(users).length;i++){
    my[users[i].username]=users[i].profileImage
}
// console.log(my)
res.json({
    data:my
})

}
catch(err){
    res.json({
        message:err.message
    })
}
}