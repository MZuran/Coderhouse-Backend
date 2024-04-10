const socket = io();

console.log("Script running")

socket.on("productManager_data", data => {
  const template = data
      .map(each => ` <img style="width: 50%; height: 50%" src="${each.photo}" class="object-fit-cover" alt="${each.id}"> `)
      .reverse()
      .join("")
  document.querySelector("#products").innerHTML = template
})

document.querySelector("#submit").addEventListener("click", (event) => {
  const title = document.querySelector("#title").value
  const price = document.querySelector("#price").value
  const stock = document.querySelector("#stock").value
  const category = document.querySelector("#category").value
  const photo = document.querySelector("#photo").value
  socket.emit("productManager_create", { title, price, category, stock, photo })
})

socket.on("socketError", async (data) => console.log("Error received!:", data))