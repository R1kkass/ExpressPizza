require("dotenv").config();
const express = require("express");
const sequelize = require("./db");
const PORT = process.env.PORT || 5000;
const app = express();
const cors = require("cors");
const router = require("./routes/index");
const errorHandler = require("./middleware/ErrorHandlingMiddleware");
const path = require("path");

const mongoose = require("mongoose");
const User = require("./migrations/User");

app.use(cors({
    credentials: true,
    origin: "http://localhost:5173"
}
));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "static")));
app.use("/api", router);
app.use(errorHandler);

const start = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/PizzaStore");
        // let a = await User.find({ email: "ddsda" });
        // console.log("====================================");
        // console.log(a);
        // console.log("====================================");
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch (e) {
        console.log(e);
    }
};

start();
