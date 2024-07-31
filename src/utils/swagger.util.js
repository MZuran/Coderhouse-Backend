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
    apis: [path.join(__dirname, "..\\docs\\users.doc.yaml")], // Ajusta la ruta según la ubicación real de tus archivos YAML
    debug: {
        dirName: __dirname
    }
};

export default options;