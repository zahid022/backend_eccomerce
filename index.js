const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const brandRouter = require("./src/routes/brand.route");
const categoryRouter = require("./src/routes/category.route");
const productRouter = require("./src/routes/product.route");
const loginRouter = require("./src/routes/login.route");
const imgRouter = require("./src/routes/img.route");
const loginFunction = require("./src/midllwares/login");
const cartRouter = require("./src/routes/cart.route");

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
app.use("/api/img", loginFunction, imgRouter)
app.use("/api/cart", loginFunction, cartRouter)

app.listen(3000, () => {
  console.log("http://localhost:3000")
})