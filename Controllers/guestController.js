const express = require("express");
const guestModel=require('../Models/guestModel')
module.exports.get=async function get(req,res){

try{
    let count = await guestModel.findById('626d2bee45ff1acbe6c7983c')
 
res.json({
    data:count.count
    
})
}
catch(err){
    res.json({
        message:err.message
    })
}

}
module.exports.update=async function update(req,res){
   
    try{
        let count = await guestModel.findById('626d2bee45ff1acbe6c7983c')
        count.count=count.count +1;
        count.save();

    res.json({
        message:'Count updaated !'
    })
    }
    catch(err){
        res.json({
            message:err.message
        })
    }
    
    }