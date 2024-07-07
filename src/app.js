const express = require("express")
const userRouter = require("./routes/products.router.js")

const app = express()
const PORT = 8080


app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/", userRouter)

app.listen(PORT, () => {
    console.log(`Listening on port http://localhost:${PORT}`)
})