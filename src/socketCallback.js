import { fruitManager } from "./data/fs/ProductsManager.fs";
import userManagerInstance from "./data/fs/UserManager.fs";

export async function socketCallback(socket) {
    console.log("A client has connected!");

    try {
        socket.emit("productManager_data", await fruitManager.read());
    } catch (error) {
        socket.emit("socketError", error)
    }

    try {
        socket.emit("userManager_data", await userManagerInstance.read());
    } catch (error) {
        socket.emit("socketError", error)
    }

    socket.on("productManager_create", async (data) => {
        try {
            await fruitManager.create(data);
        } catch (error) {
            socket.emit("socketError", error)
        }
    });

    socket.on("userManager_create", async (data) => {
        try {
            await userManagerInstance.create(data);
        } catch (error) {
            socket.emit("socketError", error)
        }
    });
}