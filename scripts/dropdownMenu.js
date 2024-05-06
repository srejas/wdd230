const hamburgerButton = document.querySelector('#dropdown-button');
const navigation = document.querySelector('.dropdown-menu');

hamburgerButton.addEventListener('click', () => {
    navigation.classList.toggle('open');
    hamburgerButton.classList.toggle('open');
});