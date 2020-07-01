const request = require('request')

const forecast = (ke,callback) =>{
    const url='http://dataservice.accuweather.com/forecasts/v1/daily/1day/'+ke+'?apikey=9AdmGH32FOAsmItg2RT7QiTYEzopADAJ'
    request({url,json:true},(error,response) =>{
        if(error){
            callback('unable to connect to API',undefined)
        }else{
            callback(undefined,{
                summary:response.body.Headline.Text,
                 maxtemp:response.body.DailyForecasts[0].Temperature.Maximum.Value,
                 mintemp:response.body.DailyForecasts[0].Temperature.Minimum.Value
            })
        }
    })
}


module.exports = forecast