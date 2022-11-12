const { data } = require("cheerio/lib/api/attributes");
const express = require("express");
const userModel=require('../Models/userModel')
const jwt = require("jsonwebtoken");
const {JWT_KEY}=require('../secrets.js')
const bcrypt = require('bcrypt');
const fs=require('fs')
const {cloudinary}=require('../cloudinary')
const {uploads}=require('../cloudinary')
module.exports.signup=async function signup(req,res){

    try{
        let dataObj=req.body
        const salt= await bcrypt.genSalt(10);
        const sec=await bcrypt.hash(dataObj.password,salt)
        
dataObj.password=sec
dataObj.confirmpassword=sec
// dataObj.email=secE
let user=await userModel.create(dataObj)


if(user){

//  res.location('/login')   
res.json({
    message:"User Signed up",
    body: user,
    boolean:"false"
})


}
else{
  
    res.json({
        message:"Please Try Again !",
        boolean:"true"
    })
}
        

    }
    catch (err){

res.json({

    
    message:err.message,
   boolean:"true"
})
    }
}


module.exports.login=async function login(req,res){
try{

let dataObj=req.body

if(dataObj.email&&dataObj.password){
  
let user=await userModel.findOne({email:dataObj.email})

if(user){
    const isCorrect= await bcrypt.compare(dataObj.password,user.password)
    if(isCorrect){
        // console.log(req)
let uid=user["_id"];
let token=jwt.sign({payload:uid},JWT_KEY);
res.cookie("login",token)


// const uploader = async (path) => await uploads(path, 'Images');


const files = req.files;
for (const file of files) {
  
  user.profileImage=(file.path+"")

  user.save()
}



res.cookie("wrong","false")

res.redirect('/home')
// res.json({
//     data:user.profileImage
// })
// res.json({
//     message:"user logged in !",
//     data:user,
//     boolean:"false"

// })

    }
    else{
        res.cookie("wrong","true",{maxAge:4000})
        res.redirect('/login')
        // res.json({


        //     message:"Wrong Credentials",
         
        //     boolean:"true"          
        // })
    }
}

else{
    res.cookie("wrong","true",{maxAge:4000})
    res.redirect('/login')
}

}
else{
    res.json({
        message:"Empty Fields Found !",
        boolean:"true"          
    })
}

}
catch(err){
    res.json({
        boolean:"true"          ,
        message:err.message
    })
}

}
module.exports.logout=async function logout(req,res){
    res.cookie('login',' ',{maxAge:1});
  res.json({
    message:"user logged out succesfully"
  });
  
}
module.exports.protectRoute=async function protectRoute(req,res,next){
try{
if(req.cookies.login){
let token=req.cookies.login;
let payload_id=jwt.verify(token,JWT_KEY);
if(payload_id){
req.id=payload_id.payload;
next();
}
else{
    res.json({
        message:"Please Login Again"
    })
}


}
else{
    res.json({
        message:"Login Please !"
    })
   
}


}
catch(err){
    res.json({
        message:err.message
    })
}

}
// const express=req