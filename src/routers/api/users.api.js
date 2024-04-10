import { Router } from "express";
import { userManagerInstance } from "../../data/fs/UserManager.fs.js";

const usersRouter = Router();

usersRouter.get("/", read);
usersRouter.get("/:nid", readOne);
usersRouter.post("/", create);
usersRouter.put("/:nid", update);
usersRouter.delete("/:nid", destroy);

async function read(req, res, next) {
  try {
    const { role } = req.query;
    const all = await userManagerInstance.read(role);
    if (all.length !== 0) {
      return res.status(200).json({
        response: all,
        role,
        success: true,
      });
    } else {
      const error = new Error("ERROR 404 NOT FOUND");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
}

async function readOne(req, res, next) {
  try {
    const { nid } = req.params;
    const one = await userManagerInstance.readOne(nid);
    if (one) {
      return res.status(200).json({
        response: one,
        success: true,
      });
    } else {
      const error = new Error("ERROR 404 NOT FOUND");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
}

async function create(req, res, next) {
  try {
    const data = req.body;
    const one = await userManagerInstance.create(data);
    return res.json({
      statusCode: 201,
      message: "User created with id: " + one.id,
    });
  } catch (error) {
    return next(error);
  }
}

async function update(req, res, next) {
  try {
    const { nid } = req.params;
    const data = req.body;
    const one = await userManagerInstance.update(nid, data);
    return res.json({
      statusCode: 200,
      message: "User modified with id: " + one.id,
      response: one,
    });
  } catch (error) {
    return next(error);
  }
}

async function destroy(req, res, next) {
  try {
    const { nid } = req.params;
    const one = await userManagerInstance.destroy(nid);
    return res.json({
      statusCode: 200,
      message: "User deleted with id: " + nid,
      response: one,
    });
  } catch (error) {
    return next(error);
  }
}

export default usersRouter;
