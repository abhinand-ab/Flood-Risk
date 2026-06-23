const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const zoneRoutes = require("./routes/zoneRoutes");

const app = express();
const weatherRoutes = require("./routes/weatherRoutes");

app.use(cors());
app.use(express.json());

app.use("/api/zones", zoneRoutes);
app.use("/api/weather", weatherRoutes);

app.get("/", (req, res) => {
  res.send("Flood Risk Intelligence API Running");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");

    app.listen(process.env.PORT, () => {
      console.log(
        `Server Running on Port ${process.env.PORT}`
      );
    });
  })
  .catch((err) => console.log(err));