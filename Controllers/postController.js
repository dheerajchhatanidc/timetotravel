const { data } = require("cheerio/lib/api/attributes");
const express = require("express");
const postModel=require('../Models/postModel')
const jwt = require("jsonwebtoken");
const {JWT_KEY}=require('../secrets.js');
// const { use } = require("express/lib/router");
const userModel=require('../Models/userModel')
const path=require('path')
const fs=require('fs')
const {cloudinary}=require('../cloudinary')
const {uploads}=require('../cloudinary')

module.exports.createPost=async function createPost(req,res){
try{
  
    if(true){
        const uploader = async (path) => await uploads(path, 'Images');
        

        const user=req.cookies.login
        const decoded = jwt.verify(user, JWT_KEY);  
        var userId = decoded.payload
        req.body.user=userId
let mypost=await postModel.create(req.body);
mypost.media=[]
if (req.method === 'POST') {
           
    const files = req.files;
    for (const file of files) {
     
      mypost.media.push(file.path)
     
    }}


mypost.title=req.body.title

mypost.body=req.body.body
mypost.user=userId;
console.log(userId)
await mypost.save();
res.redirect('/feed')
// res.json({
//     data:req.files
// })

// res.writeHead(304, {
//     Location: 'http://localhost:3000/feed'
// });
// res.end();

// res.json({
//     message:"Post Created Successfully !",
//     data:mypost

// })
// res.render('feed')
        

    }
    else{
        res.json(
            {
                message:"Invalid User !"
            }
        )
    }
}
catch(err){
    res.json({
        message:err.message
    })
}


}

module.exports.getAllPosts=async function getAllPosts(req,res){
try{

    let posts= await postModel.find();
    if(posts){
     
res.json({

    message : 'posts retrived !!',
    data :posts

})
    }
    else{
        res.json({
            message:'no posts yet :('
        })
    }


}
catch(err){
    res.json({
        message:err.message
    })
}

}

module.exports.updatePost=async function updatePost(req,res){

    try{
  let id=req.body.id;
  let post=await postModel.findById(id);
  let uid=req.body.uid;
  let user=await userModel.findById(uid);
//   console.log(user);
  if(post){

let req1=req.body;

    let actkey='likes'
  
    
       let likesArr=user.likedPost;
       if(likesArr.includes(id)){
            post[actkey]--;
        
         const idx =user.likedPost.indexOf(id)
         if(idx>-1){
             user.likedPost.splice(idx,1);
             await user.save()
         }
       }
       else{
        post[actkey]++;
        user.likedPost.push(id);
       await user.save()
       }
    

   


await post.save();
res.json({
    message:"post updated successfully !",
  
})

  }
  else{
      res.json({
          message:'No Such Post Found !'
      })
  }
// window.location.on
    }

    catch(err){
        res.json({
            message:err.message
        })
    }

}

module.exports.addComment=async function addComment(req,res){
    

try{
   
let pid=req.body.pid;
// console.time("in0")

let user=await userModel.findById(req.body.uid)

// console.log("server")

let post=await postModel.findById(pid);

// console.log("server1")
if(post){
let body=req.body.body
let obj={
    user:user.username,
    body:req.body.body,
    likes:[1],
    dislikes:[1],
    id:post.comments.length+1
}
// post.comments.push(obj);
post.comments.unshift(obj);
 await post.save()
 
 res.json({
     message:"added"
 })
}
else{
    res.json({
        message:'Post Not Found'
    })
}

}
catch(err){
console.log("band kar")

res.json({
    message:err.message
})
}

}
module.exports.likeCmt=async function likeCmt(req,res){
try{
let uid=req.body.uid
let pid=req.body.pid

let cid=req.body.cid
let post=await postModel.findById(pid);
if(post){
    let commentNew=[]
    console.log(cid)
for(let i=0;i<post.comments.length;i++){
    if(post.comments[i].id==cid){

        if(post.comments[i].likes.includes(uid)){
let tarr=[]
for(let j=0;j<post.comments[i].likes.length;j++){
    if(post.comments[i].likes[j]==uid)continue
    tarr.push(post.comments[i].likes[j])
}

post.comments[i].likes=[...tarr];


        }
        else{
            
            post.comments[i].likes.push(uid);
            
          
            // commentNew.push(post.comments[i])

        }


    }
    
}
for(let i=0;i<post.comments.length;i++){
    if(post.comments[i].id==cid){
        if(post.comments[i].dislikes.includes(uid)){
            let arr=[]
            for(let j=0;j<post.comments[i].dislikes.length;j++){
                if(post.comments[i].dislikes[j]==uid){

                }
                else arr.push(post.comments[i].dislikes[j])
            }
            post.comments[i].dislikes=[...arr]
        }
    }
}

// post.comments=[...commentNew]

await post.updateOne({comments:post.comments})
// post.comments.pop();


res.json({
    message:'Done',
    data:post
})}
else{
    res.json({
        message:'Post Not Found'
    })
    
}
}
catch(err){
    res.json({
        message:err.message
    })
}

}

module.exports.UnlikeCmt=async function UnlikeCmt(req,res){
    try{
    let uid=req.body.uid
    let pid=req.body.pid
    
    let cid=req.body.cid
    let post=await postModel.findById(pid);
    if(post){
        let commentNew=[]
        console.log(cid)
    for(let i=0;i<post.comments.length;i++){
        if(post.comments[i].id==cid){
    
            if(post.comments[i].dislikes.includes(uid)){
    let tarr=[]
    for(let j=0;j<post.comments[i].dislikes.length;j++){
        if(post.comments[i].dislikes[j]==uid)continue
        tarr.push(post.comments[i].dislikes[j])
    }
    
    post.comments[i].dislikes=[...tarr];
    
    
            }
            else{
                
                post.comments[i].dislikes.push(uid);
                
              
                // commentNew.push(post.comments[i])
    
            }
    
    
        }
        
    }
    for(let i=0;i<post.comments.length;i++){
        if(post.comments[i].id==cid){
            if(post.comments[i].likes.includes(uid)){
                let arr=[]
                for(let j=0;j<post.comments[i].likes.length;j++){
                    if(post.comments[i].likes[j]==uid){
    
                    }
                    else arr.push(post.comments[i].likes[j])
                }
                post.comments[i].likes=[...arr]
            }
        }
    }
    
    // post.comments=[...commentNew]
    
    await post.update({comments:post.comments})
    // post.comments.pop();
    
    
    res.json({
        message:'Done',
        data:post
    })}
    else{
        res.json({
            message:'Post Not Found'
        })
        
    }
    }
    catch(err){
        res.json({
            message:err.message
        })
    }
    
    }