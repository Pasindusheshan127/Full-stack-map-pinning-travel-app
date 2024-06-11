const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const pinRouter = require("./routes/Pin");
const userRouter = require("./routes/User");

dotenv.config();

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(5000, () => {
      console.log("backend server is running");
    });
    console.log("database connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/api/pins", pinRouter);
app.use("/api/users", userRouter);
