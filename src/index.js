const dotenv = require("dotenv")
dotenv.config();
const express = require("express")
const cors = require("cors")
const brandRouter = require("./routes/brand.route")
const categoryRouter = require("./routes/category.route")
const productRouter = require("./routes/product.route")
const loginRouter = require("./routes/login.route")
const PORT = process.env.PORT || 3000


const app = express()

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    res.send({message : "application is running"})
})

app.use("/brand", brandRouter)
app.use("/category", categoryRouter)
app.use("/products", productRouter)
app.use("/login", loginRouter)

app.listen(PORT, () => {
    console.log(`application is running http://localhost:${PORT}`)
})

module.exports = app