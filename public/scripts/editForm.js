async function submitEdit() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    var formData = {
        email: email,
        password: password,
    };

    await fetch('/api/sessions/login', {
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

async function deleteProduct(pid) {
    alert(pid)
}