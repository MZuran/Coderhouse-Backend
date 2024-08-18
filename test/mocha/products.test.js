import assert from 'assert'
import 'dotenv/config.js'
import dao from '../../src/dao/dao.factory.js'
import { afterEach } from 'mocha';

const { products } = dao;
let productsTestPassed = true
let id

const data = { title: "ProductTitle", price: 1, stock: 2, category: "fruit" } //Photo is not required

describe("PRODUCTS resource testing", () => {
    //Set the passed flag as false if any fails
    afterEach(function () {
        if (this.currentTest.state === 'failed') {
            productsTestPassed = false;
        }
    });

    it("Title property testing", () => {
        assert.ok(data.title)
        assert.strictEqual(typeof data.title, "string")
    })

    it("Price property testing", () => {
        assert.strictEqual(typeof data.price, "number")
    })

    it("Stock property testing", () => {
        assert.strictEqual(typeof data.stock, "number")
    })

    it("Category property testing", () => {
        const validCategories = ["fruit", "vegetable"];
        assert.ok(validCategories.includes(data.category))
    })

    it("Test for a valid value for the price property", () => {
        assert.ok(data.price > 0, "Price is not greater than 0")
    })
})

describe("PRODUCT CRUD testing", () => {

    //Make sure the previous test was successful before attempting Database tinkering
    before(function () {
        if (!productsTestPassed) {
            console.error("Skipping test because of PRODUCTS resource test failing")
            this.skip()
        }
    });

    it("Test for the correct creation of a PRODUCT", async () => {
        const response = await products.create(data);
        id = response._id;
        assert.ok(response._id);
    })

    it("Test for the correct updating of a PRODUCT", async () => {
        const one = await products.readOne(id);
        const response = await products.update(id, { title: "ProductTitleChanged" });
        assert.notEqual(one.title, response.title);
    })

    it("Test for the correct deletion of a PRODUCT", async () => {
        await products.destroy(id);
        const one = await products.readOne(id);
        assert.strictEqual(one, null);
    })
})
