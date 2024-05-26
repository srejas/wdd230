// Coordinates 40.51398288670551, -112.03306456016304
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');


const key = 'aa65867bdf092012546af79f7f29f98e';
const url = `https://api.openweathermap.org/data/2.5/weather?lat=40.51&lon=-112.03&units=imperial&appid=${key}`;

async function apiFetch() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            displayResults(data);
        }
        else {
            throw Error(await response.text());
        }
    } catch(error) {
        console.log(error);
    }
}

function displayResults(data) {
    currentTemp.innerHTML = `${Math.floor(data.main.temp)}&deg;F - ${data.weather[0].description}`;
    weatherIcon.setAttribute('src', `https://openweathermap.org/img/w/${data.weather[0].icon}.png`);
    weatherIcon.setAttribute('alt', `${data.weather[0].description} icon`);
}

apiFetch();