async function submitEditUser() {
    // Gather form elements
    const name = document.getElementById('name').value;
    const photo = document.getElementById('photo').value;
    const role = document.getElementById('role')?.value; // Role is optional and may not exist
    const password = document.getElementById('passwordChange')?.value;

    const userId = document.getElementById("userId").innerText;

    // Create the payload
    const payload = {
        name: name,
        photo: photo,
    };

    // If role exists (admin user), add it to the payload
    if (role !== undefined) {
        payload.role = parseInt(role);
    }

    if(password !== null && password !== "") {
        payload.password = password;
    }

    try {
        // Send the PUT request
        const response = await fetch(`/api/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });

        // Handle the response
        if (response.status == 200) {
            const data = await response.json();
            console.log('User updated successfully:', data);

            // Show success message using SweetAlert and redirect after the user clicks OK
            await Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'User updated successfully.'
            });

            // Redirect to the user detail page
            window.location.href = `/users/`;
        } else {
            console.error('Failed to update user:', response.statusText);

            // Show error message using SweetAlert
            await Swal.fire({
                icon: 'error',
                title: 'Update Failed',
                text: `Failed to update user. Status: ${response.statusText}`
            });
        }
    } catch (error) {
        console.error('Error updating user:', error);

        // Show error message using SweetAlert
        await Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'An error occurred while updating the user.'
        });
    }
}

async function deleteUser(userId) {
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
        // Get the name from the form
        const name = document.getElementById('name').value;

        // Second SweetAlert to verify the name
        const { value: enteredName } = await Swal.fire({
            icon: 'info',
            title: 'Confirm Deletion',
            text: `Please enter the user's name (${name}) to confirm deletion`,
            input: 'text',
            inputPlaceholder: 'User name',
            showCancelButton: true,
            confirmButtonText: 'Delete',
            cancelButtonText: 'Cancel'
        });

        if (enteredName === name) {
            try {
                // Send the DELETE request
                const response = await fetch(`/api/users/${userId}`, {
                    method: 'DELETE',
                });

                const readableResponse = await response.json()

                if (response.status === 200) {
                    const data = await response.json();
                    console.log('User deleted successfully:', data);

                    // Show success message and redirect
                    await Swal.fire({
                        icon: 'success',
                        title: 'Deleted!',
                        text: 'The user has been deleted.'
                    });

                    // Redirect to the users list page or any other action
                    window.location.href = '/users';
                } else {
                    console.error('Failed to delete user:', readableResponse.message);

                    // Show error message
                    await Swal.fire({
                        icon: 'error',
                        title: 'Deletion Failed',
                        text: `Failed to delete user. ${readableResponse.message}.`
                    });
                }
            } catch (error) {
                console.error('Error deleting user:', error);

                // Show error message
                await Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'An error occurred while deleting the user.'
                });
            }
        } else {
            // Name did not match
            await Swal.fire({
                icon: 'error',
                title: 'Mismatch',
                text: 'The name entered does not match. User was not deleted.'
            });
        }
    }
}
