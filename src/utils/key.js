const request = require('request')

const keyvalue = (latitude,longitude,callback) =>{
    const url='http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=9AdmGH32FOAsmItg2RT7QiTYEzopADAJ&q='+latitude+'%2C'+longitude
    request({url,json:true},(error,{body}) =>{
        if(error){
            callback('unable to connect to API',undefined)
        }else{
            callback(undefined,{
                key:body.Key,
                name:body.LocalizedName
            })
        }
    })
}

module.exports = keyvalue