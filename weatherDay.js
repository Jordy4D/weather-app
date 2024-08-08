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

    getDailyHours() {
        const hoursArr = [];
        
        this.hours.forEach((element) => {
            let hourNum = parseInt(element.datetime.slice(0,2))
            
            if (hourNum === 0) {
                hoursArr.push(12)
            } else if (hourNum > 12) {
                let x = hourNum - 12
                hoursArr.push(x)
            } else
           
            return hoursArr.push(hourNum);
        })
        return hoursArr
    }
    
        
    

    getCurrentHour() {
        const fullTime = this.hours.datetime
        const hour = parseInt(fullTime.slice(0,2))
        // let output


        if (hour === 0) {
            return 12;
        } else if (hour > 12) {
            return hour - 12

        } else if (hour > 9 && hour < 13) {
            return hour
        } else {
            return hour.substring(1)

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
            return hourlyPrecipArr.push(`${Math.round(obj.precipprob)}%`)
        })
        return hourlyPrecipArr
    }

    // come back to this!!
    getHourlyWindSpeed() {
        const hourlyWindSpeedArr = []
        const hours = this.hours
        hours.forEach((element) => {
            
            return hourlyWindSpeedArr.push(`${Math.round(element.windspeed)}mph`)
        })
        return hourlyWindSpeedArr
    }

    getHourlyWindDir() {
        const hourlyWindDirArr = []
        const hours = this.hours
        hours.forEach((element) => {
            
            return hourlyWindDirArr.push(element.winddir)
        })
        return hourlyWindDirArr
    }

    // get forecast conditions, humidity, high temps, low temps, precipchance, wind, long day, 




}



console.log("weather day script file")