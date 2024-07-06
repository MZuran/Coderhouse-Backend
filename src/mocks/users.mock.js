import "../utils/env.util.js";
import { faker } from "@faker-js/faker";
import dbConnect from "../utils/dbConnection.util.js";
import authRepository from "../repositories/auth.rep.js";

async function createData() {
  try {
    dbConnect();
    for (let i = 1; i <= 100; i++) {
      const first_name = faker.person.firstName()
      const last_name = faker.person.lastName()
      const name = first_name + " " + last_name
      const photo = faker.image.avatar()
      const email =  first_name+"."+last_name+"@greengroceries.com"
      const password = "contraseña"
      const role = Math.floor(Math.random() * 2)
      const user = { name, photo, email, password, role}
      await authRepository.create(user);
    };

    console.log("users created succesfully");
  } catch (error) {
    console.log(error);
  }
}

createData();