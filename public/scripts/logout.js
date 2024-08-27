async function logOut() {
    try {
        await fetch('/api/sessions/signout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
        });
        
        window.location.replace('/');
    } catch (error) {
        console.error('Logout failed:', error);
    }
}
