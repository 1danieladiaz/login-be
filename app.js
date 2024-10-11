document.getElementById('singupForm').addEventListener('submit', async function //async porque de esta manera el va a esperar una respuesta
(e){
    e.preventDefault();

    const email = document.getElementById('newEmail').value;
    const password = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if(password !==confirmPassword){
        alert ('Las contrasenas no coinciden');
        return;
    }

    const response = await fetch ('http://localhost:3000/signup', {

        method: 'POST',
        headers: {
            'Content-Type': 'application/json'

        },
        body:JSON.stringify({email,password}),
    });

    const result = await response.text();
    alert(result);
});

document.getElementById('loginForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value; 

    const response = await fetch ('http://localhost:3000/login', {

        method: 'POST',
        headers: {
            'Content-Type': 'application/json'

        },
        body:JSON.stringify({email,password}),
    });
    
    const result = await response.text();
    alert(result);
    
})