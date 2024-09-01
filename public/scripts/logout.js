async function logOut() {
    try {
        const response = await fetch('/api/sessions/signout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        const data = await response.json()
        console.log(data)

        if (!response.ok) {
            throw new Error(`Logout failed with status: ${response.status}`);
        }

        // Optionally, you can add a SweetAlert to confirm successful logout
        Swal.fire({
            title: 'Logged Out',
            text: 'You have been successfully logged out.',
            icon: 'success',
            confirmButtonText: 'OK'
        }).then(() => {
            window.location.replace('/');
        });
    } catch (error) {
        // Display a SweetAlert error message
        Swal.fire({
            title: 'Error',
            text: `Logout failed: ${error.message}`,
            icon: 'error',
            confirmButtonText: 'Try Again'
        });
        console.error('Logout failed:', error);
    }
}
