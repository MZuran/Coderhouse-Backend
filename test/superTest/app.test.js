import enviroment from "../../src/utils/env.util.js";
import supertest from "supertest";
import { expect } from "chai";
import productsRepository from "../../src/repositories/products.rep.js";
import usersRepository from "../../src/repositories/users.rep.js";
import authRepository from "../../src/repositories/auth.rep.js";
import { format } from "morgan";

import getBaseUrl from "../../src/utils/baseUrl.util.js";

const requester = supertest(`${getBaseUrl()}/api`);

/*
Ya sé que esto es re inseguro pero nuestro register no deja que cualquiera
que se registre pueda marcarse como administrador. Tenemos que buscar una forma
más segura para testear esto
*/

const adminCredentials = {
    "email": "test@test.com",
    "password": "test@test.com"
}

const userCredentials = {
    "email": "user@user.com",
    "password": "user@user.com"
}

describe("Testeando API", function () {
    this.timeout(20000);

    let token = ""

    it("Inicio de sesión de un usuario", async () => {
        const response = await requester.post("/sessions/login").send(userCredentials);
        const { _body, headers } = response;
        //console.log(_body);
        //token = headers["set-cookie"][0].split(";")[0];
        token = headers["set-cookie"][0].split(";")[0];
        //console.log("The token is")
        //console.log(token)
        expect(_body.statusCode).to.be.equals(200);
    });

    it("Cerrar sesión de un usuario", async () => {
        const response = await requester.post("/sessions/signout").set("Cookie", token);
        const { _body } = response;
        //console.log(token)
        //console.log(_body)
        expect(_body.statusCode).to.be.equals(200);
    });
})