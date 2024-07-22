import logger from "../utils/winston.util.js";

function winston(req, res, next) {
    req.logger = logger
    const message = `${req.method} ${req.url} ${new Date().toLocaleTimeString()}`
    req.logger.HTTP(message)
    return next()
}

export default winston