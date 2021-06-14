// Select elements using HTML classes
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const humidElement = document.querySelector(".humidity p");
const windElement = document.querySelector(".wind-speed p");
const uvElement = document.querySelector(".uv-index p");
const locationElement = document.querySelector(".location p");
const dateElement = document.querySelector(".current-date p");

// Weather object
const weather = {};

// Define temperature unit
weather.temperature = {
    unit : "fahrenheit"
}

// const Kelvin to convert into °F or °C with formula function
const Kelvin = 273;

// API key
const key = "af1b0ca388823bdddd22e7a5e0a349f2";

// Set user's position using long & lat
function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude, longitude);
}

// Get weather from API 
function  getWeather(latitude, longitude){
    let api = 'https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${key}';

    fetch(api)
    .then(function(response){
        let data = response.json();
        return data;
    })
    .then(function(data){
        weather.temperature.value = Math.floor(data.main.temp - Kelvin);
        weather.description = data.weather[0].description;
        weather.iconId = data.weather[0].icon;
        weather.city = data.name;
        weather.humidity = data.main.humidity;

    })
    .then(function() {
        displayWeather();
    });
}

// Displays weather to UI
function displayWeather(){
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png/>`;
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}`;
};

// Converts celsius to fahrenheit
function celsiusToFahrenheit(temperature){
    return (temperature * 9/5) + 32;
}

// When user clicks on temp element
tempElement.addEventListener("click", function (){
    if (weather.temperature.unit === "celsius"){
        let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit);

        tempElement.innerHTML = `${fahrenheit}°<span>F</span>`;
        weather.temperature.unit = "fahrenheit";
    } else{
        tempElement.innerHTML = `${weather.temperature.value} °<span>C<span>`;
        weather.temperature.unit = "celsius"
    }
});