// Last date modified script //
document.querySelector("#lastModified").textContent = `Last Modification: ${document.lastModified}`;

// Drop down menu script //
const menuButton = document.querySelector('#menu');
const navigationElement = document.querySelector('.navigation');

menuButton.addEventListener('click', () => {
    navigationElement.classList.toggle('open');
    menuButton.classList.toggle('open');
});

// Display message for time between visits
let messageDisplay = document.querySelector('#pageMessage');

const currentVisit = Date.now();
let lastVisit = Number(window.localStorage.getItem('lastVisit-ls')) || currentVisit;

const oneDay = 84600000;
const timeElapsed = currentVisit - lastVisit;
const daysPast = Math.floor(timeElapsed / oneDay);

function CreateMessage() {
    let message;

    let dayOrDays = 'day'
    if (daysPast > 1) {
        dayOrDays = 'days';
    }

    if (timeElapsed === 0) {
        message = `Welcome! Let us know if you have any questions.`
    }
    else {
        if (timeElapsed < oneDay) {
            message = `Back so soon! Awesome!`
        }
        else {
            message = `You last visited ${daysPast} ${dayOrDays} ago.`
        }
    }
    return message;
}

function DisplayMessage() {
    messageDisplay.textContent = CreateMessage();
}

DisplayMessage();

localStorage.setItem('lastVisit-ls', lastVisit);