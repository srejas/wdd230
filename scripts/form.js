// Check that both passwords entered are a match
const password = document.querySelector('#password');
const rePassword = document.querySelector('#rePassword');
const errorMessage = document.querySelector('#errorMessage');

function verifyPassword() {
    if (password.value !== rePassword.value) {
        errorMessage.textContent = 'Passwords DO NOT MATCH! 🚫';
        errorMessage.style.display = 'block';
        
        password.style.backgroundColor = "#ffbabc"
        rePassword.style.backgroundColor = "#ffbabc"

        password.value = '';
        rePassword.value = '';
        password.focus();
    }
    else {
        errorMessage.style.display = 'none';
        password.style.backgroundColor = "rgb(234, 234, 234)";
        rePassword.style.backgroundColor = "rgb(234, 234, 234)";
    }
}

rePassword.addEventListener('focusout', verifyPassword);

// Update rating when range input is moved
const rating = document.querySelector('#rating');
const slider = document.querySelector('#ratingRange');

function displayRating() {
    rating.innerHTML = slider.value;
}

slider.addEventListener('input', displayRating);
slider.addEventListener('change', displayRating);