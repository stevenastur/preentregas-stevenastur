import express from "express";
import { payloadProducts, saveProducts } from "../utils.js";

const router = express.Router();

let io; // Variable para almacenar la instancia de Socket.IO

// Exporta una función para configurar el router con Socket.IO
export function initializeRouter(socketIo) {
  io = socketIo;
}


// payloadProducts();
const products = payloadProducts();

router.get("/products", (req, res) => {
  let limit = parseInt(req.query.limit);
  let limitedProducts = [...products];

  if (!isNaN(limit) && limit > 0) {
    limitedProducts = limitedProducts.slice(0, limit);
  }

  res.json(limitedProducts);
});


router.post("/products", (req, res) => {
    console.log('POST /products request received');
  const data = req.body;
  const newProducts = Array.isArray(data) ? data : [data];
  let hasErrors = false;

  newProducts.forEach((item) => {
    const { user, product } = item;

        if (!user || !product) {
            hasErrors = true;
            console.log('Invalid data:', item);
            // Aquí debes devolver un error solo si no se ha enviado una respuesta
            if (!res.headersSent) {
              return res.status(400).json({ error: "All fields are required." });
            }
          }
    if (!user || !product) {
      return res
        .status(400)
        .json({ error: "All fields except thumbnails are required." });
    }

    const newProduct = {
      user: user,
      product: product,
    };

    products.push(newProduct);
    saveProducts(products);

    if (io) {
        io.emit('productAdded', newProduct);
      }
  });

  if (!hasErrors && !res.headersSent) {
    console.log('Sending success response');
    res.json({ message: "Registered products!" });
  }
});

router.delete("/products/:pid", (req, res) => {

  if (!product || product === -1)
    return res.send({ error: "the student was not found!" });

  products.splice(product, 1);
  saveProducts(products);

  res.json({ message: "Product deleted!" });
});

export default router;



// router.put("/products/:pid", (req, res) => {
//   const idProduct = parseInt(req.params.pid);
//   const data = req.body;

//   let product = products.find((a) => a.pid === idProduct);

//   if (!product) return res.send({ error: "the student was not found!" });

//   const { title, description, code, price, stock, category, thumbnails } = data;

//   product.title = title || product.title;
//   product.description = description || product.description;
//   product.code = code || product.code;
//   product.price = price || product.price;
//   product.stock = stock || product.stock;
//   product.category = category || product.category;
//   product.thumbnails = thumbnails || product.thumbnails;

//   saveProducts(products);
//   res.json({ product });
// });

// router.get("/products/:pid", (req, res) => {
    //   let idProduct = parseInt(req.params.pid);
    
    //   let product = products.find((a) => a.pid === idProduct);
    
    //   if (!product) return res.send({ error: "the student was not found!" });
    
    //   res.json(product);
    // });