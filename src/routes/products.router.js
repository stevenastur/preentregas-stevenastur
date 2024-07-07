const express = require ("express")
const router = express.Router()

const products = []

// Get
router.get("/products", (req, res) => {
    res.json(products)
})

// Post
router.post("/products", (req, res) => {
    const newProducts = req.body
    products.push(newProducts)
    res.json({message: "Registered products!"})
})

module.exports = router


// {
//     "title": "Procesador Intel Core i7-12700K",
//     "description": "Procesador de 12ª generación",
//     "code": "INTEL12700K",
//     "price": "$429.99",
//     "status": "true",
//     "stock": True,
//     "category": "Procesadores",
//     "thumbnails": "https://example.com/imagen1.jpg"
// },