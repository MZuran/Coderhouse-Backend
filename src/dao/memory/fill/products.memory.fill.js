function fillProducts(manager) {
    const urls = {
        banana: "https://acdn.mitiendanube.com/stores/001/219/229/products/banana1-39d62a544fc16a2b8016025979095295-640-0.jpg",
        apple: "https://static.libertyprim.com/files/varietes/pomme-dalinette-large.jpg?1589283082",
        carrot: "https://cdn11.bigcommerce.com/s-kc25pb94dz/images/stencil/1280x1280/products/271/762/Carrot__40927.1634584458.jpg?c=2",
        potato: "https://m.media-amazon.com/images/I/313dtY-LOEL._AC_UF1000,1000_QL80_.jpg",
        tomato: "https://i5.walmartimages.com/seo/Fresh-Slicing-Tomato-Each_a1e8e44a-2b82-48ab-9c09-b68420f6954c.04f6e0e87807fc5457f57e3ec0770061.jpeg",
        grapes: "https://reimagineco.ca/cdn/shop/products/Untitleddesign-100_750x810.png?v=1667752249",
        orange: "https://www.heddensofwoodtown.co.uk/wp-content/uploads/2020/05/oranges_opt.jpg",
        broccoli: "https://cdn.britannica.com/25/78225-050-1781F6B7/broccoli-florets.jpg",
        corn: "https://static.vecteezy.com/system/resources/previews/009/887/201/non_2x/sweet-corn-free-png.png",
        watermelon: "https://i5.walmartimages.com/asr/a83e3e11-9128-4d98-8f6f-8c144e0d8e5e.a5fafdef89b7430bd13cae9037294d87.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF",
    
        pear: "https://cdn.mos.cms.futurecdn.net/jpbi7xXH22fAxKvrF4bzzd-415-80.jpg",
        cauliflower: "https://domf5oio6qrcr.cloudfront.net/medialibrary/5299/h1018g16207257715328.jpg",
        spinach: "https://freshji.in/wp-content/uploads/2020/09/Spinach-1.jpg",
        dragonfruit: "https://www.shutterstock.com/image-photo/dragon-fruit-isolated-on-white-600nw-422354869.jpg",
        coconut: "https://www.shutterstock.com/image-photo/coconut-half-leaves-on-white-600nw-393850891.jpg",
        cabbage: "https://4.imimg.com/data4/EV/MV/MY-2/green-cabbage-500x500.jpg",
        tangerine: "https://www.shutterstock.com/image-photo/tangerine-on-white-ground-600nw-92668441.jpg",
        strawberry: "https://www.collinsdictionary.com/images/full/strawberry_227472010.jpg",
        pomergranate: "https://5.imimg.com/data5/KC/BK/MY-41645336/fresh-pomegranate-fruit.jpg",
        potato: "https://m.media-amazon.com/images/I/313dtY-LOEL.jpg"
    }
    
    const banana = new Product("banana", urls.banana, "fruit", 10, 200)
    const apple = new Product("apple", urls.apple, "fruit", 8, 47)
    const carrot = new Product("carrot", urls.carrot, "vegetable", 11, 20)
    const potato = new Product("potato", urls.potato, "vegetable", 9, 400)
    const tomato = new Product("tomato", urls.tomato, "fruit", 8, 50)
    const grapes = new Product("grapes", urls.grapes, "fruit", 12.5, 32)
    const orange = new Product("orange", urls.orange, "fruit", 14, 70)
    const broccoli = new Product("broccoli", urls.broccoli, "vegetable", 9, 130)
    const corn = new Product("corn", urls.corn, "vegetable", 17, 221)
    const watermelon = new Product("watermelon", urls.watermelon, "fruit", 20, 54)
    const pear = new Product("pear", urls.pear, "fruit", 9, 60);
    const cauliflower = new Product("cauliflower", urls.cauliflower, "vegetable", 10, 80);
    const spinach = new Product("spinach", urls.spinach, "vegetable", 6, 90);
    const dragonfruit = new Product("dragonfruit", urls.dragonfruit, "fruit", 25, 15);
    const coconut = new Product("coconut", urls.coconut, "fruit", 18, 25);
    const cabbage = new Product("cabbage", urls.cabbage, "vegetable", 7, 70);
    const tangerine = new Product("tangerine", urls.tangerine, "fruit", 13, 40);
    const strawberry = new Product("strawberry", urls.strawberry, "fruit", 11, 100);
    const pomegranate = new Product("pomegranate", urls.pomergranate, "fruit", 16, 35);
    
    manager.create(banana);
    manager.create(apple);
    manager.create(carrot);
    manager.create(potato);
    manager.create(tomato);
    manager.create(grapes);
    manager.create(orange);
    manager.create(broccoli);
    manager.create(corn);
    manager.create(watermelon);
}

export default fillProducts