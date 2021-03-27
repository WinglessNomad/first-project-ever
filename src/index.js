//date
let now = new Date();
let today = now.toDateString();
let date = document.querySelector("#date");
date.innerHTML = today;

//search engine

//displays current weather condition when searched by city name
function displayWeatherCondition(response) {
 document.querySelector("#searched-city").innerHTML = response.data.name;
 document.querySelector(".current-temp").innerHTML = Math.round(response.data.main.temp);
document.querySelector(".current-info").innerHTML = response.data.weather[0].description;
document.querySelector(".wind-speed").innerHTML = response.data.wind.speed;
}

//displays forecast when searched by city name
function displayForecast(response) {
  document.querySelector(".current-temp").innerHTML = Math.round(response.data.main.temp);
  document.querySelector(".current-description").innerHTML = response.data.weather[0].description;
  document.querySelector("#searched-city").innerHTML = response.data.name;
  document.querySelector("#forecast-icon-1").innerHTML = response.data.weather[0].icon;
}

function searchCity(city) {
  let apiKey = "42e97aa1960c10d8826372a5ee85406c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  let apiForecastUrl = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&cnt=5&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeatherCondition);
  axios.get(apiForecastUrl).then(displayForecast);
}

function onSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-engine").value;
  searchCity(city);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", onSubmit);

function displayForecast(response) {
  document.querySelector(".current-temp").innerHTML = Math.round(response.data.current.temp);
  document.querySelector(".current-description").innerHTML = response.data.current.weather[0].description;
  //current - temp, info, wind, feels like, icon
  //forecast - temp, icon, day of week?
  document.querySelector("#forecast-icon-1").innerHTML = response.data.daily.weather[0].icon;
  
}

function searchLocation(position) {
  let apiKey = "42e97aa1960c10d8826372a5ee85406c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${position.coords.latitude}&lon=${position.coords.longitude}&exclude=minutely,hourly,alerts&appid=${apiKey}`;
  //let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
  
}

function displayCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#pin");
currentLocationButton.addEventListener("click", displayCurrentLocation); 


