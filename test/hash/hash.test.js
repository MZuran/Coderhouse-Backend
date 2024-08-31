import { hashTesting, verifyHash } from "../../src/utils/hash.util.js";
import { expect } from 'chai';

describe("Hashing and Verification Tests", () => {

    it("should hash and verify a password correctly", () => {
        const { original, hashed } = hashTesting("asdasdasdasd");

        console.log("Original String", original)
        console.log("Hashed String", hashed)

        const isMatch = verifyHash(original, hashed);

        expect(isMatch).to.be.true;
    });

});
