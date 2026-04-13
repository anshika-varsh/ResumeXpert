require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");

require("dotenv").config();
app.use(cors());
app.use(express.json());


app.use("/api", authRoutes);


mongoose.connect("mongodb://127.0.0.1:27017/DBauth")
.then(() => console.log("DB Connected"))
.catch(err => console.log(err));

app.get("/", (req, res) => {
  res.send("API Running...");
});

app.listen(5000, () => console.log("Server started"));