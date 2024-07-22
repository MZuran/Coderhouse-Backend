import winston from "./winston.util.js";

function winstonErrorMessage(req, res, {message, statusCode}) {
    const errorMessage = `${req.method} ${req.url} ${statusCode} - ${new Date().toLocaleTimeString()} - ${message}`;
    winston.ERROR(errorMessage);
    return res.json({ statusCode: 400, message: message });
};

export default winstonErrorMessage