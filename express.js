const fs = require('fs');
const datajson = fs.readFileSync('data.json','utf-8');

const express = require('express');
const morgan = require('morgan');
const server = express();

// body parser
server.use(express.json());

// server.use(express.static('folder name')); used for static hosting
// server.use((req,res,next)=>{
//   console.log(req.ip,req.method,req.ip,req.hostname,req.get('user-agent'),new Date());
//   next();
// })

server.use(morgan('default'));
const auth = (req,res,next)=>{
  // console.log(req.query)
  if(req.body.password==='123'){
    next();
  }
  else{
    res.sendStatus(401);
  }
}

// server.use(auth);

server.get('/product/:id',auth,(req,res)=>
{
  console.log(req.params)
  res.json({type: "GET"});
})

server.post('/',auth,(req,res)=>
{
  res.json({type: "POST"});
})

server.put('/',auth,(req,res)=>
{
  res.json({type: "PUT"});
})

server.delete('/',auth,(req,res)=>
{
  res.json({type: "DELETE"});
})

server.patch('/',auth,(req,res)=>
{
  res.json({type: "PATCH"});
})



server.get('/',(req,res)=>
{
  // res.sendStatus(404);
  // res.status(201).send('<h1>hi</h1>')
  // res.json(datajson);
})







server.listen(8080,()=>{
  console.log("server started");
});