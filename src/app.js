const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, '../templates/partials')

//set up handlebars  engine and view location
app.set("view engine", "hbs")
app.set("views", viewsPath)
hbs.registerPartials(partialsPath)

//set up static directory
app.use(express.static(publicDirectoryPath))

app.get("", (req, res) => {
    res.render("index", {
        title: "Weather App",
        owner: "Maham V Ram"
    })
})

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About",
        owner: "Maham V Ram"
    })
})

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help",
        owner: "Maham V Ram",
        message: "How can we help you"
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "Please provide the location address"
        })
    }

    geocode(req.query.address, (error, { latitude, longtitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longtitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                search: req.query.address,
                location: location,
                forecast: forecastData
            })
        })
    })

})

app.get('/help/*', (req, res) => {
    res.render("404", {
        err_message: "Sorry! Help article is not found."
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        err_message: "404: Page not found."
    })
})

app.listen(3000, () => {
    console.log("Server is  running on port 3000")
})