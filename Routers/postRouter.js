const express = require("express");
const postRouter=express.Router();
const {createPost}=require('../Controllers/postController')
const {updatePost}=require('../Controllers/postController')
const {protectRoute}=require('../Controllers/authController')
const {cloudinary}=require('../cloudinary')
const fs=require('fs')
const upload=require('../cloudinary')

const {getAllPosts,addComment,likeCmt,UnlikeCmt}=require('../Controllers/postController')
const multer=require('multer')
const bodyParser=require('body-parser')

   

   

postRouter
.route('/createPost')
.post(upload.array('image',100),createPost)

postRouter
.route('/all')
.get(getAllPosts)


postRouter
.route('/update')
.patch(updatePost)

postRouter
.route('/addComment')
.post(addComment)

postRouter
.route('/like')
.patch(likeCmt)
   
postRouter
.route('/dislike')
.patch(UnlikeCmt)
  

module.exports=postRouter;