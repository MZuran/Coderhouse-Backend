import "../utils/env.util.js";
import { faker } from "@faker-js/faker";
import dbConnect from "../utils/dbConnect.util.js";
import authRepository from "../repositories/auth.rep.js";

async function createData() {
  try {
    dbConnect();
    for (let i = 1; i <= 100; i++) {
      const name = faker.person.fullName()
      const photo = faker.image.avatar()
      const email =  first_name+"."+last_name+"@greengroceries.com"
      const password = "contraseña"
      const role = Math.floor(Math.random() * 2)
      await authRepository.create(user);
    };

    console.log("users created succesfully");
  } catch (error) {
    console.log(error);
  }
}

createData();