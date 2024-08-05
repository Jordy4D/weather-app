const cityNameTitle = document.getElementById('city-title')
const tempDisplayToday = document.getElementById('todays-temp-number')
const todayWeathericon = document.getElementById('todays-weather-icon')
const hourly = document.getElementById('hourly-container')
const forecast = document.getElementById('forecast-container')

const getWeatherSubmit = document.getElementById('search-input')
const getWeatherInput = document.getElementById('get-location')
const getUnitOfMeasure = document.getElementById('weather-unit')

const today = new Date()
const tomorrow = new Date()
tomorrow.setDate(tomorrow.getDate() + 1)


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

        getTodaysHourly(weatherData.days[0].hours)
        getForecast(weatherData.days)
        
        console.log(weatherData)
        console.log(weatherData.days)
        console.log(weatherData.days[0].hours)
        
        const weatherIcon = document.createElement('img')
        weatherIcon.src = weatherData.currentConditions.icon
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
        const icon = document.createElement('img')
        const highTempSpan = document.createElement('span')
        const lowTempSpan = document.createElement('span')

        tempsDiv.className = "temps-box"
        daySpan.className = "forecast-date"
        icon.className = "weather-icon"
        highTempSpan.className = "forecast-high"
        lowTempSpan.className = "forecast-low"

        
        daySpan.textContent = convertForecastDate(cityForecast[i].datetime)
        icon.src = `./assets/${cityForecast[i].icon}.png`
        highTempSpan.textContent = Math.round(cityForecast[i].tempmax) + "°"
        lowTempSpan.textContent = Math.round(cityForecast[i].tempmin) + "°"
        

        forecast.appendChild(cardDiv)
        cardDiv.appendChild(daySpan)
        cardDiv.appendChild(icon)
        cardDiv.appendChild(tempsDiv)
        tempsDiv.appendChild(highTempSpan)
        tempsDiv.appendChild(lowTempSpan)


    }   

}

async function getTodaysPrecip(city) {

}

async function getTodaysHourly(city) {
    const cityHourly = await city
    hourly.innerHTML = ''
    
    for (let i = 0 ; i <= cityHourly.length ; i++) { 
        //** Fix condition to pull from tomorrow's ^^^^^data in the afternoon 
        const cardDiv = document.createElement('div')
        cardDiv.className = "hourly-box"
        const hourlyDiv = document.createElement('div')
        const tempSpan = document.createElement('span')
        const precipSpan = document.createElement('span')
        const iconDiv = document.createElement('div')
        const icon = document.createElement('img')
        // const hourlyIcon = cityHourly[i].icon
        
        hourlyDiv.className = "hourly-box"
        tempSpan.className = "hourly-temp"
        precipSpan.className = "hourly-precip"
        // icon.className = "weather-icon"


        hourlyDiv.textContent = convertTimeToHours(cityHourly[i].datetime)
        tempSpan.textContent = Math.round(cityHourly[i].temp) + "°"
        // icon.src = `./assets/${cityHourly[i].icon}.png`

        hourly.appendChild(cardDiv)
        cardDiv.appendChild(hourlyDiv)
        cardDiv.appendChild(icon)
        cardDiv.appendChild(tempSpan)


    }


}

function getNext48Hours(dateA, dateB) {
    
    let currentHour = today.getHours()
    let todayHoursArr = dateA.hours.map(function(obj) {
        
        return obj.datetime
    })

    let tomorrowHoursArr = dateB.hours.map(function(obj) {
        return obj.datetime
    })
    // today. + convertTimeToHours(tomorrow.datetime)
    
    // hours.splice(hours.indexOf(0), 1, 12)
    // let newArr = tomorrowHoursArr.push(todayHoursArr)

    return console.log(todayHoursArr.concat(tomorrowHoursArr))
}

function convertTimeToHours(time) {
    const fullTime = time
    const hours = fullTime.slice(0,2)
    // let output


    if (hours > 12) {
        return hours - 12

    } else if (hours > 9 && hours < 13) {
        
        return hours
    } else {
        return hours.substring(1)

    }
}

async function getForecastPrecip(city) {

}

function convertForecastDate(date) {
    return new Date(date).toLocaleDateString('en-US', {
        weekday: 'short',
        // day: 'short',
        // month: 'short',
      })
}

function convertHourlyDate(date) {
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

