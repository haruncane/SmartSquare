const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const authRouter = require("./routes/authRoutes");
const chatRouter = require("./routes/chatRoutes");

const app = express();
const dbConnect = () => {
    try {
        const connect =mongoose.connect(process.env.MONGODB_URL);
        console.log("Database connection successful");
    } catch (err) {
        console.log("Database connection failed");
    }
};

dbConnect();
app.use(bodyParser.json());
app.use(cors());

app.use("/api/user", authRouter);
app.use("/api/chat", chatRouter);

app.listen(process.env.PORT, () => {
    console.log(`${process.env.PORT} is running`);
});