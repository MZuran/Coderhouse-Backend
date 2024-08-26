async function deleteCart(cart_id) {
    try {
        const response = await fetch(`/api/carts/${cart_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        console.log(data.message, data.product); // Log the message from the server
        return data.product; // Return the updated product
    } catch (error) {
        throw error;
    }
}

async function addToCart(product_id, product_name) {

    const { value: quantity } = await Swal.fire({
        title: `Enter quantity for ${product_name}`,
        input: 'number',
        inputLabel: 'Quantity',
        inputValue: 1,
        showCancelButton: true,
        inputValidator: (value) => {
            if (!value || value <= 0) {
                return 'Please enter a valid quantity!';
            }
        }
    });

    const sentData = {
        product_id: product_id,
        quantity: quantity,
        state: "reserved",
    }

    try {
        const response = await fetch(`/api/carts/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sentData)
        });
        const data = await response.json();
        console.log(data); // Log the message from the server
        return data.product; // Return the updated product
    } catch (error) {
        throw error;
    }

}