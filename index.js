const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 5000;
require("dotenv").config();

const app = express();
//Middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Auto Xpress Server Connected!");
});
app.listen(port, () => {
  console.log("Server Connected, Enjoy!");
});
//Database Connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.lywwz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run() {
  try {
    await client.connect();
    const inventoryCollection = client
      .db("auto-xpress")
      .collection("inventory");
    //Displaying all inventory collection
    app.get("/inventories", async (req, res) => {
      console.log('query',req.query);
      const page = parseInt(req.query.page);
      const size = parseInt(req.query.size);
      const query = {};
      const cursor = inventoryCollection.find(query);
      let inventories;
      if(page||size){
        inventories = await cursor.skip(page*size).limit(size).toArray();
      }else{
         inventories = await cursor.toArray();
      }
     
      res.send(inventories);
    });
    //Getting the specific inventory for updating
    app.get("/inventories/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await inventoryCollection.findOne(query);
      res.send(result);
    });
    //Updating Inventory
    app.put("/inventories/:id", async (req, res) => {
      const id = req.params.id;
      const updateInventory = req.body;
      const filter = { _id: ObjectId(id) };
      const option = { upsert: true };
      console.log(updateInventory);
      const updatedInventoryDoc = {
        $set: {
          quantity: updateInventory.remainingQuantity,
        },
      };
      const result = await inventoryCollection.updateOne(
        filter,
        updatedInventoryDoc,
        option
      );
      res.send(result);
    });
    //Adding an item
    app.post("/inventories", async (req, res) => {
      const addedItem = req.body;
      const result = await inventoryCollection.insertOne(addedItem);
      res.send(result);
    });

    //For Pagination
    app.get("/itemCount", async (req, res) => {
   
      const query = {};
      const cursor = inventoryCollection.find(query);
      const count = await inventoryCollection.estimatedDocumentCount();
      res.send({ count });
    });
  } finally {
  }
}
run().catch(console.dir);
