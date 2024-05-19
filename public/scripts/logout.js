async function logOut(){
    await fetch('/api/sessions/signout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
    }).then(() => {
        location.reload();
    });
}