import WeatherByDay from "./weatherDay.js"

const cityNameTitle = document.getElementById('city-title')
const TODAYWEATHERICON = document.getElementById('todays-weather-icon')
const TEMPDISPLAYTODAY = document.getElementById('todays-temp-number')
const TEMPCURRENTPRECIP = document.querySelector('#today-current-precip')
const TEMPCURRENTHUMIDITY = document.querySelector('#today-current-humidity')
const TEMPDISPLAYWIND = document.querySelector('#today-current-wind')

const hourly = document.getElementById('hourly-container')
const hourlyHours = document.getElementById('hourly-hours')
const forecast = document.getElementById('forecast-container')

const getWeatherSubmit = document.getElementById('search-input')
const getWeatherInput = document.getElementById('get-location')
const getUnitOfMeasure = document.getElementById('weather-unit')

const hourlyChoiceTemp = document.getElementById('hourly-choice-temp')
const hourlyChoicePrecip = document.getElementById('hourly-choice-precip')
const hourlyChoiceWind = document.getElementById('hourly-choice-wind')

const today = new Date()
const tomorrow = new Date()
tomorrow.setDate(tomorrow.getDate() + 1)


let cityPlaceholder = "Fort Wayne IN"
let unitOfMeasure = "us"

// will eventually change
// async function weatherInit(city) {
    
// }

let _10DayForcast = []

// should probably just make this a factory
async function getWeather(city) {
    
        if (unitOfMeasure === null) {
            console.log("get unit error")
        }


        const response = await fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/' + city + '?unitGroup=' + unitOfMeasure + '&key=UB7HSQJ56P9RUPG56M8PFDFB3&contentType=json')
        const weatherData = await response.json()
        
        
        
        weatherData.days.forEach((obj) => {
            const refinedWeatherArr = new WeatherByDay(  obj.conditions,
                                            obj.datetime,
                                            obj.description,
                                            obj.hours,
                                            obj.humidity,
                                            obj.icon,
                                            obj.precip,
                                            obj.precipprob,
                                            obj.preciptype,
                                            obj.temp,
                                            obj.tempmax,
                                            obj.tempmin,
                                            obj.winddir,
                                            obj.windspeed

            ) 

            _10DayForcast.push(refinedWeatherArr)
            // console.log(refinedWeatherArr)
        })

        console.log(_10DayForcast[0].getHourlyWindSpeed())



        const weatherDays = weatherData.days
        const todaysHours = weatherData.days[0].hours
        const getTodaysPrecip = await weatherData.days[0].precipprob
        const hourlyPrecip = [];
        const hourlyWind = [];

        

        getHourly(_10DayForcast[0], 'precip')
        getForecast(_10DayForcast)
        
        console.log(_10DayForcast[0].getDailyHours())
        console.log(weatherDays)
        console.log(todaysHours)
        console.log("today's Hourly Precip is: " + _10DayForcast[0].getHourlyPrecip())
       
        buildCurrentWeatherCard(weatherData)

        // const weatherIcon = document.createElement('img')
        // weatherIcon.src = weatherData.currentConditions.icon
        // TEMPDISPLAYTODAY.textContent = Math.round(weatherData.currentConditions.temp) + "°"
        // cityNameTitle.textContent = cityTrimmed[0]


}

getWeather(cityPlaceholder);



function buildCurrentWeatherCard(cityDays) {
    TODAYWEATHERICON.innerHTML = ''
    
    const cityTrimmed = cityDays.resolvedAddress.split(", ").map(function(item) {
        return item.trim()
    })
    
    cityNameTitle.textContent = cityTrimmed[0]
    const weatherIcon = document.createElement('img')
    TEMPDISPLAYTODAY.textContent = Math.round(cityDays.currentConditions.temp) + "°"
    weatherIcon.src = `./assets/${cityDays.currentConditions.icon}.png`
    TODAYWEATHERICON.appendChild(weatherIcon)
    
    TEMPCURRENTPRECIP.textContent = Math.round(cityDays.currentConditions.precipprob) + "%"
    TEMPCURRENTHUMIDITY.textContent = Math.round(cityDays.currentConditions.humidity) + "%"
    TEMPDISPLAYWIND.textContent = Math.round(cityDays.currentConditions.windspeed) + "mph"

}


async function getForecast(arr) {
    const cityForecast = await arr
    forecast.innerHTML = ''
    // console.log(cityForecast[0])

    for (let i = 1 ; i < cityForecast.length - 4 ; i++) {

        buildForecastCard(arr[i])
        
    }   

}

