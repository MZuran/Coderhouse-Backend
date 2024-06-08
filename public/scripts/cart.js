async function addQuantity(cart_id, quantity) {
    if (!quantity || quantity == "") {return}
    try {
        const response = await fetch(`/api/carts/${cart_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                quantity: quantity
            })
        });
        const data = await response.json();
        console.log(data.message, data.product); // Log the message from the server
        return data.product; // Return the updated product
    } catch (error) {
        throw error;
    }
}

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

async function addToCart(product_id, user_id) {
    const sentData = {
        product_id: product_id,
        quantity: 1,
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
        console.log(data.message, data.product); // Log the message from the server
        return data.product; // Return the updated product
    } catch (error) {
        throw error;
    }
}