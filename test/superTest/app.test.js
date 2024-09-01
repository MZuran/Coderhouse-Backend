describe("Testing API", function () {
    this.timeout(20000);

    let token = "";
    let verifyCode, userId;

    it("User Login", async () => {
        const response = await requester.post("/sessions/login").send(userCredentials);
        const { _body, headers } = response;
        token = headers["set-cookie"][0].split(";")[0];
        expect(_body.statusCode).to.be.equals(200);
    });

    it("User Logout", async () => {
        const response = await requester.post("/sessions/signout").set("Cookie", token);
        const { _body } = response;
        expect(_body.statusCode).to.be.equals(200);
    });

    it("Register an Admin User", async () => {
        const response = await requester.post("/sessions/register").send(newUserCredentials);
        const { _body, headers } = response;

        expect(_body.statusCode).to.be.equals(201);
    });

    it("Login Newly Registered Admin User", async () => {
        const response = await requester.post("/sessions/login").send(newUserCredentials);
        const { _body, headers } = response;
        token = headers["set-cookie"][0].split(";")[0];
        expect(_body.statusCode).to.be.equals(200);
    });

    it("Check Online Status of New User", async () => {
        const response = await requester.get("/sessions/online").set("Cookie", token);
        const { _body, headers } = response;
        verifyCode = _body.token.verifyCode;
        userId = _body.token._id;
        expect(_body.token.name).to.be.equals(newUserCredentials.name);
    });

    it("Verify Newly Registered User", async () => {
        const response = await requester.post("/sessions/verify").send({ uid: verifyCode });
        const { _body, headers } = response;
        expect(_body.statusCode).to.be.equals(200);
    });
    
    it("Delete Newly Registered User", async () => {
        const response = await requester.delete(`/users/${userId}`).set("Cookie", token);
        const { _body, headers } = response;
        expect(_body.statusCode).to.be.equals(200);
    });
});
