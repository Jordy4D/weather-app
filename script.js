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
        
        tempDisplayToday.textContent = weatherData.currentConditions.temp + "°"
        cityNameTitle.textContent = cityTrimmed[0]
}


async function getForecast(cityDays) {
    const cityForecast = await cityDays

    console.log(cityForecast[0])

    for (let i = 0 ; i < cityForecast.length - 5 ; i++) {
        const div = document.createElement('div')
        div.className = "forecast-box"
        const h2 = document.createElement('h2')
        const h3 = document.createElement('h3')
        h3.className = "forecast-date"
        
        h2.textContent = Math.round(cityForecast[i].tempmax) + "°"
        h3.textContent = convertDate(cityForecast[i].datetime)
        
        forecast.appendChild(div)
        div.appendChild(h2)
        div.appendChild(h3)

    }
    
    // cityForecast.forEach(element => {
    // });
    

}

function convertDate(date) {
    return new Date(date).toLocaleDateString('en-US', {
        day: '2-digit',
        month: '2-digit',
      })
}


getWeatherSubmit.addEventListener('click', (event) => {
    event.preventDefault()
    const newCity = getWeatherInput.value
    unitOfMeasure = getUnitOfMeasure.value

    getWeather(newCity)
})


getWeather(cityPlaceholder);

