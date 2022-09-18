const dotenv = require("dotenv").config();
const colors = require("colors");
// const DBConnect = require("./utils/dbConnect");
const mongoose = require("mongoose");


const app = require("./app");

// database connection
// DBConnect();
const port = process.env.PORT || 8080;
mongoose.connect(process.env.DATABASE_AutoXpress).then(()=>{
 
  console.log(`Database connection is successfull!` .yellow.bold)
})
// server
app.listen(port, () => {
  console.log(`App is running on port ${port}`.yellow.bold);
});

