import { expect } from 'chai';
import 'dotenv/config.js';
import dao from '../../src/dao/dao.factory.js';
import { afterEach, before } from 'mocha';

const { products } = dao;
let productsTestPassed = true;
let id;

const data = { title: "ProductTitle", price: 1, stock: 2, category: "fruit" }; // Photo is not required

describe("PRODUCTS resource testing", () => {
    // Set the passed flag as false if any fails
    afterEach(function () {
        if (this.currentTest.state === 'failed') {
            productsTestPassed = false;
        }
    });

    it("Title property testing", () => {
        expect(data.title).to.be.a('string');
    });

    it("Price property testing", () => {
        expect(data.price).to.be.a('number');
    });

    it("Stock property testing", () => {
        expect(data.stock).to.be.a('number');
    });

    it("Category property testing", () => {
        const validCategories = ["fruit", "vegetable"];
        expect(validCategories).to.include(data.category);
    });

    it("Test for a valid value for the price property", () => {
        expect(data.price).to.be.greaterThan(0);
    });
});

describe("PRODUCT CRUD testing", () => {

    // Make sure the previous test was successful before attempting Database tinkering
    before(function () {
        if (!productsTestPassed) {
            console.error("Skipping test because of PRODUCTS resource test failing");
            this.skip();
        }
    });

    it("Test for the correct creation of a PRODUCT", async () => {
        const response = await products.create(data);
        id = response._id;
        expect(response._id).to.exist;
    });

    it("Test for the correct updating of a PRODUCT", async () => {
        const one = await products.readOne(id);
        const response = await products.update(id, { title: "ProductTitleChanged" });
        expect(response.title).to.not.equal(one.title);
    });

    it("Test for the correct deletion of a PRODUCT", async () => {
        await products.destroy(id);
        const one = await products.readOne(id);
        expect(one).to.be.null;
    });
});
