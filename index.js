const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb'); 
require('dotenv').config();
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;

const uri = `mongodb+srv://${process.env.DB_PHONE}:${process.env.DB_PASSWORD}@cluster0.dnyaogd.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 }); 

app.use(cors());
app.use(express.json());
 
async function run() {

    try {
  
      await client.connect(); 
      const phoneCollection = client.db("Phone_Collection").collection("Phone"); 


    //   Get all phones from database

    app.get('/phones', async(req,res) => {
        const query = {};
        const cursor = phoneCollection.find(query);
        const phones = await cursor.toArray();
        res.send(phones) 
      });
 

      // Get one phone 

      app.get('/phones/:id', async(req, res) => {
        const id = req.params.id; 
        const query = {_id: ObjectId(id)};
        const phone = await phoneCollection.findOne(query);
        res.send(phone) 
      })
 

      // Add phone 

      app.post('/phones', async(req, res) =>{
        const newPhone = req.body;
        console.log(newPhone)
        const result = await phoneCollection.insertOne(newPhone);
        res.send(result)
      })
      

      // Delete

      app.delete('/phones/:id', async(req, res) => {
        const id = req.params.id;
        const query = {_id: ObjectId(id)};
        console.log(query)
        const result = await phoneCollection.deleteOne(query);
        res.send(result)
      }) 

     
 
    } finally { 
    //   await client.close(); 
    } 
  } 
  run().catch(console.dir);

   
 
app.listen(port, ()=>{
    console.log('successfully connected', port)
})

