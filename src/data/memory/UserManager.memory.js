const crypto = require("crypto");

class UserManager {
  static #users = [];
  async create(data) {
    try {
      const user = {
        id: crypto.randomBytes(12).toString("hex"),
        name: data.name,
        photo:
          data.photo ||
          "https://cdn-icons-png.flaticon.com/512/3607/3607444.png",
        email: data.email,
        password: data.password,
        role: data.role || 0,
      };
      if (!data.name || !data.email || !data.password) {
        console.log("usuario no creado. Ingrese todos los datos");
      } else {
        UserManager.#users.push(user);
        console.log("User created.");
      }
    } catch (error) {
      throw error;
    }
  }
  async read() {
    try {
      return UserManager.#users;
    } catch (error) {
      throw error;
    }
  }
  async readOne(id) {
    try {
      const userList = UserManager.#users;
      const filteredUserList = userList.filter((user) => user.id === id);
      if (filteredUserList.length === 0) {
        console.log("User not found");
        return;
      } else if (filteredUserList.length > 1) {
        console.log("User id is repeated");
        return;
      }
      return filteredUserList[0];
    } catch (error) {
      throw error;
    }
  }
  async destroy(id) {
    try {
      const userList = UserManager.#users;
      const filteredUserList = userList.filter((user) => user.id !== id);
      UserManager.#users = filteredUserList;
    } catch (error) {
      throw error;
    }
  }
}
const urls = {
  matilda: "https://www.shutterstock.com/shutterstock/photos/1552242206/display_1500/stock-photo-headshot-portrait-of-cute-teenage-girl-in-casual-clothes-wearing-glasses-posing-isolated-on-grey-1552242206.jpg",
  ciro: "https://www.shutterstock.com/shutterstock/photos/1548802709/display_1500/stock-photo-headshot-portrait-of-happy-millennial-man-in-casual-clothes-isolated-on-grey-studio-background-1548802709.jpg",
  ezequielito: "https://www.shutterstock.com/shutterstock/photos/1768126784/display_1500/stock-photo-young-handsome-man-with-beard-wearing-casual-sweater-and-glasses-over-blue-background-happy-face-1768126784.jpg",
  cubito: "https://www.shutterstock.com/shutterstock/photos/1552242206/display_1500/stock-photo-headshot-portrait-of-cute-teenage-girl-in-casual-clothes-wearing-glasses-posing-isolated-on-grey-1552242206.jpg",
}

const userManagerInstance = new UserManager();

userManagerInstance.create({
  name: "Matilda Ace",
  photo: urls.matilda,
  email: "matuacv@gmail.com",
  password: "132134",
  role: 0,
});

userManagerInstance.create({
  name: "Ciro lich",
  photo: urls.ciro,
  email: "cirito@gmail.com",
  password: "li8ch0",
  role: 0,
});

userManagerInstance.create({
  name: "Ezequielito More",
  photo: urls.ezequielito,
  email: "morerivas@gmail.com",
  password: "DiNo23",
  role: 0,
});
userManagerInstance.create({
  name: "Cubo Viña",
  photo: urls.cubito,
  email: "cubito@gmail.com",
  password: "Glayven",
  role: 0,
});

console.log(userManagerInstance.read());
