async function addProduct() {
  const title = document.querySelector("#title").value;
  const price = document.querySelector("#price").value;
  const stock = document.querySelector("#stock").value;
  const category = document.querySelector("#category").value;
  const photo = document.querySelector("#photo").value;

  const formData = {
    title,
    price,
    stock,
    category,
    photo
  };

  try {
    const response = await fetch('/api/products/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    const data = await response.json();

    if (data.status === 200) {
      // Show success notification
      await Swal.fire({
        title: 'Success!',
        text: 'Product added successfully.',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      window.location.replace("/");
    } else {
      // Handle non-200 status codes
      const errorMessage = Array.isArray(data.message) 
        ? data.message.join('<br>') 
        : 'An error occurred while adding the product.';

      await Swal.fire({
        title: 'Error!',
        html: errorMessage,
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  } catch (error) {
    // Handle network or unexpected errors
    await Swal.fire({
      title: 'Error!',
      text: 'An unexpected error occurred.',
      icon: 'error',
      confirmButtonText: 'OK'
    });
    console.error('Error:', error);
  }
}
