async function submitForm() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('registerEmailField').value;
    const password = document.getElementById('registerPasswordField').value;
    const photo = document.getElementById('photo').value;
    const role = parseInt(document.getElementById('role').value, 10);

    // Set photo to null if it's empty
    const photoValue = photo.trim() === "" ? null : photo;
    console.log("My photovalue is", photoValue)
    const formData = {
        name,
        email,
        password,
        photo: photoValue,
        role
    };

    try {
        const response = await fetch('/api/sessions/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();
        console.log("My response is", response)
        console.log("My data is", data)

        if (data.statusCode === 201) {
            // Show success notification
            await Swal.fire({
                title: 'Success!',
                text: 'User registered successfully.',
                icon: 'success',
                confirmButtonText: 'OK'
            });
            // Optionally redirect to login page
            window.location.replace("/users/login");
        } else {
            // Handle non-200 status codes
            const errorMessage = Array.isArray(data.message)
                ? data.message.join('<br>')
                : typeof data.message === 'string'
                    ? data.message
                    : 'An error occurred while processing your request.';

            await Swal.fire({
                title: 'Error!',
                html: `<strong>Status Code:</strong> ${data.statusCode}<br>${errorMessage}`,
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



function testValues() {
    var name = document.getElementById('name').value;
    var email = document.getElementById('registerEmailField').value;
    var password = document.getElementById('registerPasswordField').value;
    var photo = document.getElementById('photo').value;
    var role = document.getElementById('role').value;

    var formData = {
        name: name,
        email: email,
        password: password,
        photo: photo,
        role: role
    };

    console.log(formData)
}