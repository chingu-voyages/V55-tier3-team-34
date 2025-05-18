require("dotenv").config();
const express = require("express");


const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());
app.use(express.static("dist"));

app.listen(port, () => {
  console.log(`application started and listening on port ${port}`);
});