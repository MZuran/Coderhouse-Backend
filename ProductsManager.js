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
            console.log("Product successfully added to the list")
        } else {
            console.error("Wrong product format");
        }
    }

    read() {
      return ProductManager.#products;
    }
  }

  const urls = {
    banana: "https://acdn.mitiendanube.com/stores/001/219/229/products/banana1-39d62a544fc16a2b8016025979095295-640-0.jpg",
    apple: "https://static.libertyprim.com/files/varietes/pomme-dalinette-large.jpg?1589283082",
    carrot: "https://cdn11.bigcommerce.com/s-kc25pb94dz/images/stencil/1280x1280/products/271/762/Carrot__40927.1634584458.jpg?c=2",
    potato: "https://m.media-amazon.com/images/I/313dtY-LOEL._AC_UF1000,1000_QL80_.jpg",
    tomato: "https://i5.walmartimages.com/seo/Fresh-Slicing-Tomato-Each_a1e8e44a-2b82-48ab-9c09-b68420f6954c.04f6e0e87807fc5457f57e3ec0770061.jpeg"
  }

  const fruitManager = new ProductManager();

  const banana = new Product("banana", urls.banana, "fruit", 10, 200)
  const apple = new Product("apple", urls.apple, "fruit", 8, 47)
  const carrot = new Product("carrot", urls.carrot, "vegetable", 11, 20)
  const potato = new Product("potato", urls.potato, "vegetable", 9, 400)
  const tomato = new Product("tomato", urls.tomato, "fruit", 8, 50)

  fruitManager.create(banana)
  fruitManager.create(apple)
  console.log(fruitManager.read())