import express from "express";
import productsRouter from "../products/products.router.js"
const router = express.Router()

const carts = []
const products = []
let cid = 0;

router.get("/carts", (req, res) => {
    res.json(carts)
})

router.get("/carts/:cid", (req, res) => {
    let idCarts = parseInt(req.params.cid);

    let cart = carts.find((a) => a.cid === idCarts);

    if (!cart) return res.send({ error: "the cart was not found!" });

    res.json(cart)
})

router.post("/carts", (req, res) => {
      const newCart = {
        cid: ++cid,
        products: [],
      };

    carts.push(newCart)
    res.json({message: "Registered carts!"})
})

router.post("/carts/:cid/product/:pid", (req, res) => {
    let idCart = parseInt(req.params.cid);
    let idProduct = parseInt(req.params.pid);
    const {quantity} = req.body


    if (!productsRouter.products || productsRouter.products.length === 0) {
        return res.status(404).json({ error: "Products not found!!!!!!!!!!!!!" });
      }
    
    let product = productsRouter.products.find((a) => a.pid === idProduct);
    if (!product) return res.send({ error: "the product was not found!" });

    let cart = carts.find((a) => a.cid === idCart);
    if (!cart) return res.send({ error: "the cart was not found!" });


    let existingProduct = cart.product.find((a) => a.id === idProduct)

    if(existingProduct){
        existingProduct.quantity += parseInt(quantity) || 1
    }else {
        cart.product.push({
            id: idProduct,
            quantity: parseInt(quantity) || 1
        })
    }
    // const newProduct = {
    //   id:id
    // };

//   products.push(newProduct)
  res.json({message: "Product added to cart!"})
})


export default router;