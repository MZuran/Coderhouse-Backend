import assert from 'assert'
import 'dotenv/config.js'
import dao from '../../src/dao/dao.factory.js'
import supertest from 'supertest';
import enviroment from '../../src/utils/env.util.js';
import { expect } from 'chai';
import { verifyToken } from '../../src/utils/token.util.js';
import mongoose from 'mongoose';

import getBaseUrl from '../../src/utils/baseUrl.util.js';

const requester = supertest(`${getBaseUrl()}/api`);

const adminCredentials = {
    "email": "test@test.com",
    "password": "test@test.com"
}

const premiumUserData = {
    "email": "superUser@superUser.com"
}

describe("Testeando API", function () {
    this.timeout(20000);

    let token = ""
    let idArray = []

    it("Inicio de sesión de un usuario administrador", async () => {
        const response = await requester.post("/sessions/login").send(adminCredentials);
        const { _body, headers } = response;
        //console.log(_body);
        //token = headers["set-cookie"][0].split(";")[0];
        token = headers["set-cookie"][0].split(";")[0];
        //console.log("The token is")
        //console.log(token)
        expect(_body.statusCode).to.be.equals(200);
    });

    it("Hacer un GET", async () => {
        const request = await requester.get("/products")
        const { _body } = request
        const { response, statusCode } = _body
        response.forEach((element, index) => {
            idArray[index] = element._id
        });
        expect(statusCode).to.be.equals(200);
    })

    it("Actualizar todos los productos con un proveedor premium", async () => {

        let providerResponse = await requester.get('/users').set("Cookie", token).send(premiumUserData)
        expect(providerResponse.status).to.be.equals(200)

        const providerBody = providerResponse._body

        const providerId = mongoose.Types.ObjectId.createFromHexString(providerBody.response[0]._id);
    
        // Array to hold all the responses
        const responses = [];
    
        // Execute all the PUT requests
        for (const id of idArray) {
            const data = { supplier_id: providerId };
            const response = await requester.put(`/products/${id}`).set("Cookie", token).send(data);
            responses.push(response);
        }
    
        // Check that all the responses are correct
        responses.forEach(response => {
            expect(response.status).to.be.oneOf([200, 201]);
        });
    });

    it("Actualizar los primeros 5 productos con un proveedor administrador", async () => {
        let providerId = verifyToken(token.replace(/^token=/, ''))._id;
        providerId = mongoose.Types.ObjectId.createFromHexString(providerId);
    
        // Array to hold all the responses
        const responses = [];
    
        // Execute all the PUT requests
        for (let i = 0; i < 5; i++) {
            const data = { supplier_id: providerId };
            const response = await requester.put(`/products/${idArray[i]}`).set("Cookie", token).send(data);
            responses.push(response);
        }
    
        // Check that all the responses are correct
        responses.forEach(response => {
            expect(response.status).to.be.oneOf([200, 201]);
        });
    });
    

    it("Cerrar sesión de un usuario", async () => {
        const response = await requester.post("/sessions/signout").set("Cookie", token);
        const { _body } = response;
        //console.log(token)
        //console.log(_body)
        expect(_body.statusCode).to.be.equals(200);
    });
})