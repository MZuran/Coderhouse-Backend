function fillUsers(manager) {
  const urls = {
    matilda: "https://www.shutterstock.com/shutterstock/photos/1552242206/display_1500/stock-photo-headshot-portrait-of-cute-teenage-girl-in-casual-clothes-wearing-glasses-posing-isolated-on-grey-1552242206.jpg",
    ciro: "https://www.shutterstock.com/shutterstock/photos/1548802709/display_1500/stock-photo-headshot-portrait-of-happy-millennial-man-in-casual-clothes-isolated-on-grey-studio-background-1548802709.jpg",
    ezequielito: "https://www.shutterstock.com/shutterstock/photos/1768126784/display_1500/stock-photo-young-handsome-man-with-beard-wearing-casual-sweater-and-glasses-over-blue-background-happy-face-1768126784.jpg",
    cubito: "https://www.shutterstock.com/shutterstock/photos/1552242206/display_1500/stock-photo-headshot-portrait-of-cute-teenage-girl-in-casual-clothes-wearing-glasses-posing-isolated-on-grey-1552242206.jpg",
  }

  manager.create({
    name: "Matilda Ace",
    photo: urls.matilda,
    email: "matuacv@gmail.com",
    password: "132134",
    role: 0,
  });

  manager.create({
    email: 'IamAnAdmin1@gmail.com',
    password: '$2b$10$i2wmwt8FGJEvjXxFwA/R4e6jUpzGAPMeES4r1DGa/1S8Z8bG69gbe',
    role: 1,
    photo: 'https://media.istockphoto.com/id/1472933890/vector/no-image-vector-symbol-missing-available-icon-no-gallery-for-this-moment-placeholder.jpg?s=612x612&w=0&k=20&c=Rdn-lecwAj8ciQEccm0Ep2RX50FCuUJOaEM8qQjiLL0=',
    name: 'Administrator'
  })

  manager.create({
    name: "Ciro lich",
    photo: urls.ciro,
    email: "cirito@gmail.com",
    password: "li8ch0",
    role: 1,
  });

  manager.create({
    name: "Test Admin User",
    photo: urls.ciro,
    email: "test@test.com",
    password: "$2a$10$Tzf7dRAJWubs8UJDGjn5aOC247tAEr1gITCjk0t/N9xKq/SHyZ0sW",
    role: 1,
  });

  manager.create({
    name: "Ezequielito More",
    photo: urls.ezequielito,
    email: "morerivas@gmail.com",
    password: "DiNo23",
    role: 0,
  });
  manager.create({
    name: "Cubo Viña",
    photo: urls.cubito,
    email: "cubito@gmail.com",
    password: "Glayven",
    role: 0,
  });

}

export default fillUsers