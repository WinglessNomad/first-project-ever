//date
let now = new Date();
let today = now.toDateString();
document.querySelector("#date").innerHTML = today;

//declaring variables
let cityElement = document.querySelector("#searched-city").value;
let descriptionElement = document.querySelector(".current-description");
let realFeelElement = document.querySelector(".feels-like");
let windElement = document.querySelector(".wind-speed");
let windUnit = document.querySelector(".unit");
let iconElement = document.querySelector("#icon");
let currentTemperature = document.querySelector("#current-temp");


let fcTemp1 = document.querySelector(".forecast-temp-1");
let fcTemp2 = document.querySelector(".forecast-temp-2");
let fcTemp3 = document.querySelector(".forecast-temp-3");
let fcDesc1 = document.querySelector(".forecast-description-1");
let fcDesc2 = document.querySelector(".forecast-description-2");
let fcDesc3 = document.querySelector(".forecast-description-3");
let fcIcon1 = document.querySelector(".forecast-icon-1");
let fcIcon2 = document.querySelector(".forecast-icon-2");
let fcIcon3 = document.querySelector(".forecast-icon-3");

let apiKey = "bbc514bdb7c36a278a6660e973fff2d4";


//search engine

function searchCity(city) {
  let apiCurrentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(apiCurrentUrl).then((response) => response.json()).then((data) => {
    document.querySelector("#searched-city").innerHTML = city;
    celsiusTemperature = data.main.temp;
    currentTemperature.innerHTML = Math.round(celsiusTemperature);
    descriptionElement.innerHTML = data.weather[0].description;
    windElement.innerHTML = Math.round(data.wind.speed);
    realFeelTemperature = data.main.feels_like;
    realFeelElement.innerHTML = Math.round(realFeelTemperature);
    iconElement.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    
    

    let latitude = data.coord.lat;
    let longitude = data.coord.lon;
    let apiForecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly,alerts&appid=42e97aa1960c10d8826372a5ee85406c&units=metric`;

    fetch(apiForecastUrl).then((response) => response.json()).then((data) => {
    forecastTemp1 = data.daily[0].temp.day;
    fcTemp1.innerHTML = Math.round(forecastTemp1);
    fcDesc1.innerHTML = data.daily[0].weather[0].description;
    fcIcon1.src = `https://openweathermap.org/img/wn/${data.daily[0].weather[0].icon}@2x.png`;
    forecastTemp2 = data.daily[1].temp.day;
    fcTemp2.innerHTML = Math.round(forecastTemp2);
    fcDesc2.innerHTML = data.daily[1].weather[0].description;
    fcIcon2.src = `https://openweathermap.org/img/wn/${data.daily[1].weather[0].icon}@2x.png`;
    forecastTemp3 = data.daily[2].temp.day;
    fcTemp3.innerHTML = Math.round(forecastTemp3);
    fcDesc3.innerHTML = data.daily[2].weather[0].description;
    fcIcon3.src = `https://openweathermap.org/img/wn/${data.daily[2].weather[0].icon}@2x.png`;
  })
   
  //switch to change backgrounds
  let gifs = data.weather[0].main;
    switch(gifs) {
      case "Clear": document.getElementById("wrapper-bg").style.backgroundImage =
        "url('src/images/clear.gif')";
      break;
      case "Clouds": document.getElementById("wrapper-bg").style.backgroundImage =
        "url('src/images/clouds.gif')";
      break;
      case "Drizzle": document.getElementById("wrapper-bg").style.backgroundImage =
        "url('src/images/drizzle.gif')";
      break;
      case "Fog": document.getElementById("wrapper-bg").style.backgroundImage =
        "url('src/images/fog.gif')";
      break;
      case "Rain": document.getElementById("wrapper-bg").style.backgroundImage =
        "url('src/images/rain.gif')";
      break;
      case "Snow": document.getElementById("wrapper-bg").style.backgroundImage =
        "url('src/images/snow.gif')";
      break;
      case "Thunderstorm": document.getElementById("wrapper-bg").style.backgroundImage =
        "url('src/images/thunderstorm.gif')";
      break;
    }
  });
}

