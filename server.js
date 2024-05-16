import "dotenv/config.js";
import express from "express";
import __dirname from "./utils.js";

//Server Setup
import dbConnection from "./src/utils/dbConnection.util.js";
const server = express();
const port = 8080;
const ready = () => {console.log("Server ready on port " + port); dbConnection()};
server.listen(port, ready)

//Middlewares
import morgan from "morgan";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";

server.use(express.json());
server.use(express.static(__dirname + "/public"));
server.use(express.urlencoded({ extended: true }));
server.use(morgan("dev"));
server.use(cookieParser(process.env.SESSION_KEY));
server.use(
  session({
    store: new MongoStore({ mongoUrl: process.env.MONGO_URI, ttl: 60 * 60 }),
    secret: process.env.SESSION_KEY, 
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 * 2 }, //2 Hours
  })
);
server.use(function (req, res, next) {
  res.locals.session = req.session;
  next();
});

//Handlebars
import { engine } from "express-handlebars";
server.engine("handlebars", engine({
  partialsDir: __dirname + "/src/views/partials"
}))
server.set("view engine", "handlebars")
server.set("views", __dirname + "/src/views");

//Sockets
/* 
import { createServer } from "http";import { Server } from "socket.io";
import { socketCallback } from "./src/socketCallback.js";
const nodeServer = createServer(server);
nodeServer.listen(port, ready);
export const socketServer = new Server(nodeServer)
socketServer.on("connection", socketCallback) 
*/

//Routes
import indexRouter from "./src/routers/index.router.js";
server.use("/", indexRouter);

//Route Middlewares
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
server.use(errorHandler);
server.use(pathHandler);