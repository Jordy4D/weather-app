const tempDisplayToday = document.getElementById('todays-temp-number')



async function getWeather() {
        const response = await fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Fort%20Wayne%2C%20IN?unitGroup=metric&key=UB7HSQJ56P9RUPG56M8PFDFB3&contentType=json')
        const weatherData = await response.json()
        
        // console.log(weatherData.currentConditions.temp)
        
        tempDisplayToday.textContent = weatherData.currentConditions.temp

}

getWeather();

