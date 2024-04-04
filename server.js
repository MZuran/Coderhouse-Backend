import express from "express";
import indexRouter from "./src/routers/index.router.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";

const server = express();
const port = 8080;
const ready = () => console.log("server ready on port " + port);
server.listen(port, ready);

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use("/", indexRouter);

server.get("/", async (req, res) => {
  try {
    return res.status(200).json({
      response: "Hello welcome to the API",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      response: "CATRASTROPHICAL ERROR",
      success: false,
    });
  }
});

server.use("/", indexRouter);
server.use(errorHandler);
server.use(pathHandler);
