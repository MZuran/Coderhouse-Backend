async function submitEdit() {
    // Gather form elements
    const title = document.getElementById('title').value;
    const photo = document.getElementById('photo').value;
    const price = document.getElementById('price').value;
    const stock = document.getElementById('stock').value;
    const category = document.getElementById('category').value;

    const productId = document.getElementById("productId").innerText;

    // Create the payload
    const payload = {
        title: title,
        photo: photo,
        price: parseFloat(price),
        stock: parseInt(stock),
        category: category
    };

    try {
        // Send the PUT request
        const response = await fetch(`/api/products/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });

        // Handle the response
        if (response.status == 200) {
            const data = await response.json();
            console.log('Product updated successfully:', data);

            // Show success message using SweetAlert and redirect after the user clicks OK
            await Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Product updated successfully.'
            });

            // Redirect to the product detail page
            window.location.href = `/products/${productId}`;
        } else {
            console.error('Failed to update product:', response.statusText);

            // Show error message using SweetAlert
            await Swal.fire({
                icon: 'error',
                title: 'Update Failed',
                text: `Failed to update product. Status: ${response.statusText}`
            });

            // Optionally, you can handle any actions here
        }
    } catch (error) {
        console.error('Error updating product:', error);

        // Show error message using SweetAlert
        await Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'An error occurred while updating the product.'
        });

        // Optionally, you can handle any actions here
    }
}

async function deleteProduct(pid) {
    // First SweetAlert to confirm deletion
    const confirmResult = await Swal.fire({
        icon: 'warning',
        title: 'Are you sure?',
        text: 'This action cannot be undone.',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel'
    });

    if (confirmResult.isConfirmed) {
        // Get the title from the form
        const title = document.getElementById('title').value;

        // Second SweetAlert to verify the title
        const { value: enteredTitle } = await Swal.fire({
            icon: 'info',
            title: 'Confirm Deletion',
            text: `Please enter the product's title (${title}) to confirm deletion`,
            input: 'text',
            inputPlaceholder: 'Product title',
            showCancelButton: true,
            confirmButtonText: 'Delete',
            cancelButtonText: 'Cancel'
        });

        if (enteredTitle === title) {
            try {
                // Send the DELETE request
                const response = await fetch(`/api/products/${pid}`, {
                    method: 'DELETE',
                });

                const readableResponse = await response.json()

                if (response.statusCode === 200) {
                    const data = await response.json();
                    console.log('Product deleted successfully:', data);

                    // Show success message and redirect
                    await Swal.fire({
                        icon: 'success',
                        title: 'Deleted!',
                        text: 'The product has been deleted.'
                    });

                    // Redirect to the products page or any other action
                    window.location.href = '/products';
                } else {
                    console.error('Failed to delete product:', readableResponse.message);

                    // Show error message
                    await Swal.fire({
                        icon: 'error',
                        title: 'Deletion Failed',
                        text: `Failed to delete product. ${readableResponse.message}.`
                    });
                }
            } catch (error) {
                console.error('Error deleting product:', error);

                // Show error message
                await Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'An error occurred while deleting the product.'
                });
            }
        } else {
            // Title did not match
            await Swal.fire({
                icon: 'error',
                title: 'Mismatch',
                text: 'The title entered does not match. Product was not deleted.'
            });
        }
    }
}
