const fs = require('fs');
const datajson = fs.readFileSync('data.json','utf-8');
// const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
// const products = data.products;

// router in express----->
// const productRouter = express.Router();
// server.use('/api',productRouter)
//  for using--> productRouter.get('/products',(req,res)=>{})
//  for using with modules--> productRouter.get('/products', productRouter.createproduct) createproduct ek function hai jo module mein define hoga

const express = require('express');
// const morgan = require('morgan');
const server = express();

// body parser
server.use(express.json());

// server.use(express.static('folder name')); used for static hosting
// server.use((req,res,next)=>{
//   console.log(req.ip,req.method,req.ip,req.hostname,req.get('user-agent'),new Date());
//   next();
// })
// API - Endpoint - Route

// Products
// API ROOT , base URL, example - google.com/api/v2/

//Create POST /products     C R U D => create,read,update,delete
// server.post('/products', (req, res) => {
//   console.log(req.body);
//   products.push(req.body);
//   res.status(201).json(req.body);
// });



// // Read GET /products
// server.get('/products', (req, res) => {
//   res.json(products);
// });

// // Read GET /products/:id
// server.get('/products/:id', (req, res) => {
//   const id = +req.params.id;
//   const product = products.find(p=>p.id===id)
//   res.json(product);
// });

// // Update PUT /products/:id
// server.put('/products/:id', (req, res) => {
//   const id = +req.params.id;
//   const productIndex = products.findIndex(p=>p.id===id)
//   products.splice(productIndex,1,{...req.body, id:id})
//   res.status(201).json();
// });
// // Update PATCH /products/:id
// server.patch('/products/:id', (req, res) => {
//   const id = +req.params.id;
//   const productIndex = products.findIndex(p=>p.id===id)
//   const product = products[productIndex];
//   products.splice(productIndex,1,{...product,...req.body})
//   res.status(201).json();
// });
// // Delete DELETE /products/:id
// server.delete('/products/:id', (req, res) => {
//   const id = +req.params.id;
//   const productIndex = products.findIndex(p=>p.id===id)
//   const product = products[productIndex];
//   products.splice(productIndex,1)
//   res.status(201).json(product);
// });

// server.use(morgan('default'));
// const auth = (req,res,next)=>{
//   // console.log(req.query)
//   if(req.body.password==='123'){
//     next();
//   }
//   else{
//     res.sendStatus(401);
//   }
// }
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