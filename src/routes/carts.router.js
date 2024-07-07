const express = require ("express")
const router = express.Router()

const carts = []

// Get
router.get("/carts", (req, res) => {
    res.json(carts)
})

// Post
router.post("/carts", (req, res) => {
    const newCarts = req.body
    carts.push(newCarts)
    res.json({message: "Registered carts!"})
})

module.exports = router