const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../../products.json');

// Inicializar el archivo de carritos
const payloadProducts = () => {
    if (!fs.existsSync(productsFilePath)) {
        fs.writeFileSync(productsFilePath, JSON.stringify([]));
    }
    const data = fs.readFileSync(productsFilePath, 'utf8');
    return JSON.parse(data);
};

const saveProducts = (products) => {
    const data = JSON.stringify(products, null, 2);
    fs.writeFileSync(productsFilePath, data);
};

module.exports = {
    payloadProducts,
    saveProducts
};