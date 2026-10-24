import express from 'express'
import cors from "cors"
import 'dotenv/config'

const app = express();
const PORT = process.env.PORT | 5000;
app.use(cors());
app.use(express.json())


import { MongoClient } from 'mongodb';
const client = new MongoClient(`mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.tp9jxuf.mongodb.net/`);
export async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("You successfully connected to MongoDB!");
    return client;
  } catch (err) {
    console.dir(err);
  }
}
 const Users= await connectToMongoDB();
 const Detabase = Users.db('Wander_Last');
 const Destinations = Detabase.collection('destinations');




app.get( '/', (req,res)=>{
  res.send("This is Home of server")
})

app.get( '/Destinations', async (req,res)=>{
  const cursor = Destinations.find({});
  const result = await cursor.toArray();
  res.send(result);
})

app.listen(PORT , ()=>{
  console.log("The server is Running on port:",PORT)
  
})