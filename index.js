const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
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
      const query = {};
      const cursor = inventoryCollection.find(query);
      const inventories = await cursor.toArray();
      res.send(inventories);
    });
  } finally {
  }
}
run().catch(console.dir);
