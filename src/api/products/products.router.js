import express from "express"
const router = express.Router()


const products = []
let id = 0

router.get("/products", (req, res) => {
    let limit  = parseInt(req.query.limit)

    let limitedAlumnos = [...products]

    if(!isNaN(limit) && limit > 0) {
        limitedAlumnos = limitedAlumnos.slice(0, limit)
    }

    res.json(limitedAlumnos)
})

router.get("/products/:idProduct", (req, res) => {
    let idProduct = parseInt(req.params.idProduct)
    
    let product = products.find(a => a.id === idProduct)

    if(!product) return res.send({error: "the student was not found!"})
    
    console.log(product)
    res.json(product)
})


router.post("/products", (req, res) => {
    const data = req.body

    const newProducts = Array.isArray(data) ? data : [data]

    newProducts.forEach(item => {
        const { title, description, code, price, stock, category, thumbnails } = item;

        if (!title || !description || !code || !price || !category) {
            return res.status(400).json({ error: "All fields except thumbnails are required." });
        }

        const newProduct = {
            id: ++id,
            title: String(title),
            description: String(description),
            code: String(code),
            price: Number(price) || 0,
            status: true,
            stock: Number(stock) || 20,
            category: String(category),
            thumbnails: Array.isArray(thumbnails) ? thumbnails : [thumbnails] 
        };

        products.push(newProduct);
    });

    res.json({ message: "Registered products!"});
});

router.put("/products", (req, res) => {
    const data = req.body



})

export default router


// [
//     {
//         "title": "Procesador Intel Core i7-12700K",
//         "description": "Procesador de 12ª generación, 12 núcleos (8 de rendimiento y 4 de eficiencia), velocidad base de 3.6 GHz, compatible con la tecnología Intel Turbo Boost.",
//         "code": "INTEL12700K",
//         "price": "$429.99",
//         "status": "Disponible",
//         "stock": "True",
//         "category": "Procesadores",
//         "thumbnails": "https://example.com/imagen1.jpg"
//     },
//     {
//         "title": "Tarjeta Gráfica NVIDIA GeForce RTX 3080",
//         "description": "GPU con 10 GB GDDR6X, arquitectura Ampere, trazado de rayos en tiempo real, y DLSS para una mejor calidad visual en juegos.",
//         "code": "NVIDIA3080",
//         "price": "$799.99",
//         "status": "Disponible",
//         "stock": "True",
//         "category": "Tarjetas Gráficas",
//         "thumbnails": "https://example.com/imagen2.jpg"
//     },
//     {
//         "title": "Memoria RAM Corsair Vengeance LPX 16GB (2 x 8GB)",
//         "description": "Memoria DDR4 a 3200 MHz, compatible con perfiles XMP 2.0, disipador de calor de aluminio para una mayor eficiencia térmica.",
//         "code": "CORSAIR16GB3200",
//         "price": "$79.99",
//         "status": "Disponible",
//         "stock": "True",
//         "category": "Memorias RAM",
//         "thumbnails": "https://example.com/imagen3.jpg"
//     },
//     {
//         "title": "Unidad de Estado Sólido Samsung 970 EVO Plus 1TB",
//         "description": "SSD NVMe M.2 con velocidades de lectura/escritura de hasta 3500/3300 MB/s, tecnología V-NAND, y cifrado AES de 256 bits.",
//         "code": "SAMSUNG970EVO1TB",
//         "price": "$169.99",
//         "status": "Disponible",
//         "stock": "True",
//         "category": "Almacenamiento",
//         "thumbnails": "https://example.com/imagen4.jpg"
//     },
//     {
//         "title": "Placa Base ASUS ROG Strix B550-F Gaming",
//         "description": "Placa base ATX, compatible con procesadores AMD Ryzen, soporte para PCIe 4.0, 2.5Gb Ethernet, y Aura Sync RGB.",
//         "code": "ASUSROGB550F",
//         "price": "$179.99",
//         "status": "Disponible",
//         "stock": "True",
//         "category": "Placas Base",
//         "thumbnails": "https://example.com/imagen5.jpg"
//     }
// ]