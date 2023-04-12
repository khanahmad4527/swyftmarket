const express = require("express");
const cors = require("cors");
const { connection } = require("./config/database.js");
const { router } = require("./routes/routes.js");
require("dotenv").config();

const app = express();

app.use(cors());

app.use(express.json());

app.use("/", router);

const PORT = process.env.PORT || 8080;
app.listen(PORT, "0.0.0.0", async () => {
  try {
    await connection;
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
  console.log(`Listening to server on PORT ${PORT}`);
});
