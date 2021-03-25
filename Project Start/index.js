//date
let now = new Date();
let today = now.toDateString();
let date = document.querySelector("#date");
date.innerHTML = today;

//search engine

function displayWeatherCondition(response) {

  let temp = Math.round(response.data.main.temp);
  let disTemp = document.querySelector(".current-temp");
  disTemp.innerHTML = `${temp} °C`;
  document.querySelector(".current-info").innerHTML = response.data.weather[0].main;
  document.querySelector("#searched-city").innerHTML = response.data.name;
}



function searchCity(city) {
  let apiKey = "42e97aa1960c10d8826372a5ee85406c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function onSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-engine").value;
  searchCity(city);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", onSubmit);

function searchLocation(position) {
  let apiKey = "42e97aa1960c10d8826372a5ee85406c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
  
}

function displayCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#pin");
currentLocationButton.addEventListener("click", displayCurrentLocation); 




/*//temp conversion
function changeCelsius(event) {
    event.preventDefault();
    let cels = document.querySelector(".current-temp");
    cels.innerHTML = "15 °C";
}

let cel = document.querySelector(".celsius");
cel.addEventListener("click", changeCelsius);*/

/*
function changeFahrenheit(event) {
    event.preventDefault();
    let fahr = document.querySelector(".current-temp");
    fahr.innerHTML = "39 °F";
    /*let temp = fahr.innerHTML;
    temp = number(temp);
    fahr.innerHTML = Math.round((temp * 9) / 5 + 32);*/
    
    /*let temp = 15 * (9 / 5) + 32;
    fahr.innerHTML = "${temp} °F";*/

/*let fah = document.querySelector(".fahrenheit");
fah.addEventListener("click", changeFahrenheit);


function changeFahrenheit(event) {
    event.preventDefault();
    let tempF = document.querySelector(".current-temp").value;
    let fahr = document.querySelector(".current-temp");
    let mat = Math.round(${tempF} * 9 / 5 + 32);
    fahr.innerHTML = `${mat} °F`;
    
}

let fah = document.querySelector(".fahrenheit");
fah.addEventListener("click", changeFahrenheit);*/