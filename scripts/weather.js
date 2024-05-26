// Coordinates 40.51398288670551, -112.03306456016304
const weatherP = document.querySelector('#weather');


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

    weatherP.appendChild(weatherIcon);
    weatherP.appendChild(currentTemp);
}

getWeather();