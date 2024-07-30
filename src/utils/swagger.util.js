import __dirname from '../../utils.js';

const options = {
    definition: {
        openapi: "3.1.0",
        info: { 
            title: "Green Groceries API",
            description: "Documentation of Green Groceries API" },
    },
    apis: [`${__dirname} + "/src/docs/*.yaml"`],
};

export default options;