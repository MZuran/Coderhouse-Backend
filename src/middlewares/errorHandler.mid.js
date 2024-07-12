import winston from "./winston.mid.js";

function errorHandler(error, req, res, next) {
  //console.log(error);
  const message = `${req.method} ${req.url } ${error.statusCode} - ${new Date().toLocaleTimeString()} - ${error.message}`;
  winston.ERROR(message);
  return res.json({
    statusCode: error.statusCode || 500,
    message: error.message || "CATASTROPHICAL ERROR",
  });
}

export default errorHandler;