import {
    createService,
    readService,
    readOneService,
    updateService,
    destroyService,
  } from "../services/users.service.js";
class UsersController{
  async read(req, res, next) {
    try {
      const { role } = req.query;
      const all = await readService(role);
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
  
  async  readOne(req, res, next) {
    try {
      const { nid } = req.params;
      const one = await readOneService(nid);
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
  
  async  create(req, res, next) {
    try {
      const data = req.body;
      const one = await createService(data);
      return res.json({
        statusCode: 201,
        message: "User created with id: " + one._id,
      });
    } catch (error) {
      return next(error);
    }
  }
  
  async  update(req, res, next) {
    try {
      const { nid } = req.params;
      const data = req.body;
      const one = await updateService(nid, data);
      return res.json({
        statusCode: 200,
        message: "User modified with id: " + one.id,
        response: one,
      });
    } catch (error) {
      return next(error);
    }
  }
  
  async  destroy(req, res, next) {
    try {
      const { nid } = req.params;
      const one = await destroyService(nid);
      return res.json({
        statusCode: 200,
        message: "User deleted with id: " + nid,
        response: one,
      });
    } catch (error) {
      return next(error);
    }
  }
}
const usersController = new UsersController();
const { create, read, readOne, update, destroy } = usersController;
export { create, read, readOne, update, destroy };