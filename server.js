import enviroment from "./src/utils/env.util.js";
import express from "express";
import __dirname from "./dirname.js";
import cors from 'cors'
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { engine } from "express-handlebars";
import dbConnection from "./src/utils/dbConnection.util.js";
import indexRouter from "./src/routers/index.router.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import setLocals from "./src/middlewares/locals.mid.js";
import compression from "express-compression";
import swaggerOptions from "./src/utils/swagger.util.js";
import swaggerJSDoc from "swagger-jsdoc";
import { serve, setup } from "swagger-ui-express";
import winston from "./src/middlewares/winston.mid.js";

import dotenv from "dotenv";
dotenv.config();


const specs = swaggerJSDoc(swaggerOptions);
const server = express();
const port = enviroment.PORT;
const ready = () => { console.log("Server ready on port " + port); dbConnection() };
server.listen(port, ready)

server.use(express.json());
server.use(express.static(__dirname + "/public"));
server.use(express.urlencoded({ extended: true }));
server.use(morgan("dev"));
server.use(cookieParser(enviroment.SESSION_KEY));
server.use(cors({ origin: true, credentials: true }));

//Swagger
server.use("/api/docs", serve, setup(specs));

server.use(
  compression({
    brotli: { enabled: true, zlib: {} },
  })
);
server.use(winston)

//Middleware to make online status, name and photo available to all reqs via storing it in res.locals
//Used for handlebars, so that there is no need to explicitly pass these parameters to res.render every time
//More data can be added in res.locals if needed
server.use(setLocals);

//Handlebars
import Handlebars from "handlebars";

Handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
  return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});

Handlebars.registerHelper('ifIn', function(value, options) {
  // The options.hash.values should be an array of values to check against
  const values = options.hash.values || [];
  return values.includes(value) ? options.fn(this) : options.inverse(this);
});

Handlebars.registerHelper('ifUrl', function(expectedUrl, options) {
  return (this.currentUrl === expectedUrl) ? options.fn(this) : options.inverse(this);
});


server.engine("handlebars", engine({
  partialsDir: __dirname + "/src/views/partials"
}))

server.set("view engine", "handlebars")

server.set("views", __dirname + "/src/views");



//Routes;
server.use("/", indexRouter);

//Route Middlewares
server.use(errorHandler);
server.use(pathHandler);