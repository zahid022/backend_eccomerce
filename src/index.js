const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const brandRouter = require("./routes/brand.route");
const categoryRouter = require("./routes/category.route");
const productRouter = require("./routes/product.route");
const loginRouter = require("./routes/login.route");
const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send({ message: "Application is running" });
});

app.use("/products", productRouter);
app.use("/brands", brandRouter);
app.use("/category", categoryRouter);
app.use("/login", loginRouter);

module.exports = app;
