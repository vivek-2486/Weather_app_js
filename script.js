let weather_url = 'https://open-weather13.p.rapidapi.com/fivedaysforcast?'
let geoCoding_url_1 = `https://nominatim.openstreetmap.org/search?city=`;
let geoCoding_url_2 = `&format=json&limit=1`;
console.log("hola")

const icon_url = `https://openweather.site/img/wn/`
let cityEntered = document.querySelector(".search-box")
let searchButton = document.querySelector(".search-button")
let searchNavButton = document.querySelector(".search-button-nav");

searchNavButton.addEventListener("click" ,() =>{
    cityEntered.scrollIntoView({
        behavior: "smooth",
        block:"center"
    });
       setTimeout(()=>{
        cityEntered.focus();
       },500); 
    }
)
cityEntered.addEventListener("keydown", (
    (e) => {
        if (e.key === "Enter") {
            getWeather()
        }
    }
))
searchButton.addEventListener("click",getWeather);

getCurrentLocationWeather()
getWeatherDefault(document.querySelector(".location-name-1"),1);
getWeatherDefault(document.querySelector(".location-name-2"),2);
getWeatherDefault(document.querySelector(".location-name-3"),3);

async function getLat(city) {
    //console.log(loca);
    let geoCoding_url = `${geoCoding_url_1}${city}${geoCoding_url_2}`
    let geoCodingXml = await fetch(geoCoding_url)
    let geoCodingData = await geoCodingXml.json()
    console.log(geoCodingData)
    if (!geoCodingData.length) {
        alert(`City ${city} not found`);
        throw new Error(`City "${city}" not found`);
    }
    return [geoCodingData[0].lat, geoCodingData[0].lon];
}


const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': 'Your_Api_Key',
        'x-rapidapi-host': 'open-weather13.p.rapidapi.com',
        'Content-Type': 'application/json'
    }
};

async function getWeather() {
    try {
        let location = await getLat(cityEntered.value);
        const weather_url_final = `${weather_url}latitude=${location[0]}&longitude=${location[1]}&lang=EN`;
        let response = await fetch(weather_url_final, options)
        let result = await response.json()
        console.log(result);
        let sequenceNum = 2;
        addHtml(result, sequenceNum)
    } catch (error) {
        console.error(error);
    }
}

function getCurrentLocation() {
    return new Promise((resolve, reject) => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;

                    console.log(`lati ${latitude} longi ${longitude}`);
                    resolve([latitude, longitude]);
                },
                (error) => {
                    reject(error)
                }
            )
        } else {
            reject("geolocation not possible for this browser");
        }
    })
}
async function getCurrentLocationWeather() {
    try {
        const currentLocation = await getCurrentLocation();
        console.log(currentLocation)
        const weather_url_final = `${weather_url}latitude=${currentLocation[0]}&longitude=${currentLocation[1]}&lang=EN`;
        let response = await fetch(weather_url_final, options)
        let result = await response.json()
        console.log(result);
        let sequenceNum = 0;
        addHtml(result, sequenceNum)

    } catch (error) {
        console.error(error);
    }
}

function startTime() {
    const today = new Date()
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();

    m = checkTime(m);
    s = checkTime(s);
    if (!document.querySelector(".live-clock")) return
    document.querySelector(".live-clock").textContent = h + ":" + m + ":" + s;

}

setInterval(startTime, 1000);

function checkTime(i) {
    if (i < 10) { i = "0" + i };
    return i;
}



async function getWeatherDefault(city,i) {
    try {
        console.log(city)
        let location = await getLat(city.textContent);
        const weather_url_final = `${weather_url}latitude=${location[0]}&longitude=${location[1]}&lang=EN`;
        let response = await fetch(weather_url_final, options)
        let result = await response.json()
        let seqNum = 1;
        addHtml(result,seqNum,i);
    } catch (error) {
        console.error(error);
    }

}

function addHtml(data, seqNum,defCity) {
    if (seqNum === 0) {
        const icon = `${icon_url}${data.list[0].weather[0].icon}.png`
        // console.log(data.city.name)
        let el = document.querySelector(".currentLocation");
        el.innerHTML = `
        <h3>Weather at your Location</h3>
        <img src="${icon}"alt="weather icon">
        <p class="location-name"> ${data.city.name}, ${data.city.country} </p>
        <p class="location-temp"> ${Math.round(data.list[0].main.temp - 273)} &#8451;</p>
        <p class="location-min-max"> ${Math.round(data.list[0].main.temp_min - 273)}/${Math.round(data.list[0].main.temp_max - 273)} &#8451;</p>
        <p class="location-weather-desc"> ${data.list[0].weather[0].description}</p>
        <P class="location-wind-speed">Wind Speed - ${data.list[0].wind.speed} M/s</p>
        <p class="location-humidity"> Humidity - ${data.list[0].main.humidity} </p>
        <p class="live-clock"> </p>
        `;
        startTime();
    } else if (seqNum == 1) {
            let el = document.querySelector(`#default-location-${defCity}`)
            const icon = `${icon_url}${data.list[0].weather[0].icon}.png`
            el.innerHTML = `
                <img src="${icon}"alt="weather icon">
                <p class="location-name"> ${data.city.name}, ${data.city.country} </p>
                <p class="location-temp"> ${Math.round(data.list[0].main.temp - 273)} &#8451;</p>
                <p class="location-min-max"> ${Math.round(data.list[0].main.temp_min - 273)}/${Math.round(data.list[0].main.temp_max - 273)} &#8451;</p>
                <p class="location-weather-desc"> ${data.list[0].weather[0].description}</p>
                <P class="location-wind-speed">Wind Speed - ${data.list[0].wind.speed} M/s</p>
                <p class="location-humidity"> Humidity - ${data.list[0].main.humidity} </p>
            `
        
    } else if(seqNum == 2){
        let el = document.querySelector(".searched-location");
        const icon = `${icon_url}${data.list[0].weather[0].icon}.png`
        el.innerHTML = `
        <h3> Weather at ${cityEntered.value} </h3>
        <img src="${icon}"alt="weather icon">
        <p class="location-name"> ${data.city.name}, ${data.city.country} </p>
        <p class="location-temp"> ${Math.round(data.list[0].main.temp - 273)} &#8451;</p>
        <p class="location-min-max"> ${Math.round(data.list[0].main.temp_min - 273)}/${Math.round(data.list[0].main.temp_max - 273)} &#8451;</p>
        <p class="location-weather-desc"> ${data.list[0].weather[0].description}</p>
        <P class="location-wind-speed">Wind Speed - ${data.list[0].wind.speed} M/s</p>
        <p class="location-humidity"> Humidity - ${data.list[0].main.humidity} </p>
        <p class="live-clock"> </p>
        `
        el.classList.remove("hidden")
        el.scrollIntoView({
            behavior:"smooth"
        });
    }
}
