const express = require("express");
const guestRouter=express.Router();
const {get,update}=require('../Controllers/guestController.js')
guestRouter
.route('/get')
.get(get)

guestRouter 
.route('/update')
.patch(update)
module.exports= guestRouter;



