import express from "express"
import path from "path"
import { fileURLToPath } from "url"
import productsRouter from "./api/products/products.router.js"

const app = express()
const PORT = 8080

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(express.static(path.join(__dirname, "public")))

app.use("/", productsRouter)

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"))
})

app.listen(PORT, () => {
    console.log(`Listening on port http://localhost:${PORT}`)
})