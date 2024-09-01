import enviroment from "./env.util.js";

function getBaseUrl() {
    let baseUrl = enviroment.SERVER_URL
    if (baseUrl == "" || !baseUrl) { baseUrl = `http://localhost:${enviroment.PORT}` }

    console.log("Running on base url =", baseUrl)
    return baseUrl
}

export default getBaseUrl