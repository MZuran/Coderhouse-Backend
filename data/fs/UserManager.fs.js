import fs from "fs";
import crypto from "crypto";

class UserManager {
  static #users = [];
  constructor() {
    this.path = "./data/fs/files/users.json";
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

  async read(r) {
    try {
      r = parseInt(r);
      let all = await fs.promises.readFile(this.path, "utf-8");
      all = JSON.parse(all);
      console.log(all);
      r && (all = all.filter(user => user.role === r));
      console.log(all);
      return all;
    } catch (error) {
      console.log(error);
      return error;
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

const userManagerInstance = new UserManager();
export default userManagerInstance;
