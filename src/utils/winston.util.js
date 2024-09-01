import { format, transports, addColors, createLogger } from "winston";
const {colorize, simple} = format
const {Console, File} = transports

const logPath = "./src/utils/errors/error.log"

const levels = {FATAL: 0, ERROR: 1, INFO: 2, HTTP: 3}
const colors = {FATAL: "red", ERROR: "yellow", INFO: "blue", HTTP: "white"}

addColors(colors)

const logger = createLogger({
    levels,
    format: colorize(),
    transports: [
        new Console({level: "HTTP", format: simple()}),
        new File({level: "ERROR", format: simple(), filename: logPath})
    ]
})

export default logger