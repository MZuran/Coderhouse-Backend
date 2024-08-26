import argsUtil from "./args.util.js";
const persistence = argsUtil.persistence;

function parseId(id) {
    switch (persistence) {
        case "memory":
        case "fs":
            return id
        break;

        default:
            return id.toString()
        break;
    }
}

export default parseId