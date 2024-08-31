async function verify(user_id) {
    try {
        const response = await fetch(`/api/sessions/verify`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                uid: user_id
            })
        });

        const parsedResponse = await response.json();
        console.log(parsedResponse);

        if (parsedResponse.statusCode === 200) {
            await Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'You have been verified successfully!',
            });
            window.location.href = '/';
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Verification failed. Please try again.',
            });
        }
        
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'An unexpected error occurred. Please try again later.',
        });
    }
}
