import fs from "fs";
import crypto from "crypto";

class UserManager {
  static #users = [];
  constructor() {
    this.path = "./src/dao/fs/files/users.json";
    this.init();
  }

  init() {
    const exists = fs.existsSync(this.path);
    if (!exists) {
      const stringData = JSON.stringify([], null, 2);
      fs.writeFileSync(this.path, stringData);
    } else {
      //console.log("File already exists");
    }
  }

  async create(data) {
    try {
      const usersList = await this.read();
      const assignedId = crypto.randomBytes(12).toString("hex");
      if (data instanceof User) {
        usersList.push({ ...data, id: assignedId });
        this.writeToFile(usersList);
        console.log("user added to the list (class)");
      } else {
        const { name, photo, email, password, role } = data;
        const userInstance = new User(name, photo, email, password, role);
        const userToAdd = { ...userInstance, id: assignedId };
      usersList.push(userToAdd);
      this.writeToFile(usersList);
      console.log("user added to the list (object)");
      return userToAdd;
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
      //console.log(all);
      r && (all = all.filter(user => user.role === r));
      //console.log(all);
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

  async update(id, data) {
    try {
      let all = await this.read();
      let one = all.find((each) => each.id === id);
      if (one) {
        for (let prop in data) {
          one[prop] = data[prop];
        }
        all = JSON.stringify(all, null, 2);
        await fs.promises.writeFile(this.path, all);
        return one;
      } else {
        const error = new Error("Not found!");
        error.statusCode = 404;
        throw error;
      }
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

export const userManagerInstance = new UserManager();
