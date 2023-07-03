const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

//Routes
const userRouter = require("./routes/user");
const todoRouter = require("./routes/todo");

dotenv.config();

const PORT = 3000;

const app = express();

//MONGODB CREDENTIALS
const MONGODB_USERNAME = process.env.MONGODB_USERNAME;
const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD;
const MONGODB_DATABASE = process.env.MONGODB_DATABASE;

const MONGO_DB_URL = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@cluster0.agxcvyt.mongodb.net/${MONGODB_DATABASE}?retryWrites=true&w=majority`;

//Connect to DB
mongoose
  .connect(MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection Successful");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use(cors());

//Routes
app.use("/api/user", userRouter);
app.use("/api/todo", todoRouter);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running at PORT:${PORT}`);
});
