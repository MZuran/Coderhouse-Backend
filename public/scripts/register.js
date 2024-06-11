async function submitForm() {
    var name = document.getElementById('name').value;
    var email = document.getElementById('registerEmailField').value;
    var password = document.getElementById('registerPasswordField').value;
    var photo = document.getElementById('photo').value;
    var role = document.getElementById('role').value;

    if (!photo) {photo = null}

    var formData = {
        name: name,
        email: email,
        password: password,
        photo: photo,
        role: role
    };

    console.log(formData)

    await fetch('/api/sessions/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(data => {
        window.location.replace("/users/login")
    })
    .catch(error => {
        alert("error")
        console.error('Error:', error);
    });
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
async function submitForm() {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var photo = document.getElementById('photo').value;
    var role = document.getElementById('role').value;

    if (!photo) {photo = null}

    var formData = {
        name: name,
        email: email,
        password: password,
        photo: photo,
        role: role
    };

    console.log(formData)

    await fetch('/api/sessions/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(data => {
        window.location.replace("/users/login")
    })
    .catch(error => {
        alert("error")
        console.error('Error:', error);
    });
}
