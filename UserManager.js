class UserManager {
    static #users = [];
    create(data) {
      const user = {
        id:
          UserManager.#users.length === 0
            ? 1
            : UserManager.#users[UserManager.#users.length - 1].id + 1,
        name: data.name,
        photo: data.photo,
        email: data.email,
        password: data.password,
        role: 0,
      };
      UserManager.#users.push(user);
      console.log("Usuario creado correctamente.");
    }
    read() {
      return UserManager.#users;
    }
  }
  const userManagerInstance = new UserManager();
  
  userManagerInstance.create({
    name: "Matilda Ace",
    photo: "Matu.jpg",
    email: "matuacv@gmail.com",
    password: "132134",
  });
  
  userManagerInstance.create({
    name: "Ciro lich",
    photo: "Ciro.jpg",
    email: "cirito@gmail.com",
    password: "li8ch0",
  });
  console.log(userManagerInstance.read());