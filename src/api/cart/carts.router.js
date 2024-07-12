import express from "express";
import { payloadCarts, saveCarts } from "../../utils/carts.utils.js";
const router = express.Router();

payloadCarts();

const carts = payloadCarts();

router.get("/carts", (req, res) => {
  res.json(carts);
});

router.get("/carts/:cid", (req, res) => {
  let idCarts = parseInt(req.params.cid);

  let cart = carts.find((a) => a.cid === idCarts);

  if (!cart) return res.send({ error: "the cart was not found!" });

  res.json(cart);
});

router.post("/carts", (req, res) => {
  const { products } = req.body;
  let idCarts = 0;

  if (carts.length > 0) {
    idCarts = carts.reduce((max, cart) => cart.id > max ? cart.id : max, 0);
  }
  const newCart = {
    id: idCarts + 1,
    products: products || [],
  };
  carts.push(newCart);
  saveCarts(carts);
  res.json({ message: "Registered carts!" });
});

router.post("/carts/:cid/product/:pid", (req, res) => {
  let idCart = parseInt(req.params.cid);
  let idProduct = parseInt(req.params.pid);
  const { quantity } = req.body;

  const cart = carts.find((a) => a.id === idCart);
  if (!cart) return res.send({ error: "the cart was not found!" });

  console.log(cart.products)

  const product = cart.products.find((a) => a.id === idProduct);
  console.log(cart.products)
  if (!product) return res.send({ error: "the product was not found!" });
  
  product.quantity += quantity;

  saveCarts(carts);
  res.json({ message: "Product added to cart!" });
});

router.delete('/:cid/product/:pid', (req, res) => {
  const idCart = parseInt(req.params.cid);
  const idProduct = parseInt(req.params.pid);
  const cart = carts.find(cart => cart.id === idCart);
  if (!cart) {
      return res.status(404).json({ error: "the cart was not found!" });
  }
  cart.products = cart.products.filter(a => a.id !== idProduct);

  res.json({ msg: "the cart was deleted!"});
  saveCarts(carts);
});

export default router;
