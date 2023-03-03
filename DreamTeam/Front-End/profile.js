
async function basiclogin(email, password){
    const response = await z1Fetc.post(loginEndpoint, {
        auth: {
            username: email,
            password: password
        },
        body:{ }
    })
    const{ token } = response.body

    localStorage.setItem('token', token)
}

//alert("You have been logged out");