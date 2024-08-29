async function deleteCart(cart_id) {

    try {
        const response = await fetch(`/api/carts/one/${cart_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        if (response.status == 200) {
            // Notify the user of success and reload the page
            Swal.fire({
                icon: 'success',
                title: 'Product Deleted',
                text: data.message,
            }).then(() => {
                window.location.reload(); // Reload the page after the user clicks 'OK'
            });
        } else {
            // Notify the user of the error
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: data.message || 'Something went wrong!',
            });
        }

    } catch (error) {
        // Notify the user of a network or unexpected error
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'An unexpected error occurred. Please try again later.',
        });
    }
}

async function deleteAllCarts() {

    try {
        const response = await fetch(`/api/carts/all`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        if (response.ok) {
            // Notify the user of success and reload the page
            Swal.fire({
                icon: 'success',
                title: 'All Products Deleted',
                text: data.message,
            }).then(() => {
                window.location.reload(); // Reload the page after the user clicks 'OK'
            });
        } else {
            // Notify the user of the error
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: data.message || 'Something went wrong!',
            });
        }

    } catch (error) {
        // Notify the user of a network or unexpected error
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'An unexpected error occurred. Please try again later.',
        });
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
        return data.product; // Return the updated product
    } catch (error) {
        throw error;
    }

}