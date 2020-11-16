const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geoCode = require('./utils/geocode')
const app = express()
const port = process.env.PORT || 3000

//define path for express config
const publicDirPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../template/views');
const partialsPath = path.join(__dirname, '../template/partials')

//setup handlebars engine and view location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath)

//setup static directory
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Atal'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Atal'
    })

})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'Help provided here',
        name: 'Atal'
    })

})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({ error: 'Please provide address.' })
    }
    geoCode(req.query.address, (error, { latitude, longitude, places } = {}) => {
        if (error) {
            return res.send({ error });
        }

        forecast(latitude, longitude, (error, forecastdata) => {
            if (error) {
                return res.send({ error });
            }
            res.send({
                forecast: forecastdata,
                address: places
            })

        })
    })



})

app.get('*', (req, res) => {
    res.render('404', { title: '404', message: 'Page does not exist', name: 'Atal' })
})



app.listen(port, () => {
    console.log('Server is up and running')
})