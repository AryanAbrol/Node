require('dotenv').config();
console.log(process.env.DB_PASSWORD);
const fs = require('fs');
const datajson = fs.readFileSync('data.json','utf-8');
const mongoose = require('mongoose');
const { Schema } = mongoose;
// const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
// const products = data.products;

// router in express----->
// const productRouter = express.Router();
// server.use('/api',productRouter)
//  for using--> productRouter.get('/products',(req,res)=>{})
//  for using with modules--> productRouter.get('/products', productRouter.createproduct) createproduct ek function hai jo module mein define hoga
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/local');
  console.log("database connected");
}
const express = require('express');
// const morgan = require('morgan');
const server = express();

// body parser
server.use(express.json());

// schema for mongo

  // title: String, // String is shorthand for {type: String}
  // author: String,
  // body: String,
  // comments: [{ body: String, date: Date }],
  // date: { type: Date, default: Date.now },
  // hidden: Boolean,
  // meta: {
  //   votes: Number,
  //   favs: Number
  // }




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

const products = new Schema({
  title: {type: String,required: true,unique: true},
  description: String ,
  price: Number,
  discountPercentage: Number,
  rating: {type: Number,min: [0,"put something"],max: [100,"it is ok"],required: true},
  stock: Number,
  brand: String ,
  category: String,
  thumbnail: String,
  images: [String]
});
const Product = mongoose.model('product', products);
server.get('/product/:id',/*auth,*/(req,res)=>
{
  console.log(req.params)
  res.json({type: "GET"});
})

server.post('/', /*auth,*/ async (req, res) => {
  try {
    const product = new Product(req.body);
    // product.title = "iphone";
    // product.price = 9997;
    // product.rating = 4.5;
    const savedProduct = await product.save();
    console.log({ doc: savedProduct });
    res.json({ type: "POST", doc: savedProduct });
  } catch (err) {
    console.error({ err });
    res.status(401).json({ error: "Internal Server Error" });
  }
});

server.put('/',/*auth,*/(req,res)=>
{
  res.json({type: "PUT"});
})

server.delete('/',/*auth,*/(req,res)=>
{
  res.json({type: "DELETE"});
})

server.patch('/',/*auth,*/(req,res)=>
{
  res.json({type: "PATCH"});
})



server.get('/',async(req,res)=>
{
  const product = await Product.find();
  res.json(product);
  // res.sendStatus(404);
  // res.status(201).send('<h1>hi</h1>')
  // res.json(datajson);
})







server.listen(3000,()=>{
  console.log("server started");
});