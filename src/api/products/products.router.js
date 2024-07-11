import express from "express";
const router = express.Router();

const products = [];
let pid = 0;

router.get("/products", (req, res) => {
  let limit = parseInt(req.query.limit);

  let limitedAlumnos = [...products];

  if (!isNaN(limit) && limit > 0) {
    limitedAlumnos = limitedAlumnos.slice(0, limit);
  }

  res.json(limitedAlumnos);
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
    const { title, description, code, price, stock, category, thumbnails } =
      item;

    if (!title || !description || !code || !price || !stock || !category) {
      return res.status(400).json({ error: "All fields except thumbnails are required." });
    }

    const newProduct = {
      pid: ++pid,
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

  res.json({ message: "updated product!" });
});

router.delete("/products/:pid", (req, res) => {
  const idProduct = parseInt(req.params.pid);

  let product = products.findIndex((a) => a.pid === idProduct);

  if (!product || product === -1)
    return res.send({ error: "the student was not found!" });

  products.splice(product, 1);

  console.log(products);

  res.json({ message: "Product deleted!" });
});

export default router;
