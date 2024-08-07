export default class WeatherByDay {
    constructor(conditions,
                datetime,
                description,
                hours,
                humidity,
                icon,
                precip,
                precipprob,
                preciptype,
                temp,
                tempmax,
                tempmin,
                winddir,
                windspeed
            ) {

                this.conditions = conditions;
                this.datetime = datetime;
                this.description = description;
                this.hours = hours;
                this.humidity = humidity;
                this.icon = icon;
                this.precip = precip;
                this.precipprob = precipprob;
                this.preciptype = preciptype;
                this.temp = temp;
                this.tempmax = tempmax;
                this.tempmin = tempmin;
                this.winddir = winddir;
                this.windspeed = windspeed;
    // this.currentDate = currentDate;
    //                 this.currentTemp = currentTemp;
    //                 this.currentConditions = currentConditions;
    //                 this.currentConditionsIcon = currentConditionsIcon;
    //                 this.currentPrecipChance = currentPrecipChance;
    //                 this.currentHumidity = currentHumidity;
    //                 this.hourlyTemp = hourlyTemp;
    //                 this.hourlyPrecip = hourlyPrecip;
    //                 this.hourlyWind = hourlyWind;
    //                 this.forecastIcon = forecastIcon;
    //                 this.forecastHighTemp = forecastHighTemp;
    //                 this.foreCastLowTemp = foreCastLowTemp;
    //                 this.forecastHourlyTemp = forecastHourlyTemp;
    //                 this.forecastHourlyPrecip = forecastHourlyPrecip;
    //                 this.forecastHourlyWind = forecastHourlyWind;
    }

    getLongDayName() {
        return new Date(this.datetime).toLocaleDateString('en-US', {
            weekday: 'long',
            // day: 'short',
            // month: 'short',
          })
    }

    getShortDayName() {
        return new Date(this.datetime).toLocaleDateString('en-US', {
            weekday: 'short',
            // day: 'short',
            // month: 'short',
          })
    }

    getCurrentHour() {
        const fullTime = this.datetime
        const hours = fullTime.slice(0,2)
        // let output


        if (hours === 0) {
            return 12;
        }
        if (hours > 12) {
            return hours - 12

        } else if (hours > 9 && hours < 13) {
            
            return hours
        } else {
            return hours.substring(1)

        }
    }

    getDayConditions() {
        return this.conditions
    }

    getHourlyTemp() {
        const hourlyTempArr = []
        const hours = this.hours
        hours.forEach((obj) => {
            return hourlyTempArr.push(obj.temp)
        })
        return hourlyTempArr
    }

    getHourlyPrecip() {
        const hourlyPrecipArr = []
        const hours = this.hours
        hours.forEach((obj) => {
            return hourlyPrecipArr.push(obj.precipprob)
        })
        return hourlyPrecipArr
    }

    // come back to this!!
    // getHourlyWind() {
    //     // const hourlyWindArr = []
    //     const hours = this.hours
    //     const hourlyWindArr = hours.map((element) => {
            
    //         return ({winddir: element.winddir, windspeed: element.windspeed})
    //     })
    //     return hours
    // }

    // get forecast conditions, humidity, high temps, low temps, precipchance, wind, long day, 

}



console.log("weather day script file")