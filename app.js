let unix = 1727499482;
let date = new Date(unix * 1000);
console.log(date); //Sat Sep 28 2024 06:58:02 GMT+0200 (Central European Summer Time)

let searchCity = document.getElementById("searchCity");
let app = document.querySelector(".app");
let form = document.querySelector("form");
let city = document.querySelector(".city");
let weather = document.querySelector(".weather");
let temperature = document.getElementById("temperature");
let temperatureFeels = document.getElementById("temperature-feels");
let temperatureMin = document.getElementById("temperature-min");
let temperatureMax = document.getElementById("temperature-max");
let sunrise = document.getElementById("sunrise");
let sunset = document.getElementById("sunset");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (searchCity.value != "") {
        searchCityWeather(searchCity.value);
    }
});

const req = new Request("vienna.json");

const searchCityWeather = (cityName) => {
    fetch(
        req
    )
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);
            if (data.cod == 200) {
                city.querySelector(".name").innerHTML = data.name;
                city.querySelector("img").src =
                    "https://flagsapi.com/" +
                    data.sys.country +
                    "/shiny/64.png";
                weather.querySelector("img").src =
                    "https://openweathermap.org/img/wn/" +
                    data.weather[0].icon +
                    "@2x.png";
                weather.querySelector(".description").innerHTML =
                    data.weather[0].main;
                temperature.innerText = Math.round(data.main.temp).toFixed(1);
                temperatureFeels.innerText = Math.round(
                    data.main.feels - like
                ).toFixed(1);
                temperatureMin.innerText = Math.floor(data.main.temp_min);
                temperatureMax.innerText = Math.ceil(data.main.temp_max);
                let dateObj = new Date(data.sys.sunrise * 1000);
                let hours = dateObj.getUTCHours();
                let minutes = dateObj.getUTCMinutes();
                let formattedTime =
                    hours.toString().padStart(2, "0") +
                    ":" +
                    minutes.toString().padStart(2, "0");
                console.log(formattedTime);
                sunrise.innerText = formattedTime;
            } else {
                searchCity.value = "";
                app.classList.add("error");
                setTimeout(() => {
                    app.classList.remove("error");
                }, 3000);
            }
        })
        .catch((error) => {
            console.error("Fetch error:", error);
        });
};

const initApp = (city) => {
    console.info("app initiated");
    searchCityWeather(city);
};

initApp("wroclaw");
