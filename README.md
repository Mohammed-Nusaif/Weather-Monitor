_**Real-Time Weather Monitoring System**_

**Description:**

This project is a real-time weather monitoring application that fetches weather data from the OpenWeatherMap API for different metro cities in India. The app processes and displays weather conditions, along with daily summaries and configurable alerts when weather thresholds are breached.

**Features:**

Real-time weather data retrieval from OpenWeatherMap API.
Conversion of temperatures from Kelvin to Celsius.
Display of weather conditions for major Indian cities: Delhi, Mumbai, Chennai, Bangalore, Kolkata, Hyderabad.
Daily weather summaries (average, max, min temperatures, and dominant weather condition).
Threshold-based alerting for specific weather conditions (e.g., temperature exceeding 35°C).
Simple visualization of daily weather summaries and triggered alerts.

**Design Choices:**

Frontend: Built using HTML, CSS, and JavaScript.
API: OpenWeatherMap API is used to fetch live weather data.
Data Processing: JavaScript functions are used to process weather data and calculate rollups like daily averages, max/min temperatures, and detect thresholds for alerts.
Alerting System: The app monitors weather conditions and triggers alerts based on user-defined thresholds.
Visualization: Basic visualization of weather summaries and alert notifications are provided using standard HTML and CSS.

**Build Instructions:**

Clone the Repository:

**git clone https://github.com/Mohammed-Nusaif/Weather-Monitor.git**
**cd Weather-Monitor**

**Open the Project:** 

Since the app is built with HTML, CSS, and JavaScript, you can run it directly in a web browser.

Open the index.html file in your browser.

API Key Setup:
Sign up for a free API key at [ OpenWeatherMap](https://openweathermap.org/).
Replace the placeholder YOUR_API_KEY in the JavaScript code with your actual API key.

Example:
javascript
Copy code
const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key

**Configuration:**

You can configure the data update interval and weather thresholds in the JavaScript code.
Default settings are provided for fetching data every 5 minutes and setting temperature alerts at 35°C.

**Dependencies:**

OpenWeatherMap API: The app retrieves live weather data from the OpenWeatherMap API. You need an API key to access the service.

**How to Run Tests:**

Open the console in your browser's developer tools.
Simulate different weather conditions and thresholds to verify the alerting mechanism and weather data processing.

**Future Enhancements:**

Add support for additional weather parameters like humidity and wind speed.
Improve data visualization using charts.
Implement email notifications for triggered alerts.
