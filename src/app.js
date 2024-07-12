import express from "express"
import productsRouter from "./api/products/products.router.js"
import cartsrouter from "./api/cart/carts.router.js"

const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/", productsRouter)
app.use("/", cartsrouter)


app.listen(PORT, () => {
    console.log(`Listening on port http://localhost:${PORT}`)
})