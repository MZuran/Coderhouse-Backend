import express from "express";
import { createServer } from "http";
import __dirname from "./utils.js";

//Server Setup
const server = express();
const port = 8080;
const ready = () => console.log("server ready on port " + port);

//Middlewares
import morgan from "morgan";
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static(__dirname + "/public"));
server.use(morgan("dev"));

//Handlebars
import { engine } from "express-handlebars";
server.engine("handlebars", engine())
server.set("view engine", "handlebars")
server.set("views", __dirname + "/src/views");

//Sockets
import { Server } from "socket.io";
import { socketCallback } from "./src/socketCallback.js";
const nodeServer = createServer(server);
nodeServer.listen(port, ready);
export const socketServer = new Server(nodeServer)
socketServer.on("connection", socketCallback)

//Routes
import { apiRootRoute } from "./src/routers/index.router.js";
import indexRouter from "./src/routers/index.router.js";
server.get("/", async (req, res) => { apiRootRoute(req, res) });
server.use("/", indexRouter);

//Route Middlewares
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
server.use(errorHandler);
server.use(pathHandler);