let today = document.querySelector("li#current-date");

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let currentYear = date.getFullYear();
  let currentDay = days[date.getDay()];
  let currentMonth = months[date.getMonth()];
  let currentDate = date.getDate();
  let currentHours = date.getHours();
  let currentMinutes = date.getMinutes();
  let minutes = "";
  if (currentMinutes < 10) minutes = "0" + currentMinutes;
  else minutes = currentMinutes;

  today.innerHTML = `${currentDay}, ${currentMonth} ${currentDate}, ${currentYear} ${currentHours}:${minutes}`;
}

formatDate(new Date());

function search(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let searchInput = document.querySelector("#search-text-input");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${searchInput.value}`;
}
let form = document.querySelector(".weather-search");

form.addEventListener("submit", search);

let temperatures;
let tempNow;

function showTemperature(response) {
  celsiusTemp = response.data.main.temp;
  temperatures = Math.round(celsiusTemp);
  tempNow = document.querySelector(".currentTemp");
  tempNow.innerHTML = `${temperatures}`;
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let searchInput = document.querySelector("#search-text-input");
  let iconElement = document.querySelector("#icon");

  searchInput.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}
function searchCity(event) {
  event.preventDefault();
  let apiKey = "cf6b50b908fa2e0baca3eed8a569a5f6";
  let city = encodeURIComponent(
    document.querySelector("#search-text-input").value
  );
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
function displayFahrenheit(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  //let temperatures = document.querySelector(".currentTemp");
  tempNow.innerHTML = Math.round(fahrenheitTemp);
}
let celsiusTemp;
function displayCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  tempNow.innerHTML = Math.round(celsiusTemp);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
function searchLocation(position) {
  let apiKey = "cf6b50b908fa2e0baca3eed8a569a5f6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

let formSearch = document.querySelector(".weather-search");
formSearch.addEventListener("submit", searchCity);
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsius);
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheit);
let currentLocationButton = document.querySelector(".currentLoc");
currentLocationButton.addEventListener("click", getCurrentLocation);
