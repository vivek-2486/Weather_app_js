# WeatherDekho 🌦️

WeatherDekho is a weather application built using HTML, CSS, and Vanilla JavaScript. It allows users to check real-time weather information for any city and also fetches weather data for the user's current location using the browser's Geolocation API.

## Features

* Search weather by city name
* Get weather for your current location
* Display temperature, humidity, and wind speed
* Weather condition descriptions and icons
* Live digital clock
* Smooth scrolling navigation
* Default weather cards for major cities
* Error handling for invalid city names
* Responsive and user-friendly interface

## Technologies Used

* HTML5
* CSS3
* JavaScript (ES6+)
* Fetch API
* Geolocation API
* OpenStreetMap Nominatim API (Geocoding)
* Open Weather API (via RapidAPI)

## Screenshots

### Home Page

![Home Page](images/Screenshot%202026-05-31%20135216.png)

### Default Locations

![Default Locations](images/Screenshot%202026-05-31%20135238.png)
## Installation

1. Clone the repository:

```bash
git clone <repository-url>
```

2. Open the project folder.

3. Add your API key in `script.js`:

```javascript
'x-rapidapi-key': 'YOUR_API_KEY'
```

4. Open `index.html` in your browser.

## How It Works

1. Enter a city name and press **Enter** or click **Search**.
2. The city is converted into latitude and longitude coordinates using the Nominatim Geocoding API.
3. Weather data is fetched using the Open Weather API.
4. Results are displayed dynamically on the page.
5. Users can also allow location access to view weather information for their current location.

## Future Improvements

* Multi-day weather forecast
* Temperature unit conversion (°C / °F)
* Weather charts and graphs
* Dark mode
* Better mobile responsiveness

## Author

Built by Vivek as a JavaScript learning project.


