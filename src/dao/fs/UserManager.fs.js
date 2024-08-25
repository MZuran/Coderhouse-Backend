import FileManager from "./Manager.fs";

class User {
  constructor(name, photo, email, password, role = 0) {
    this.name = name;
    this.photo = photo || "https://cdn-icons-png.flaticon.com/512/3607/3607444.png";
    this.email = email;
    this.password = password;
    this.role = role;
  }
}

class UserManager extends FileManager {
  constructor() {
    super("./src/dao/fs/files/users.json");
  }

  async create(data) {
    return super.create(data, User);
  }

  async readByEmail(email) {
    try {
      const allUsers = await this.read();
      const user = allUsers.find(user => user.email === email);
      
      if (!user) {
        console.error("User not found with email:", email);
        return null;
      }

      return user;
    } catch (error) {
      throw error;
    }
  }
}

const userManagerInstance = new UserManager();
export default userManagerInstance