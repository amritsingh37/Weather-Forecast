const API_KEY = "63369000d5eabc408443201fe0b368b9";
const API_URL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const input = document.querySelector("#input");
const searchButton = document.querySelector(".btn");
const cityName = document.querySelector(".city-name");
const degree = document.querySelector(".degree");
const humidity = document.querySelector(".humid");
const country = document.querySelector(".country");
const wind = document.querySelector(".wind");
const timeZone = document.querySelector(".time-zone");
const weatherIcon = document.querySelector(".icon");
const weatherDescription = document.querySelector(".description");
const miniContainer = document.querySelector(".mini-container");
const defaultLayout = document.querySelector(".default-layout");

const notWeatherGetDiv = document.createElement("h3");

        notWeatherGetDiv.style.display = "none";
        notWeatherGetDiv.classList = "not-found";
        notWeatherGetDiv.textContent = "Not Found City. Try Again";
        miniContainer.appendChild(notWeatherGetDiv);

async function getWeather(query){
    resetStyles();
    try{
        const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${query}&appid=${API_KEY}`;
        const response = await fetch(url);
        if(!response.ok){
            notWeatherGetDiv.style.display = "block";
            // homeButton.style.display = "block";
            defaultLayout.style.display = "none";
            miniContainer.style.display = "flex";
            return;
            
        }
        const data = await response.json();
        changeFunctionality(data);
    }catch(error){
        console.log("Error fetching weather data:", error);
    }
    
}

async function changeFunctionality(data){
//     Imagine your HTML looks like this:

// html
// Copy
// Edit
// <div class="city-country">
//   <h3 class="city-name">Mumbai</h3>
//   <!-- <h3 class="country"></h3> (missing in the HTML) -->
// </div>
// Now your JavaScript tries to update .country:

// javascript
// country[0].textContent = "India";
// Because .country doesn’t exist in the HTML, this throws an error:

// Uncaught TypeError: Cannot set properties of undefined (setting 'textContent')


// Here’s a simpler explanation:

// 1. (cityName && degree && humidity && country)
// What it checks: This checks if the elements (like .city-name, .degree, etc.) are found in the DOM.
// Use when: You use document.querySelector() to get one element.
// How it works: If the element exists, it is not null, and the condition will pass.
// 2. (cityName.length > 0 && degree.length > 0 && humidity.length > 0 && country.length > 0)
// What it checks: This checks if the collections of elements (like .city-name, .degree) have elements in them (i.e., length is more than 0).
// Use when: You use document.querySelectorAll() or getElementsByClassName() to get multiple elements.
// How it works: If there are any elements found (length > 0), the condition will pass.


    if(data){
         const weatherCondition = data.weather[0].main.toLowerCase();

        let iconPath = "";
        let backgroundImage = "url('photos/newone.jpg')";
         
        if(weatherCondition === "clear"){
            iconPath = "photos/clear.png";
            backgroundImage = "url('photos/clearbackground.jpg')";
        }else if(weatherCondition === "clouds"){
            iconPath = "photos/cloudy.webp";
            backgroundImage = "url('photos/cloudybackground.jpg')";
        }else if(weatherCondition === "rain"){
             iconPath = "photos/rain.jpeg";
             backgroundImage = "url('photos/rainbackground.jpg')";
        }else if(weatherCondition === "snow"){
             iconPath = "photos/snow.jpeg";
             backgroundImage = "url('photos/snowbackground.jpg')";
        }else if(weatherCondition === "thunderstorm"){
             iconPath = "photos/thunderstrom.jpeg";
             backgroundImage = "url('photos/thunderstrombackground.jpg')";
        }else if(weatherCondition === "drizzle"){
             iconPath = "photos/drizzle.jpeg";
             backgroundImage = "url('photos/drizzlebackground.jpg')";
        }else if(weatherCondition === "mist"){
             iconPath = "photos/mist.jpeg";
             backgroundImage = "url('photos/mistbackground.jpg')";
        }else{
            iconPath = "photos/haze.jpeg";
            backgroundImage = "url('photos/hazebackground.jpg')";
        }
        weatherIcon.src = iconPath;
        weatherIcon.alt = data.weather[0].description;
    
       miniContainer.style.backgroundImage = backgroundImage;
       miniContainer.style.backgroundSize = "cover";
       miniContainer.style.backgroundPosition = "center";
       miniContainer.style.backgroundRepeat = "no-repeat";



       const timeZoneOffsetInSeconds = data.timezone;
       const offSetHours = Math.floor(timeZoneOffsetInSeconds/3600);
       const offSetMinutes = Math.abs((timeZoneOffsetInSeconds % 3600) / 60);
       const gmtOffSet = `GMT ${offSetHours >= 0 ? "+" : ""}${offSetHours}:${offSetMinutes.toString().padStart(2, "0")}`;

        // innerHTML:If you use innerHTML, you can include actual HTML elements, like <i>, <b>, or <div> inside the content.
        // textContent:Strictly inserts text without parsing it as HTML. Any HTML tags in the string will be treated as plain text.
        cityName.innerHTML = `${data.name}, ${data.sys.country} <i class="fa-solid fa-location-dot"></i>`;
        // const country = document.createElement("h3");

        degree.textContent = `${data.main.temp}°C`;
        humidity.textContent = `Humidity : ${data.main.humidity}%`;
        wind.textContent = `WindSpeed : ${data.wind.speed}m/s`;
        timeZone.textContent = `TimeZone : ${gmtOffSet}`;
        weatherDescription.textContent = data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1);

        showBlockOrNone();
        notWeatherGetDiv.style.display = "none";
    }
}


function resetStyles(){
    weatherIcon.style.display = "none";
    cityName.style.display = "none";
    country.style.display = "none";
    timeZone.style.display = "none";
    degree.style.display = "none";
    weatherDescription.style.display = "none";
    wind.style.display = "none";
    humidity.style.display = "none";
    notWeatherGetDiv.style.display = "none";
    defaultLayout.style.display = "flex";
    miniContainer.style.backgroundImage = "";
    miniContainer.style.display = "none";
}


function showBlockOrNone(){
    weatherIcon.style.display = "block";
    cityName.style.display = "block";
    country.style.display = "block";
    timeZone.style.display = "block";
    degree.style.display = "block";
    weatherDescription.style.display = "block";
    wind.style.display = "block";
    humidity.style.display = "block";
    defaultLayout.style.display = "none";
    miniContainer.style.display = "flex";
}


async function search(query){
    if(!query.trim()){
        alert("Please enter a city name");
        return;
    }
    await getWeather(query);

}

searchButton.addEventListener("click", (e) => {
    e.preventDefault();
    const query = input.value.trim();
    search(query);
});

// getWeather();