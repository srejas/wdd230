// Last date modified script (all pages)//
document.querySelector(".lastModified").textContent = `Last Modification: ${document.lastModified}`;

// Drop down menu script //
const menuButton = document.querySelector('.menu');
const navigationElement = document.querySelector('.navigation');

menuButton.addEventListener('click', () => {
    navigationElement.classList.toggle('open');
    menuButton.classList.toggle('open');
});

// Display message for time between visits (Discover page) //
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

// Add a timestamp value once the page loads (Join page) //
if (document.querySelector('#timestamp')) {
    const timestampInput = document.querySelector('#timestamp');
    const timestamp = new Date().toString();

    timestampInput.value = timestamp;
}

// Display cards that show information for business members of the chamber (Directory page) //
const membersUrl = "https://srejas.github.io/wdd230/chamber/data/members.json"
const businessCards = document.querySelector('#businessCards');

async function getBusinessData(businessFunction) {
    try {
        const response = await fetch(membersUrl);
        if (response.ok) {
            const data = await response.json();
            businessFunction(data.businesses);
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

//Display gold and silver businesses in the "member spotlights" section (Homepage) //
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

// Toggle between grid and list view in the (Directory page) //
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

// Get and display current weather (Homepage) //
const currentWeather = document.querySelector('#current-weather');

const key = 'aa65867bdf092012546af79f7f29f98e';
const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=40.51&lon=-112.03&units=imperial&appid=${key}`;

async function getWeather(weatherFunction, url) {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            weatherFunction(data);
            // console.log(data);
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
    getWeather(displayWeather, weatherUrl);
}

// Get and display a 3-day forecast (Homepage) //
const forecast = document.querySelector('#forecast');
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=40.51&lon=-112.03&units=imperial&appid=${key}`;

function displayForecast(data) {
    for (let i = 7; i <= 23; i += 8) {
        const forecastCard = document.createElement('section');
        const forecastDay = document.createElement('p');

        let day = data.list[i];
        let dayName = new Date(day.dt * 1000).toLocaleDateString('en-US', {weekday: 'long'})
        forecastDay.textContent = `${dayName}`;

        const forecastFigure = document.createElement('figure');
        const forecastIcon = document.createElement('img');
        forecastIcon.setAttribute('src', `https://openweathermap.org/img/w/${day.weather[0].icon}.png`);
        forecastIcon.setAttribute('alt', `${day.weather[0].description} icon`);

        const forecastTemp = document.createElement('figcaption');
        forecastTemp.innerHTML = `${Math.floor(day.main.temp)}&deg;F - ${day.weather[0].description}`;

        forecastFigure.appendChild(forecastIcon);
        forecastFigure.appendChild(forecastTemp);

        forecastCard.appendChild(forecastDay);
        forecastCard.appendChild(forecastFigure);

        forecast.appendChild(forecastCard);
    }
}

if (forecast) {
    getWeather(displayForecast, forecastUrl);
}