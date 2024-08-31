import path from 'path';
import { fileURLToPath } from 'url';

// Si estás usando ES Modules (import/export), necesitas obtener __dirname de esta manera
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const options = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "Green Groceries API",
            description: "Documentation of Green Groceries API"
        },
    },
    apis: [path.join(__dirname, "..\\docs\\users.doc.yaml"), path.join(__dirname, "..\\docs\\product.doc.yaml"), path.join(__dirname, "..\\docs\\sessions.doc.yaml"), path.join(__dirname, "..\\docs\\carts.doc.yaml"), path.join(__dirname, "..\\docs\\tickets.doc.yaml"), path.join(__dirname, "..\\docs\\cookies.doc.yaml"), path.join(__dirname, "..\\docs\\payment.doc.yaml")],
    debug: {
        dirName: __dirname
    }
};

export default options;