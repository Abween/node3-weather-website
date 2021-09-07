const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');



const app = express();

//define paths for express config
const publicDirectory = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//seteup handlebars engine and views location 
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//setup static library to serve
app.use(express.static(publicDirectory));


app.get('', (req, res) => {
   res.render('index', {
      title: 'Weather',
      name: 'Jehad muzahem'
   });
});

app.get('/about', (req, res) => {
   res.render('about', {
      title: 'About',
      name: 'Jay Muzahem'
   })
});

app.get('/products', (req, res) => {


   if (!req.query.search) {
      return res.send({
         error: 'you must provide a search term'
      });
   }

   console.log(req.query);
   res.send({
      products: []
   });


});

app.get('/help', (req, res) => {
   res.render('help', {
      title: 'Help',
      name: 'Jay Muzahem'
   })
});

app.get('/weather', (req, res) => {

   if (!req.query.address) {
      return res.send({
         error: 'You must provide address'
      });
   }
   geocode(req.query.address, (error, { location, latitude, longtitude } = {}) => {
      if (error) {
         return res.send({
            error
         });
      }

      forecast(latitude, longtitude, (error, forecastData) => {
         if (error) {
            return res.send({
               error
            });

         }
         res.send({
            forecast: forecastData,
            location,
            longtitude,
            latitude
         });
      });
   });


});

app.get('/help/*', (req, res) => {
   res.render('404', {
      title: '404',
      name: 'jay Muzahem',
      error: 'Help article not found'
   });
});

//Setup 404 page * means match anything wildcard it is suppose to be the last get
app.get('*', (req, res) => {
   res.render('404', {
      title: '404',
      name: 'jay Muzahem',
      error: 'Page not found'
   });
});



app.listen(3000, () => {
   console.log('Server is up in port 3000');
});