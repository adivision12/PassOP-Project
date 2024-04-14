const express = require('express')
const app = express()
const mongoose = require('mongoose');
// const Pass=require('./models/pass.js')
const cors=require('cors')
var bodyParser = require('body-parser')

app.use(cors())
app.use(bodyParser.json())
app.listen(8080,()=>{
    console.log("server is listening on port 8080")
})

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/Passwords')
}
main().then(()=>{
    console.log("connection is successFul")
}).catch(err=> console.log(err))



const passSchema=new mongoose.Schema({
    url:String,
    username:String,
    password:String,
})

const Pass=mongoose.model("Pass",passSchema);




// app.post('/', async(req, res)=>{
//     let pass=new Pass(req.body);
//     let result=await pass.save();
//     res.send(result)
//   })
app.post("/",async(req,res)=>{
   if (req.body.url && req.body.password){
    let pass=new Pass();
    pass.url=req.body.url;
    pass.username=req.body.username;
    pass.password=req.body.password;
    let doc=await pass.save()
    // console.log(doc)
    res.json(doc)
   }else{
    res.json("Save Valid Details")
   }
})
  
app.get("/register",async(req,res)=>{
    let docs=await Pass.find({})
    res.json(docs)
})

app.delete("/delete",async(req,res)=>{
    console.log(req.body)
    let id=req.body.id;
    console.log(id)
    let docu=await Pass.findByIdAndDelete(id);
    // console.log(docu)
    // res.json(docu)
})