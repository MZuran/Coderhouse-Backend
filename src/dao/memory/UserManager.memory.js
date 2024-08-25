import ManagerMemory from "./manager.memory.js";
import fillUsers from "./fill/users.memory.fill";
class UserManager extends ManagerMemory {
  validateData(data) {
    return data.name && data.email && data.password;
  }
}

const UserManagerInstance = new UserManager()
fillUsers(UserManagerInstance)
export default UserManagerInstance