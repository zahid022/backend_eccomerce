const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const brandRouter = require("./routes/brand.route");
const categoryRouter = require("./routes/category.route");
const productRouter = require("./routes/product.route");
const loginRouter = require("./routes/login.route");

const app = express();

app.use(cors());
app.use(express.json());

// Test endpoint
app.get("/api", (req, res) => {
  res.send({ message: "application is running" });
});

// Rotalarınızı tanımlayın (base path `/api` olacak şekilde)
app.use("/api/brand", brandRouter);
app.use("/api/category", categoryRouter);
app.use("/api/products", productRouter);
app.use("/api/login", loginRouter);

// `app.listen()` KULLANMAYIN
module.exports = app;