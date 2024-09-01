import { expect } from 'chai';
import { afterEach, before } from 'mocha';

import dao from '../../src/dao/dao.factory.js';
import 'dotenv/config.js';

const { users } = dao;

let usersResourceTestPassed = true;
let id;

const data = {
    name: "User Mocha",
    email: "user@mocha.com",
    password: "MochaUserPassword123",
    role: 0,
};

describe("USERS resource testing", () => {
    afterEach(function () {
        if (this.currentTest.state === 'failed') {
            usersResourceTestPassed = false;
        }
    });

    it("Name property testing", () => {
        expect(data.name).to.be.a('string');
        expect(data.name).to.have.length.above(0); // Ensure name is not empty
    });

    it("Email property testing", () => {
        expect(data.email).to.be.a('string');
        expect(data.email).to.include('@'); // Basic check for email format
    });

    it("Password property testing", () => {
        expect(data.password).to.be.a('string');
        expect(data.password).to.have.length.above(8); // Ensure password is reasonably long
    });

    it("Role property testing", () => {
        expect(data.role).to.be.a('number');
        expect([0, 1, 2]).to.include(data.role); // Assuming valid roles are 0, 1, or 2
    });

});


describe("USER CRUD testing", () => {

    // Make sure the previous test was successful before attempting Database tinkering
    before(function () {
        if (!usersResourceTestPassed) {
            console.error("Skipping test because of USERS resource test failing");
            this.skip();
        }
    });

    it("Test for the correct creation of a USER", async () => {
        const response = await users.create(data);
        id = response._id;
        expect(response).to.have.property('_id');
        expect(response).to.have.property('name').that.equals(data.name);
        expect(response).to.have.property('email').that.equals(data.email);
        expect(response).to.have.property('role').that.equals(data.role);
        expect(response).to.have.property('verified').that.equals(false)
    });

    it("Test for the correct updating and verification of a USER", async () => {
        const one = await users.readOne(id);
        const response = await users.update(id, { verified: true });
        expect(response.verified).to.not.equal(one.verified);
    });

    it("Test for the correct deletion of a USER", async () => {
        await users.destroy(id);
        const one = await users.readOne(id);
        expect(one).to.be.null;
    });
});
