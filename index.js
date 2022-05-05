const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 5000;
require("dotenv").config();
const jwt = require("jsonwebtoken");

const app = express();
//Middleware
app.use(cors());
app.use(express.json());

//Middletier
function verifyJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send({ message: "Unauthorized Access" });
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
    if (error) {
      return res.status(403).send({ message: "Forbidden Accesss" });
    }
    console.log("Decoded", decoded);
    req.decoded = decoded;
    next();
  });
}

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
      // const decodedEmail = req.decoded.email;
      console.log("query", req.query);
      const page = parseInt(req.query.page);
      const size = parseInt(req.query.size);
      const query = {};
      const cursor = inventoryCollection.find(query);
      let inventories;
      if (page || size) {
        inventories = await cursor
          .skip(page * size)
          .limit(size)
          .toArray();
      } else {
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

    const selectedItemCollection = client
      .db("auto-xpress")
      .collection("selected-items");
    //Adding Unique Items from the Inventory to My items
    app.post("/selectedItems", async (req, res) => {
      const selectedItem = req.body;
      const doc = {
        name: selectedItem.name,
        img: selectedItem.img,
        quantity: selectedItem.quantity,
        price: selectedItem.price,
        shortDescription: selectedItem.shortDescription,
        email: selectedItem.email,
      };
      const foundItemCursor = selectedItemCollection.find(doc);
      const foundItem = await foundItemCursor.toArray();
      console.log(foundItem.length);
      if (foundItem.length !== 0) {
        console.log("Item already exists");
      } else {
        const result = await selectedItemCollection.insertOne(doc);
        res.send(result);
      }
    });
    //Getting the selected items
    app.get("/selectedItems", verifyJWT, async (req, res) => {
      const decodedEmail = req.decoded.email;
      const email = req.query.email;
      if (email === decodedEmail) {
        const query = {};
        const cursor = selectedItemCollection.find(query);
        const selectedItems = await cursor.toArray();
        res.send(selectedItems);
      }
    });

    //Deleting any Item from My Items page
    app.delete("/deleteItem/:id", async (req, res) => {
      const id = req.params.id;
      // console.log(id);
      const query = { _id: ObjectId(id) };
      console.log(query);
      const result = await selectedItemCollection.deleteOne(query);
      res.send(result);
    });

    //Deleting item from Manage Inventory page
    app.delete("/deleteFromInventory/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await inventoryCollection.deleteOne(query);
      res.send(result);
    });

    //Get JWT tokens
    app.post("/getToken", async (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "24h",
      });
      res.send({ token });
    });
  } finally {
  }
}
run().catch(console.dir);
