import __dirname from '../../utils.js';

const options = {
    definition: {
        openapi: "1.0.0",
        info: { 
            title: "Express API with Swagger",
            description: "Documentation of Green Groceries API" },
    },
    apis: [`${__dirname} + "/src/docs/*.yaml"`],
};

export default options;