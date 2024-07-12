import express from "express";
const router = express.Router();
import { payloadProducts, saveProducts } from "../../utils/products.utils.js"

payloadProducts();
const products = payloadProducts();

router.get("/products", (req, res) => {
  let limit = parseInt(req.query.limit);
  let limitedProducts = [...products];

  if (!isNaN(limit) && limit > 0) {
    limitedProducts = limitedProducts.slice(0, limit);
  }

  res.json(limitedProducts);
});

router.get("/products/:pid", (req, res) => {
  let idProduct = parseInt(req.params.pid);

  let product = products.find((a) => a.pid === idProduct);

  if (!product) return res.send({ error: "the student was not found!" });

  res.json(product);
});

router.post("/products", (req, res) => {
  const data = req.body;
  const newProducts = Array.isArray(data) ? data : [data];
  
  newProducts.forEach((item) => {
    const { title, description, code, price, stock, category, thumbnails } =  item;
    let idProduct = products.reduce((max, product) => product.id > max ? product.id : max, 0 )

    if (!title || !description || !code || !price || !stock || !category) {
      return res.status(400).json({ error: "All fields except thumbnails are required." });
    }

    const newProduct = {
      id: idProduct + 1,
      title: String(title),
      description: String(description),
      code: String(code),
      price: Number(price) || 0,
      status: true,
      stock: Number(stock) || 20,
      category: String(category),
      thumbnails: String(thumbnails),
    };

    products.push(newProduct);
    saveProducts(products);
  });

  res.json({ message: "Registered products!" });
});

router.put("/products/:pid", (req, res) => {
  const idProduct = parseInt(req.params.pid);
  const data = req.body;

  let product = products.find((a) => a.pid === idProduct);

  if (!product) return res.send({ error: "the student was not found!" });

  const { title, description, code, price, stock, category, thumbnails } = data;

  product.title = title || product.title;
  product.description = description || product.description;
  product.code = code || product.code;
  product.price = price || product.price;
  product.stock = stock || product.stock;
  product.category = category || product.category;
  product.thumbnails = thumbnails || product.thumbnails;
  
  saveProducts(products);
  res.json({ product });
});

router.delete("/products/:pid", (req, res) => {
  const idProduct = parseInt(req.params.pid);
  let product = products.findIndex((a) => a.pid === idProduct);

  if (!product || product === -1)
    return res.send({ error: "the student was not found!" });

  products.splice(product, 1);
  saveProducts(products);
  res.json({ message: "Product deleted!" });
});

export default router;