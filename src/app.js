const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const keyvalue = require('./utils/key')

const app = express()

const port = process.env.PORT || 3000

// define paths for express config
const publicfolderpath = path.join(__dirname,'../public')
const viewspath = path.join(__dirname,'../templates/views')
const partialpath = path.join(__dirname,'../templates/partials')

//setup view engine, view path and partial path
app.set('view engine','hbs')
app.set('views',viewspath)
hbs.registerPartials(partialpath)

//setup handle bars engine
app.use(express.static(publicfolderpath))

app.get('' , (req,res)=>{
    res.render('index',{
        title:'weather app',
        name:'VINEETH CHARY'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'about me',
        name:'VINEETH CHARY'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        msg:'hi i am there to help you',
        title:'helping hand',
        name:'VINEETH CHARY'
    })
})


app.get('/weather',(req,res) => {
    if(!req.query.address){
        return res.send({
            error:'please provide address'
        })
    }

const addr = req.query.address
    geocode(addr,(error,data) =>{
        if(error){
           return res.send({
               error:error
           })
        }
        
        keyvalue(data.latitude,data.longitude,(error,keydata)=>{
            if(error){
                return res.send({
                    error:error
                })
            }

            forecast(keydata.key,(error,forecastdata)=>{
                if(error){
                    return res.send({
                        error:error
                    })
                }
            
                res.send({
                    location:data.location,
                    summary:forecastdata.summary,
                    max:forecastdata.maxtemp,
                    min:forecastdata.mintemp
                })
                

            })      
        })
    })

})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404 ERROR',
        text:'help article not found',
        name:'VINEETH CHARY'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404 ERROR',
        text:'404 error page not found',
        name:'VINEETH CHARY'
    })
})


app.listen(port,()=>{
    console.log('server started at port no '+port)
})