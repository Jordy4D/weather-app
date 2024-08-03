const cityNameTitle = document.getElementById('city-title')
const tempDisplayToday = document.getElementById('todays-temp-number')
const forecast = document.getElementById('forecast-container')

const getWeatherSubmit = document.getElementById('search-input')
const getWeatherInput = document.getElementById('get-location')
const getUnitOfMeasure = document.getElementById('weather-unit')

let cityPlaceholder = "Fort Wayne IN"
let unitOfMeasure = "us"

async function getWeather(city) {
    
        if (unitOfMeasure === null) {
            console.log("get unit error")
        }


        const response = await fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/' + city + '?unitGroup=' + unitOfMeasure + '&key=UB7HSQJ56P9RUPG56M8PFDFB3&contentType=json')
        const weatherData = await response.json()
        const cityTrimmed = weatherData.resolvedAddress.split(", ").map(function(item) {
            return item.trim()
        })

        getForecast(weatherData.days)
        console.log(weatherData.days)

        console.log(weatherData)
        
        tempDisplayToday.textContent = Math.round(weatherData.currentConditions.temp) + "°"
        cityNameTitle.textContent = cityTrimmed[0]
}


async function getForecast(city) {
    const cityForecast = await city
    forecast.innerHTML = ''
    console.log(cityForecast[0])

    for (let i = 1 ; i < cityForecast.length - 4 ; i++) {
        const cardDiv = document.createElement('div')
        cardDiv.className = "forecast-box"
        const tempsDiv = document.createElement('div')
        const daySpan = document.createElement('span')
        const highTempSpan = document.createElement('span')
        const lowTempSpan = document.createElement('span')

        tempsDiv.className = "temps-box"
        daySpan.className = "forecast-date"
        highTempSpan.className = "forecast-high"
        lowTempSpan.className = "forecast-low"

        
        daySpan.textContent = convertDate(cityForecast[i].datetime)
        highTempSpan.textContent = Math.round(cityForecast[i].tempmax) + "°"
        lowTempSpan.textContent = Math.round(cityForecast[i].tempmin) + "°"
        

        forecast.appendChild(cardDiv)
        cardDiv.appendChild(daySpan)
        cardDiv.appendChild(tempsDiv)
        tempsDiv.appendChild(highTempSpan)
        tempsDiv.appendChild(lowTempSpan)


    }
    
    // cityForecast.forEach(element => {
    // }); 

}

async function getTodaysPrecip(city) {

}

async function getForecastPrecip(city) {

}

function convertDate(date) {
    return new Date(date).toLocaleDateString('en-US', {
        weekday: 'short',
        // day: 'short',
        // month: 'short',
      })
}


getWeatherSubmit.addEventListener('click', (event) => {
    event.preventDefault()
    const newCity = getWeatherInput.value
    unitOfMeasure = getUnitOfMeasure.value

    getWeather(newCity)
})


getWeather(cityPlaceholder);

