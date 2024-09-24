const loginForm = document.getElementById('login');
const loginEmail = document.getElementById('Email2');
const loginPassword = document.getElementById('Password2');
const loginAlert = document.getElementById('login-alert');

loginForm.addEventListener('submit', (e) => {

    e.preventDefault();

    if (loginEmail.value&&loginPassword.value) {
        let userAuth = {
            email: loginEmail.value,
            password: loginPassword.value,
        }
        localStorage.setItem('userAuthentication', JSON.stringify(userAuth));
        localStorage.setItem('authenticated', true);
        window.location.href = 'homePage.html';
    } else {
        loginAlert.style.display = 'block';
    }
})
console.log(JSON.parse(localStorage.getItem('userAuthentication')));