function buildForecastCard(city) {
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

    
    daySpan.textContent = convertForecastDate(city.datetime)
    icon.src = `./assets/${city.icon}.png`
    highTempSpan.textContent = Math.round(city.tempmax) + "°"
    lowTempSpan.textContent = Math.round(city.tempmin) + "°"
    

    forecast.appendChild(cardDiv)
    cardDiv.appendChild(daySpan)
    cardDiv.appendChild(icon)
    cardDiv.appendChild(tempsDiv)
    tempsDiv.appendChild(highTempSpan)
    tempsDiv.appendChild(lowTempSpan)
}


async function getTodaysPrecip(city) {

}

async function getHourly(obj, condition) {

    const cityHourly = await obj.hours
    hourly.innerHTML = ''
    hourlyHours.innerHTML = ''
    
    if (condition === 'temp') {
        cityHourly.forEach((element) => {
            return buildHourlyCard(element, 'temp')
    
        })

    } else if (condition === 'precip') {
        cityHourly.forEach((element) => {
            return buildHourlyCard(element, 'precip')
    
        })
    } else if (condition === 'wind') {
        cityHourly.forEach((element) => {
            return buildHourlyCard(element, 'wind')
    
        })
    }


    // for (let i = 0 ; i <= cityHourly.length ; i++) { 
        

    // }
}

function getDailyForecastHours() {

}


function buildHourlyCard(hourObj, condition) {
    // const cardDiv = document.createElement('div')
    // cardDiv.className = "hourly-box"
    const hourlyDiv = document.createElement('div')
    hourlyDiv.className = "hourly-box"
    
    const hourlyTime = document.createElement('span')
    hourlyTime.className = "hourly-box-hour no-display"
    
    
    const conditionSpan = document.createElement('span')
    conditionSpan.className = "hourly-condition"
    
    const timeDiv = document.createElement('div')
    timeDiv.className = "hourly-legend"

    // const precipSpan = document.createElement('span')
    
    // precipSpan.className = "hourly-precip"
    hourly.appendChild(hourlyDiv)
    
    if (condition === 'temp') {
        hourlyDiv.setAttribute('title', `${convertTimeToHour(hourObj.datetime)} / ${Math.round(hourObj.temp)}°`)
        hourlyTime.textContent = convertTimeToHour(`${hourObj.datetime}`)
        conditionSpan.textContent = `${Math.round(hourObj.temp)}°`
        conditionSpan.className = "hourly-condition temp-condition"

    } else if (condition === 'precip') {
        const iconDiv = document.createElement('div')
        const icon = document.createElement('img')
        icon.className = "hourly-weather-icon"
        // const hourlyIcon = hourObj.icon
        hourlyDiv.setAttribute('title', `${convertTimeToHour(hourObj.datetime)} / ${Math.round(hourObj.precipprob)}% Chance`)
        hourlyTime.textContent = convertTimeToHour(`${hourObj.datetime}`)
        conditionSpan.textContent = `${Math.round(hourObj.precipprob)}%`

        icon.src = `./assets/${hourObj.icon}.png`

        hourlyDiv.appendChild(icon)
        

    } else if (condition === 'wind') {
        hourlyDiv.setAttribute('title', `${convertTimeToHour(hourObj.datetime)} / ${Math.round(hourObj.windspeed)}mph Wind Speed`)
        hourlyTime.textContent = convertTimeToHour(`${hourObj.datetime}`)
        conditionSpan.textContent = `${Math.round(hourObj.windspeed)}mph`
        conditionSpan.className = "hourly-condition"
        
        // const iconDiv = document.createElement('div')
        const icon = document.createElement('p')
        icon.textContent = "↓"
        icon.style.transform = `rotate(${hourObj.winddir}deg)`
        hourlyDiv.appendChild(icon)
    }

    // icon.src = `./assets/${hourObj.icon}.png`

    // hourly.appendChild(cardDiv)
    hourlyHours.appendChild(timeDiv)
    timeDiv.appendChild(hourlyTime)
    hourlyDiv.appendChild(conditionSpan)
}
    


function convertTimeToHour(datetime) {
    const fullDateTime = datetime
    const hours = fullDateTime.slice(0,2)
    // let output

    if (hours === "00") {
        return "12am"
    } else if (hours === "12") {
        return "12pm"
    } else if (hours > 12) {
        return `${hours - 12}pm`

    } else if (hours > 9 && hours < 13) {
        
        return `${hours}am`
    } else {
        return `${hours.substring(1)}am`

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

    // weatherInit(newCity) <-- use this eventually
    weatherInit(cityPlaceholder)

})

hourlyChoiceTemp.addEventListener('click', (event) => {
    console.log(event)
    getHourly(_10DayForcast[0], 'temp')

})


hourlyChoicePrecip.addEventListener('click', () => {
    console.log("precip")
    getHourly(_10DayForcast[0], 'precip')


})


hourlyChoiceWind.addEventListener('click', () => {
    console.log("wind")
    getHourly(_10DayForcast[0], 'wind')

})



