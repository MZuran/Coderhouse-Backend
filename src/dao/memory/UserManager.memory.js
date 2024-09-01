import ManagerMemory from "./manager.memory.js";
import fillUsers from "./fill/users.memory.fill.js";
class UserManager extends ManagerMemory {

  readByEmail(email) {
    try {
      const foundItem = this.items.find(item => item.email === email);
      return foundItem || null;
    } catch (error) {
      throw error;
    }
  }
}

const UserManagerInstance = new UserManager()
fillUsers(UserManagerInstance)
export default UserManagerInstance