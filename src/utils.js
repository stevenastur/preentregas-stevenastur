import fs from "fs"
import path from "path"


import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;

const productsFilePath = path.join(__dirname, './products.json');

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
export { payloadProducts, saveProducts }
