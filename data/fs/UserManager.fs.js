const fs = require("fs");
const crypto = require("crypto");

class UserManager {
  static #users = [];
  constructor() {
    this.path = "files/users.json";
    this.init();
  }

  init() {
    const exists = fs.existsSync(this.path);
    if (!exists) {
      const stringData = JSON.stringify([], null, 2);
      fs.writeFileSync(this.path, stringData);
    } else {
      console.log("File already exists");
    }
  }

  async create(data) {
    try {
      const usersList = await this.read();
      const assignedId = crypto.randomBytes(12).toString("hex");
      if (data instanceof User) {
        usersList.push({ ...data, id: assignedId });
        this.writeToFile(usersList);
        console.log("user added to the list");
      } else {
        console.error("wrong user format");
      }
    } catch (error) {
      throw error;
    }
  }
  async read() {
    try {
      const usersFileData = await fs.promises.readFile(this.path, "utf-8");
      return JSON.parse(usersFileData);
    } catch (error) {
      throw error;
    }
  }
  async readOne(id) {
    try {
      const userList = await this.read();
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
      const userList = await this.read();
      const filteredUserList = userList.filter((user) => user.id !== id);
      this.writeToFile(filteredUserList);
    } catch (error) {
      throw error;
    }
  }
  //Auxiliary Methods
  writeToFile(data) {
    const parsedData = JSON.stringify(data, null, 2);
    fs.writeFileSync(this.path, parsedData);
  }
}
class User {
  constructor(name, photo, email, password, role) {
    this.name = name;
    this.photo = photo;
    this.email = email;
    this.password = password;
    this.role = role;
  }
}

const urls = {
  matilda:
    "https://www.shutterstock.com/shutterstock/photos/1552242206/display_1500/stock-photo-headshot-portrait-of-cute-teenage-girl-in-casual-clothes-wearing-glasses-posing-isolated-on-grey-1552242206.jpg",
  ciro: "https://www.shutterstock.com/shutterstock/photos/1548802709/display_1500/stock-photo-headshot-portrait-of-happy-millennial-man-in-casual-clothes-isolated-on-grey-studio-background-1548802709.jpg",
  ezequielito:
    "https://www.shutterstock.com/shutterstock/photos/1768126784/display_1500/stock-photo-young-handsome-man-with-beard-wearing-casual-sweater-and-glasses-over-blue-background-happy-face-1768126784.jpg",
  cubito:
    "https://www.shutterstock.com/shutterstock/photos/1552242206/display_1500/stock-photo-headshot-portrait-of-cute-teenage-girl-in-casual-clothes-wearing-glasses-posing-isolated-on-grey-1552242206.jpg",
};
const userManagerInstance = new UserManager();

const matilda = new User(
  "Matilda Acevedo",
  urls.matilda,
  "matuacv@gmail.com",
  "132134",
  0
);
const ciro = new User("Ciro lich", urls.ciro, "cirito@gmail.com", "li8ch0", 0);
const ezequielito = new User(
  "Ezequielito More",
  urls.ezequielito,
  "morerivas@gmail.com",
  "DiNo23",
  0
);
const cubito = new User(
  "Cubo Viña",
  urls.cubito,
  "cubito@gmail.com",
  "Glayven",
  0
);

async function test() {
  await userManagerInstance.create(matilda);
  await userManagerInstance.create(ciro);
  await userManagerInstance.create(ezequielito);
  await userManagerInstance.create(cubito);
}
test();
