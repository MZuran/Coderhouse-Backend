import express from "express";
import indexRouter from "./src/routers/index.router.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";

//import { fruitManager } from "./data/fs/ProductsManager.fs.js";

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

/*server.get("/api/products", async (req, res) => {
  try {
    const { category } = req.query;
    const productList = await fruitManager.read(category);
    if (productList.length !== 0) {
      return res.status(200).json({
        response: productList,
        statusCode: res.statusCode,
      });
    } else {
      const error = new Error("No matching Products");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode).json({
      response: error.message,
      statusCode: error.statusCode,
    });
  }
});

server.get("/api/products/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const productList = await fruitManager.readOne(pid);
    if (productList.length !== 0) {
      return res.status(200).json({
        response: productList,
        statusCode: res.statusCode,
      });
    } else {
      const error = new Error("No matching Products");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode).json({
      response: error.message,
      statusCode: error.statusCode,
    });
  }
});
*/

server.use("/", indexRouter);
server.use(errorHandler);
server.use(pathHandler);
