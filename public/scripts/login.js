async function submitForm() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    var formData = {
        email: email,
        password: password,
    };

    try {
        const response = await fetch('/api/sessions/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        let data = await response.json()
        console.log(data)

        if (data.statusCode == 200) {
            window.location.replace("/");
        } else {
            // Handle different response statuses if needed
            alert("Login failed. Please try again.");
        }
    } catch (error) {
        alert("An error occurred. Please try again.");
        console.error('Error:', error);
    }
}
