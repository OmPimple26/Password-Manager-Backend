// const express = require('express')
// const dotenv = require('dotenv')
// const {MongoClient}  = require('mongodb');
// const bodyParser = require('body-parser');
// const cors = require('cors');

// dotenv.config()

// // Connection URL
// const url = "mongodb://localhost:27017/";
// const client  = new MongoClient(url);

// // Databse Name
// const dbName = 'passop';
// const app = express()
// const port = 3000
// // console.log(process.env.MONGO_URI) // remove this after you've confirmed it is working
// app.use(bodyParser.json());
// app.use(cors());

// client.connect();
// console.log('Connected successfully to mongo server');

// // Get all the passwords
// app.get('/', async (req, res) => {
//     const db = client.db(dbName);
//     const collection = db.collection('passwords');
//     const findResult =  await collection.find({}).toArray();
//     res.json(findResult)
// })

// // Save a password
// app.post('/', async (req, res) => {
//     const password = req.body;
//     const db = client.db(dbName);
//     const collection = db.collection('passwords');
//     const findResult =  await collection.insertOne(password);
//     res.send({success: true, result: findResult})
// })

// // Delete a password by id
// app.delete('/', async (req, res) => {
//     const password = req.body;
//     const db = client.db(dbName);
//     const collection = db.collection('passwords');
//     const findResult =  await collection.deleteOne(password);
//     res.send({success: true, result: findResult})
// })

// app.listen(port, () => {
// //   console.log(`Example app listening on port ${port}`)
//     console.log(`Example app listening on port http://localhost:3000/`)
// })

// const express = require("express");
// const dotenv = require("dotenv");
// const { MongoClient } = require("mongodb");
// const bodyParser = require("body-parser");
// const cors = require("cors");

// dotenv.config();

// const app = express();
// const port = process.env.PORT || 3000;

// // Middlewares
// app.use(bodyParser.json());
// app.use(
//   cors({
//     origin: process.env.FRONTEND_URL, // Only allow your deployed frontend
//     methods: ["GET", "POST", "DELETE"],
//   })
// );

// // MongoDB Atlas Connection
// const client = new MongoClient(process.env.MONGO_URI);
// const dbName = "passop";

// async function main() {
//   try {
//     await client.connect();
//     console.log("✅ Connected successfully to MongoDB Atlas");

//     const db = client.db(dbName);
//     const collection = db.collection("passwords");

//     // // Get all passwords
//     // app.get('/', async (req, res) => {
//     //   const findResult = await collection.find({}).toArray();
//     //   res.json(findResult);
//     // });

//     // // Save a password
//     // app.post('/', async (req, res) => {
//     //   const password = req.body;
//     //   const findResult = await collection.insertOne(password);
//     //   res.send({ success: true, result: findResult });
//     // });

//     // // Delete a password
//     // app.delete('/', async (req, res) => {
//     //   const password = req.body;
//     //   const findResult = await collection.deleteOne(password);
//     //   res.send({ success: true, result: findResult });
//     // });

//     app.get('/api/passwords', async (req, res) => {
//     const findResult = await collection.find({}).toArray();
//     res.json(findResult);
//     });

//     app.post('/api/passwords', async (req, res) => {
//     const password = req.body;
//     const findResult = await collection.insertOne(password);
//     res.send({ success: true, result: findResult });
//     });

//     app.delete('/api/passwords', async (req, res) => {
//     const password = req.body;
//     const findResult = await collection.deleteOne(password);
//     res.send({ success: true, result: findResult });
//     });


//     app.listen(port, () => {
//       console.log(`🚀 Server running on port ${port}`);
//     });
//   } catch (error) {
//     console.error("❌ Error connecting to MongoDB Atlas:", error);
//   }
// }

// main();

const express = require("express");
const dotenv = require("dotenv");
const { MongoClient } = require("mongodb");
const bodyParser = require("body-parser");
const cors = require("cors");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*",
    methods: ["GET", "POST", "DELETE"],
  })
);

// MongoDB setup
const client = new MongoClient(process.env.MONGO_URI);
const dbName = "passop";

async function main() {
  try {
    await client.connect();
    console.log("✅ Connected successfully to MongoDB Atlas");

    const db = client.db(dbName);
    const collection = db.collection("passwords");

    // Get all passwords
    app.get("https://password-manager-backend-c93g.onrender.com/api/passwords", async (req, res) => {
      try {
        const findResult = await collection.find({}).toArray();
        res.json(findResult);
      } catch (error) {
        console.error("❌ Error fetching passwords:", error);
        res.status(500).json({ error: "Failed to fetch passwords" });
      }
    });

    // Save a password
    app.post("https://password-manager-backend-c93g.onrender.com/api/passwords", async (req, res) => {
      try {
        const password = req.body;
        const result = await collection.insertOne(password);
        res.send({ success: true, result });
      } catch (error) {
        console.error("❌ Error saving password:", error);
        res.status(500).json({ error: "Failed to save password" });
      }
    });

    // Delete a password
    app.delete("https://password-manager-backend-c93g.onrender.com/api/passwords", async (req, res) => {
      try {
        const { id } = req.body;
        const result = await collection.deleteOne({ id });
        res.send({ success: true, result });
      } catch (error) {
        console.error("❌ Error deleting password:", error);
        res.status(500).json({ error: "Failed to delete password" });
      }
    });

    // Start server
    app.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
    });
  } catch (error) {
    console.error("❌ Error connecting to MongoDB Atlas:", error);
  }
}

main();
