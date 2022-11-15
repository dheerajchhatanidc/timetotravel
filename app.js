const express=require('express')
const app=express();
const mongose=require('mongoose')
var cors = require('cors');
const cookieParser=require('cookie-parser');
const path=require('path')
app.use(cors()) ;
app.use(express.json());
app.use(cookieParser());


const db="mongodb+srv://DHEERAJ:MjFDow2mjiDywPvy@cluster0.axgs5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
// const  db="mongodb://DHEERAJ:MjFDow2mjiDywPvy@main-shard-00-00-03xkr.mongodb.net:27017,main-shard-00-01-03xkr.mongodb.net:27017,main-shard-00-02-03xkr.mongodb.net:27017/main?ssl=true&replicaSet=Main-shard-0&authSource=admin&retryWrites=true"

mongose.connect(db).then((x)=>{
    
console.log('done');
}).catch((err)=>{
console.log(err)
})
const port=process.env.PORT || 5000;
app.listen(port,function(){
    console.log(`server listening on port ${port}`); 
});
const userRouter = require('./Routers/userRouter');
const postRouter = require('./Routers/postRouter');
const commentRouter = require('./Routers/commentRouter');
const guestRouter = require('./Routers/guestRouter');
const bodyParser=require('body-parser')

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use('/user',userRouter);

app.use('/post',postRouter);
app.use('/comment',commentRouter);
app.use('/guest',guestRouter);


app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function(req,res) {
		res.sendFile(path.join(__dirname, 'build', 'index.html'));
});