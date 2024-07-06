import "../utils/env.util.js";
import { faker } from "@faker-js/faker";
import dbConnect from "../utils/dbConnect.util.js";
import productsRepository from "../repositories/products.rep.js";

// Lista de frutas y verduras
const products = [
    'Manzana', 'Plátano', 'Naranja', 'Pera', 'Fresa', 'Zanahoria', 'Tomate', 'Pepino', 'Lechuga', 'Espinaca'
  ];

const possibleCategories = ["fruit", "vegetable"]


async function createData() {
  try {
    dbConnect();
    for (let i = 1; i <= 1000; i++) {
      const product = {
        title: products[Math.floor(Math.random() * products.length)],
        photo: faker.image.urlLoremFlickr({ category: "food" }),
        category: Math.floor(Math.random() * possibleCategories.length),
        price: Math.floor(Math.random() * 2000),
        stock: Math.floor(Math.random() * 100)
      };
      await productsRepository.createRepository(product);
    }
    console.log("products created");
  } catch (error) {
    console.log(error);
  }
}

createData();