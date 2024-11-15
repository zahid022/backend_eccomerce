const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const brandRouter = require("./routes/brand.route");
const categoryRouter = require("./routes/category.route");
const productRouter = require("./routes/product.route");
const loginRouter = require("./routes/login.route");
const imgRouter = require("./routes/img.route");
const loginFunction = require("./midllwares/login");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api", (req, res) => {
  res.send({ message: "application is running" });
});

app.use("/api/brand", brandRouter);
app.use("/api/category", categoryRouter);
app.use("/api/products", productRouter);
app.use("/api/login", loginRouter);
app.use("/api/img",loginFunction, imgRouter)

// module.exports = app;

app.listen(3000, () => {
  console.log("application is running http://localhost:3000")
})