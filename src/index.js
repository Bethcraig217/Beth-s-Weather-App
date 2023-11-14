let now = new Date();
    let day = now.getDay();
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];

    let hours = now.getHours();
    let minutes = now.getMinutes();
    let amPm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    hours = hours < 10 ? +hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;

    let currentDay = days[now.getDay()];
    let h5 = document.querySelector("#current-time");
    h5.innerHTML = `${currentDay} ${hours}:${minutes} ${amPm}`;

    function convertToFahrenheit(event) {
        event.preventDefault();
        let temperatureElement = document.querySelector("#temperature");
        temperatureElement.innerHTML = `${temperature}`;
    }
    function search(event) {
        event.preventDefault();
        let searchInput = document.querySelector("#search-text-input");

        let apiKey = "a1990de4a679383e9dc43b50377155b6";
        let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&units=imperial`;
        axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemp);
    }
    let form = document.querySelector("#search-form");
    form.addEventListener("submit", search);

    function convertToCelsius(event) {
        event.preventDefault();
        let temperatureElement = document.querySelector("#temperature");
        temperatureElement.innerHTML = 19;
    }
    let fahrenheitLink = document.querySelector("#fahrenheit-link");
    fahrenheitLink.addEventListener("click", convertToFahrenheit);

    let celsiusLink = document.querySelector("#celsius-link");
    celsiusLink.addEventListener("click", convertToCelsius);

    function showTemp(response) {
        let city = document.querySelector("#city");
        let temperature = Math.round(response.data.main.temp);
        let tempElement = document.querySelector("#temperature");
        let description = document.querySelector("#weatherDescription");
        city.innerHTML = response.data.name;
        tempElement.innerHTML = `${temperature} F°| C° `;
        description.innerHTML = `${response.data.weather[0].description}`;
    }

    function showPosition(position) {
        console.log(position);
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        let units = "imperial";
        let apiKey = "a1990de4a679383e9dc43b50377155b6";
        let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

        axios.get(apiUrl).then(showTemp);
    }
    function getPosition(event) {
        event.preventDefault();
        navigator.geolocation.getCurrentPosition(showPosition);
    }

    let button = document.querySelector("#current-location-button");
    button.addEventListener("click", getPosition);