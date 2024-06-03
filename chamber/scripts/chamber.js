// Last date modified script //
document.querySelector(".lastModified").textContent = `Last Modification: ${document.lastModified}`;

// Drop down menu script //
const menuButton = document.querySelector('.menu');
const navigationElement = document.querySelector('.navigation');

menuButton.addEventListener('click', () => {
    navigationElement.classList.toggle('open');
    menuButton.classList.toggle('open');
});

// Display message for time between visits on the discover page
const messageDisplay = document.querySelector('#pageMessage');

const currentVisit = Date.now();
let lastVisit = Number(window.localStorage.getItem('lastVisit-ls')) || currentVisit;

const oneDay = 84600000;
const timeElapsed = currentVisit - lastVisit;
const daysPast = Math.floor(timeElapsed / oneDay);

function createMessage() {
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

function displayMessage() {
    messageDisplay.textContent = createMessage();
}

if (document.querySelector('#pageMessage')) {
    displayMessage();
}

localStorage.setItem('lastVisit-ls', currentVisit);

// Add a timestamp value once the join page has loaded
if (document.querySelector('#timestamp')) {
    const timestampInput = document.querySelector('#timestamp');
    const timestamp = new Date().toString();

    timestampInput.value = timestamp;
}

// Display cards that show information for business members of the chamber
const membersUrl = "https://srejas.github.io/wdd230/chamber/data/members.json"
const businessCards = document.querySelector('#businessCards');

async function getBusinessData(arrowFunction) {
    try {
        const response = await fetch(membersUrl);
        if (response.ok) {
            const data = await response.json();
            arrowFunction(data.businesses);
        }
        else {
            throw Error(await response.text());
        }
    } catch(error) {
        console.log(error);
    }
}

const displayBusinesses = (businesses) => {
    businesses.forEach((business) => {
        let card = document.createElement('section');
        let logo = document.createElement('img');
        
        logo.setAttribute('src', business.imageLogo);
        logo.setAttribute('alt', `${business.name} logo`);
        logo.setAttribute('loading', 'lazy');

        let name = document.createElement('p');
        name.textContent = `${business.name}`;

        let address = document.createElement('p');
        address.textContent = `${business.address}`;

        let phoneNumber = document.createElement('p');
        phoneNumber.textContent = `${business.phoneNumber}`;

        let website = document.createElement('a');
        website.setAttribute('href', '#');
        website.textContent = `${business.siteUrl}`;

        let membershipInfo = document.createElement('p');
        membershipInfo.setAttribute('id', 'membership-info')
        membershipInfo.textContent = `${business.mLevel} member since ${business.joinDate}`;

        card.appendChild(logo);
        card.appendChild(name);
        card.appendChild(address);
        card.appendChild(phoneNumber);
        card.appendChild(website);
        card.appendChild(membershipInfo);

        businessCards.appendChild(card);

        if (window.innerWidth > 511) {
            businessCards.setAttribute('class', 'grid');
        }
        else {
            businessCards.setAttribute('class', 'list');
        }
    })
}

if (businessCards) {
    getBusinessData(displayBusinesses);
}

// Toggle between grid and list view in the directory page.
const gridButton = document.querySelector('#grid-button');
const listButton = document.querySelector('#list-button');

if (businessCards) {
    gridButton.addEventListener('click', () => {
        businessCards.classList.add('grid');
        businessCards.classList.remove('list');

        gridButton.style.border = "3px solid var(--accent-color-1)";
        listButton.style.border = "none";
    })

    listButton.addEventListener('click', () => {
        businessCards.classList.add('list');
        businessCards.classList.remove('grid');

        listButton.style.border = "3px solid var(--accent-color-1)";
        gridButton.style.border = "none";
    })
}

// Get and display weather on the home page
const currentWeather = document.querySelector('#current-weather');


const key = 'aa65867bdf092012546af79f7f29f98e';
const url = `https://api.openweathermap.org/data/2.5/weather?lat=40.51&lon=-112.03&units=imperial&appid=${key}`;

async function getWeather() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            displayWeather(data);
        }
        else {
            throw Error(await response.text());
        }
    } catch(error) {
        console.log(error);
    }
}

function displayWeather(data) {
    const weatherIcon = document.createElement('img');
    const currentTemp = document.createElement('span');

    weatherIcon.setAttribute('id', 'weather-icon');
    weatherIcon.setAttribute('src', `https://openweathermap.org/img/w/${data.weather[0].icon}.png`);
    weatherIcon.setAttribute('alt', `${data.weather[0].description} icon`);

    currentTemp.setAttribute('id', 'current-temp');
    currentTemp.innerHTML = `${Math.floor(data.main.temp)}&deg;F - ${data.weather[0].description}`;

    currentWeather.appendChild(weatherIcon);
    currentWeather.appendChild(currentTemp);
}

if (currentWeather) {
    getWeather();
}

//Display gold and silver businesses in the "member spotlights" section of the hope page
const businessSpotlights = document.querySelector('#membersDisplay');

const spotlightMembers = (businesses) => {
    const silverPlusMembers = businesses.filter((business) => business.mLevel === 'Silver' || business.mLevel === 'Gold');

    for (let i = 0; i < 3; i++) {
        let randomMember = Math.floor(Math.random() * silverPlusMembers.length);

        const currentMember = silverPlusMembers[randomMember]

        const figure = document.createElement('figure');
        const memberLogo = document.createElement('img');

        memberLogo.setAttribute('src', `${currentMember.imageLogo}`);
        memberLogo.setAttribute('alt', `${currentMember.name} logo`);
        memberLogo.setAttribute('loading', 'lazy');

        const caption = document.createElement('figcaption');
        caption.textContent = `${currentMember.name}`;

        figure.appendChild(memberLogo);
        figure.appendChild(caption);

        businessSpotlights.appendChild(figure);

        silverPlusMembers.splice(randomMember, 1);
    }
}

if (businessSpotlights) {
    getBusinessData(spotlightMembers);
}