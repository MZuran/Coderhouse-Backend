import enviroment from "./env.util.js";

function getBaseUrl() {
    let baseUrl = enviroment.SERVER_URL

    if (baseUrl == "") { baseUrl = `http://localhost:${enviroment.PORT}` }

    return baseUrl
}

export default getBaseUrl