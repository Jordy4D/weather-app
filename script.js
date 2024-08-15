import WeatherByDay from "./weatherDay.js"

const dateDiv = document.getElementById('time-display')
const cityNameTitle = document.getElementById('city-title')
const conditionsDesc = document.getElementById('weather-description')
const conditionIcon = document.getElementById('condition-icon')
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

let currentDay = 0
let currentConditionChoice = 'temp'
let cityPlaceholder = "Fort Wayne IN"
let unitOfMeasure = "us"
let weatherDescription

// will eventually change
// async function weatherInit(city) {
    
// }

let _10DayForcast = []

// should probably just make this a factory
async function getWeather(city) {
        _10DayForcast = []
        forecast.innerHTML = ''

        if (unitOfMeasure === null) {
            console.log("get unit error")
        }


        const response = await fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/' + city + '?unitGroup=' + unitOfMeasure + '&key=UB7HSQJ56P9RUPG56M8PFDFB3&contentType=json')
        const weatherData = await response.json()
        
        console.log(weatherData)
        
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

        // weatherDescription = 

        
        console.log(_10DayForcast[0].getHourlyWindSpeed())
        
        
        
        const weatherDays = weatherData.days
        const todaysHours = weatherData.days[0].hours
        const getTodaysPrecip = await weatherData.days[0].precipprob
        const hourlyPrecip = [];
        const hourlyWind = [];
        
        dateDiv.textContent = `Current Local Time: ${getTime(today)}`
        
        conditionsDesc.textContent = '' 
        conditionsDesc.textContent = `${_10DayForcast[0].description}`;

        getHourly(_10DayForcast[currentDay], currentConditionChoice)
        // forecast.innerHTML = ''

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
    
    let cityTrimmed = cityDays.resolvedAddress.split(", ")
    
    console.log(cityTrimmed.pop())
    console.log(cityTrimmed.join(", "))

    
    cityNameTitle.textContent = cityTrimmed.join(", ")
    const weatherIcon = document.createElement('img')
    TEMPDISPLAYTODAY.textContent = Math.round(cityDays.currentConditions.temp) + "°"
    weatherIcon.src = `./assets/${cityDays.currentConditions.icon}.png`
    TODAYWEATHERICON.appendChild(weatherIcon)
    
    TEMPCURRENTPRECIP.textContent = Math.round(cityDays.currentConditions.precipprob) + "%"
    TEMPCURRENTHUMIDITY.textContent = Math.round(cityDays.currentConditions.humidity) + "%"
    TEMPDISPLAYWIND.textContent = Math.round(cityDays.currentConditions.windspeed) + "mph"

}


async function getForecast(arr) {
    forecast.innerHTML = ''
    const cityForecast = await arr
    // console.log(cityForecast[0])
    
    for (let i = 1 ; i < cityForecast.length - 4 ; i++) {
        
        buildForecastCard(arr[i], i)
        
        
    }
    
    const forecastDays = document.querySelectorAll("#forecast-box")
    
    forecastDays.forEach((element) => {
        element.addEventListener('click', (e) => {
            currentDay = e.target.closest('div.forecast-box').getAttribute('index') - 1 


            
            getHourly(_10DayForcast[currentDay], currentConditionChoice)
            // console.log(e.target.closest('div.forecast-box').getAttribute('index'))
            
            // console.log(arr.indexOf.call('div.forecast-box', e.target.data))
            
            // getHourly(_10DayForcast[target.index], 'temp')
            console.log('currentDay is: ' + currentDay)
            console.log(_10DayForcast[currentDay].icon)
        })    
    })
    
    const icon = document.createElement('img')
    icon.src = `./assets/${_10DayForcast[currentDay].icon}.png`
    conditionIcon.appendChild(icon)
    
    conditionsDesc.textContent = ''
    conditionsDesc.textContent = _10DayForcast[currentDay].description
    

}


function buildForecastCard(city, index) {
    const cardDiv = document.createElement('div')
    cardDiv.className = "forecast-box"
    cardDiv.id = "forecast-box"
    cardDiv.setAttribute('index', index)
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
        const icon = document.createElement('img')
        icon.className = "hourly-weather-icon"
        
        hourlyDiv.setAttribute('title', `${convertTimeToHour(hourObj.datetime)} / ${Math.round(hourObj.temp)}°`)
        hourlyTime.textContent = convertTimeToHour(`${hourObj.datetime}`)
        conditionSpan.textContent = `${Math.round(hourObj.temp)}°`
        conditionSpan.className = "hourly-condition temp-condition"
        icon.src = `./assets/${hourObj.icon}.png`
        hourlyDiv.appendChild(icon)

    } else if (condition === 'precip') {
        const iconDiv = document.createElement('div')
        const icon = document.createElement('img')
        icon.className = "hourly-weather-icon"
        // const hourlyIcon = hourObj.icon
        hourlyDiv.setAttribute('title', `${convertTimeToHour(hourObj.datetime)} / ${Math.round(hourObj.precipprob)}% Chance`)
        hourlyTime.textContent = convertTimeToHour(`${hourObj.datetime}`)
        conditionSpan.textContent = `${Math.round(hourObj.precipprob)}%`
        
        if (hourObj.preciptype === null) {
            icon.src = `./assets/clear-day.png`
        
        } else if (hourObj.preciptype[0] === 'rain') {
            icon.src = `./assets/rain.png`
        }

        // icon.src = `./assets/${hourObj.icon}.png`
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

function getTime(date) {
    return new Date(date).toLocaleTimeString('en-US', {
        hour: "numeric", 
        minute: "2-digit",
        hour12: "true"
    })
}


getWeatherSubmit.addEventListener('click', (event) => {
    forecast.innerHTML = ''
    event.preventDefault()
    const newCity = getWeatherInput.value
    unitOfMeasure = getUnitOfMeasure.value

    getWeather(newCity)
    // weatherInit(newCity) <-- use this eventually
    // weatherInit(cityPlaceholder)

})

hourlyChoiceTemp.addEventListener('click', (event) => {
    console.log(event)
    hourlyChoiceTemp.classList.add('condition-highlight')
    hourlyChoicePrecip.classList.remove('condition-highlight')
    hourlyChoiceWind.classList.remove('condition-highlight')
    currentConditionChoice = 'temp'
    getHourly(_10DayForcast[currentDay], currentConditionChoice)

})


hourlyChoicePrecip.addEventListener('click', () => {
    console.log("precip")
    hourlyChoiceTemp.classList.remove('condition-highlight')
    hourlyChoicePrecip.classList.add('condition-highlight')
    hourlyChoiceWind.classList.remove('condition-highlight')
    currentConditionChoice = 'precip'
    getHourly(_10DayForcast[currentDay], currentConditionChoice)


})


hourlyChoiceWind.addEventListener('click', () => {
    console.log("wind")
    hourlyChoiceTemp.classList.remove('condition-highlight')
    hourlyChoicePrecip.classList.remove('condition-highlight')
    hourlyChoiceWind.classList.add('condition-highlight')
    currentConditionChoice = 'wind'
    getHourly(_10DayForcast[currentDay], currentConditionChoice)

})

