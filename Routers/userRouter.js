const {signup,login,logout} =require( '../Controllers/authController.js')
const {updateUser,updateProfileImage,get,get1} =require( '../Controllers/userController.js')
const express = require("express");
const userRouter=express.Router();
const {protectRoute}=require('../Controllers/authController')
const multer=require('multer')
const storage=require('../cloudinary')
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const upload=require('../cloudinary')
const fs=require('fs')

userRouter
.route('/signup')
.post(signup)

userRouter
.route('/login')
.post(upload.array('image',1),login)

userRouter
.route('/logout')
.get(logout)
userRouter.use(protectRoute)
.route('/:id')
.patch(updateUser)

userRouter
.route('/get')
.get(get)

userRouter
.route('/all')
.get(get1)
  

 
module.exports=userRouter;