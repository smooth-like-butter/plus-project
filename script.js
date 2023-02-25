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
  let searchInput = document.querySelector("#search-text-input");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${searchInput.value}`;
}
let form = document.querySelector(".weather-search");

form.addEventListener("submit", search);

function showTemperature(response) {
  let temperatures = Math.round(response.data.main.temp);
  let tempNow = document.querySelector(".currentTemp");
  tempNow.innerHTML = `${temperatures}`;
  let searchInput = document.querySelector("#search-text-input");
  searchInput.innerHTML = response.data.name;
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
let formSearch = document.querySelector(".weather-search");
formSearch.addEventListener("submit", searchCity);
