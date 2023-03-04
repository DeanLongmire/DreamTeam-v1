
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


document.querySelector("#Edit").onclick = function(){
    const h4 = document.querySelector("#Name");
    h4.innerText = "Dynprog"; 

}


//alert("You have been logged out");