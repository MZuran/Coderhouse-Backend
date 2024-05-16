async function submitForm() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    var formData = {
        email: email,
        password: password,
    };

    await fetch('http://localhost:8080/api/sessions/login', {
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