//unit conversion
function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temp");
  let realFeelFahr = document.querySelector(".feels-like");
  let fore1Fahr = document.querySelector(".forecast-temp-1");
  let fore2Fahr = document.querySelector(".forecast-temp-2");
  let fore3Fahr = document.querySelector(".forecast-temp-3");

  celsiusTemp.classList.remove("active");
  fahrenheitTemp.classList.add("active");

  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);

  let realFeelFahrenheit = (realFeelTemperature * 9) / 5 + 32;
  realFeelFahr.innerHTML = Math.round(realFeelFahrenheit);

  let forecastFahrenheit1 = (forecastTemp1 * 9) / 5 + 32;
  fore1Fahr.innerHTML = Math.round(forecastFahrenheit1);

  let forecastFahrenheit2 = (forecastTemp2 * 9) / 5 + 32;
  fore2Fahr.innerHTML = Math.round(forecastFahrenheit2);

  let forecastFahrenheit3 = (forecastTemp3 * 9) / 5 + 32;
  fore3Fahr.innerHTML = Math.round(forecastFahrenheit3);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusTemp.classList.add("active");
  fahrenheitTemp.classList.remove("active");

  document.querySelector("#current-temp").innerHTML = Math.round(celsiusTemperature);
  document.querySelector(".feels-like").innerHTML = Math.round(realFeelTemperature);
  document.querySelector(".forecast-temp-1").innerHTML = Math.round(forecastTemp1);
  document.querySelector(".forecast-temp-2").innerHTML = Math.round(forecastTemp2);
  document.querySelector(".forecast-temp-3").innerHTML = Math.round(forecastTemp3);
}

let fahrenheitTemp = document.querySelector(".fahrenheit");
fahrenheitTemp.addEventListener("click", displayFahrenheitTemperature);

let celsiusTemp = document.querySelector(".celsius");
celsiusTemp.addEventListener("click", displayCelsiusTemperature);


function onSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-engine").value;
  searchCity(city);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", onSubmit);


let celsiusTemperature = null;
let realFeelTemperature = null;
let forecastTemp1 = null;
let forecastTemp2 = null;
let forecastTemp3 = null;


searchCity("Zagreb");

//weather info by location

function searchLocation(position) {
  let apiKey = "42e97aa1960c10d8826372a5ee85406c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${position.coords.latitude}&lon=${position.coords.longitude}&exclude=minutely,hourly,alerts&appid=${apiKey}&units=metric`;
  
  fetch(apiUrl).then((response) => response.json()).then((data) => {
    document.querySelector("#searched-city").innerHTML = data.timezone;
    celsiusTemperature = data.current.temp;
    currentTemperature.innerHTML = Math.round(celsiusTemperature);
    descriptionElement.innerHTML = data.current.weather[0].description;
    windElement.innerHTML = Math.round(data.current.wind_speed);
    realFeelTemperature = data.current.feels_like;
    realFeelElement.innerHTML = Math.round(realFeelTemperature);
    iconElement.src = `https://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`;
    forecastTemp1 = data.daily[0].temp.day;
    fcTemp1.innerHTML = Math.round(forecastTemp1);
    fcDesc1.innerHTML = data.daily[0].weather[0].description;
    fcIcon1.src = `https://openweathermap.org/img/wn/${data.daily[0].weather[0].icon}@2x.png`;
    forecastTemp2 = data.daily[1].temp.day;
    fcTemp2.innerHTML = Math.round(forecastTemp2);
    fcDesc2.innerHTML = data.daily[1].weather[0].description;
    fcIcon2.src = `https://openweathermap.org/img/wn/${data.daily[1].weather[0].icon}@2x.png`;
    forecastTemp3 = data.daily[2].temp.day;
    fcTemp3.innerHTML = Math.round(forecastTemp3);
    fcDesc3.innerHTML = data.daily[2].weather[0].description;
    fcIcon3.src = `https://openweathermap.org/img/wn/${data.daily[2].weather[0].icon}@2x.png`;

    let backs = data.current.weather[0].main;
    switch(backs) {
      case "Clear": document.getElementById("wrapper-bg").style.backgroundImage =
        "url('src/images/clear.gif')";
      break;
      case "Clouds": document.getElementById("wrapper-bg").style.backgroundImage =
        "url('src/images/clouds.gif')";
      break;
      case "Drizzle": document.getElementById("wrapper-bg").style.backgroundImage =
        "url('src/images/drizzle.gif')";
      break;
      case "Fog": document.getElementById("wrapper-bg").style.backgroundImage =
        "url('src/images/fog.gif')";
      break;
      case "Rain": document.getElementById("wrapper-bg").style.backgroundImage =
        "url('src/images/rain.gif')";
      break;
      case "Snow": document.getElementById("wrapper-bg").style.backgroundImage =
        "url('src/images/snow.gif')";
      break;
      case "Thunderstorm": document.getElementById("wrapper-bg").style.backgroundImage =
        "url('src/images/thunderstorm.gif')";
      break;
    }
  })
}

function displayCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#pin");
currentLocationButton.addEventListener("click", displayCurrentLocation); 