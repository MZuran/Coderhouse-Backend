class Product {
    constructor(title, photo, category, price, stock) {
        this.title = title,
        this.photo = photo,
        this.category = category,
        this.price = price,
        this.stock = stock
    }
}

class ProductManager {
    static #products = [];
    create(data) {
        const productsLength = ProductManager.#products.length

        const assignedId = productsLength === 0 ? 
            0 : 
            ProductManager.#products[productsLength - 1].id + 1

        if (data instanceof Product) {
            ProductManager.#products.push({...data, id: assignedId})
        }
    }

    read() {
      return ProductManager.#products;
    }
  }

  const urls = {
    banana: "https://acdn.mitiendanube.com/stores/001/219/229/products/banana1-39d62a544fc16a2b8016025979095295-640-0.jpg",
    apple: "https://static.libertyprim.com/files/varietes/pomme-dalinette-large.jpg?1589283082"
  }

  const fruitManager = new ProductManager();

  const banana = new Product("banana", urls.banana, "fruit", 10, 200)
  const apple = new Product("apple", urls.apple, "fruit", 8, 47)

  fruitManager.create(banana)
  fruitManager.create(apple)
  console.log(fruitManager.read())