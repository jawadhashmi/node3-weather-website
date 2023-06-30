const request = require('request')

const geocode = (address, callback) =>{
    const muscat_url = 'http://api.weatherstack.com/current?access_key=bca5a59f69abeff13523171cc1829c6c&query=' + encodeURIComponent(address)
    request({url: muscat_url, json: true}, (error, response) => {
        if(error){
            callback('Unable to connect to weather service.', undefined)
        //}else if(response.body.error){
        }else if(response.body.error){
            callback('Unable to find the location.', undefined)           
        }else{
            console.log(response.body.current.weather_descriptions[0] + '. It is currently ' +  response.body.current.temperature + ' degrees out. It feels like ' + response.body.current.feelslike + ' degrees out.')
            callback(undefined,{
                weather: response.body.current.weather_descriptions[0],
                temerature: response.body.current.temperature,
                feelslike: response.body.current.feelslike 
            })
        }
    })
}

module.exports = geocode