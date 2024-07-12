import fs from "fs";
import path from "path";
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cartsFilePath = path.join(__dirname, "../../carts.json");

const payloadCarts = () => {
    if (!fs.existsSync(cartsFilePath)) {
        fs.writeFileSync(cartsFilePath, JSON.stringify([]));
    }
    const data = fs.readFileSync(cartsFilePath, "utf8");
    return JSON.parse(data);
};

const saveCarts = (carts) => {
    const data = JSON.stringify(carts, null, 2);
    fs.writeFileSync(cartsFilePath, data);
};

export { payloadCarts, saveCarts };