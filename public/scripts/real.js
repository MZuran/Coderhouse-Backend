console.log("I live")

async function addProduct() {
  const title = document.querySelector("#title").value
  const price = document.querySelector("#price").value
  const stock = document.querySelector("#stock").value
  const category = document.querySelector("#category").value
  const photo = document.querySelector("#photo").value

  const formData = {
    title,
    price,
    stock,
    category,
    photo
  }


  await fetch('/api/products/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
    .then(data => {
      window.location.replace("/")
    })
    .catch(error => {
      alert("error")
      console.error('Error:', error);
    });
}