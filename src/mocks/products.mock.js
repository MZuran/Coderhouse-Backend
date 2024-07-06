import "../utils/env.util.js";
import { faker } from "@faker-js/faker";
import dbConnect from "../utils/dbConnection.util.js";
import productsRepository from "../repositories/products.rep.js";

// Lista de frutas y verduras
const products = [
    'Manzana', 'Plátano', 'Naranja', 'Pera', 'Fresa', 'Zanahoria', 'Tomate', 'Pepino', 'Lechuga', 'Espinaca'
  ];

const possibleCategories = ["fruit", "vegetable"];


async function createData() {
  try {
    dbConnect();
    for (let i = 1; i <= 1000; i++) {
      const title = products[Math.floor(Math.random() * products.length)]
      const photo = faker.image.urlLoremFlickr({ category: "food" })
      const category = possibleCategories[Math.floor(Math.random() * possibleCategories.length)]
      const price =  Math.floor(Math.random() * 2000)
      const stock = Math.floor(Math.random() * 100)
      const product = {title, photo, category, price,  stock}
      await productsRepository.createRepository(product);
    }
    console.log("products created");
  } catch (error) {
    console.log(error);
  }
}

createData();