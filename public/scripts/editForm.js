async function submitEdit() {
    // Gather form elements
    const title = document.getElementById('title').value;
    const photo = document.getElementById('photo').value;
    const price = document.getElementById('price').value;
    const stock = document.getElementById('stock').value;
    const category = document.getElementById('category').value;

    const productId = document.getElementById("productId").innerText;
    console.log(productId)

    // Create the payload
    const payload = {
        title: title,
        photo: photo,
        price: parseFloat(price),
        stock: parseInt(stock),
        category: category
    };

    try {
        // Send the POST request
        const response = await fetch(`/api/products/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });

        // Handle the response
        if (response.ok) {
            const data = await response.json();
            console.log('Product updated successfully:', data);
            // Optionally redirect or show a success message
        } else {
            console.error('Failed to update product:', response.statusText);
            // Optionally show an error message
        }
    } catch (error) {
        console.error('Error updating product:', error);
        // Optionally show an error message
    }
}


async function deleteProduct(pid) {
    //alert(pid)
    const productId = document.getElementById("productId").innerText;
    console.log(productId)
}