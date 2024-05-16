async function logOut(){
    await fetch('http://localhost:8080/api/sessions/signout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
    }).then(() => {
        location.reload();
    });
}