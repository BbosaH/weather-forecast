# Author

@Henry Bbosa Lujja

This is a An app to fetch and display Weather forecast data for five days from OpenWeather Api.It is an App created with React and webpack 4 from scratch.It is a Single Page Application

Features:

1. searching by zipcode or Cityname
2. Displaying forecast data in cards
3. Displaying Weather for today or Tommorow in upper part of app
4. Showing Not found essage in case City is not found

# My thought process.

I needed to provide a working solution with quality code and tested code.
I needed to break the app into components to render Data . I chose to use
React for this. I needed to organise my state. Hence having one container object to manage state and the rest stateless components.
I also thought of Caching data for a particular city so that when someone clicks the button to get the forecast it should return a copy of data if already searched. I chose not to cache the data because the forecast result weather can change anytime drastically.This can be caused by forecasters that use satellite images and Doppler radar data,(such weather forecast is called Nowcast).Nowcast can change even on minute level as things like thunderstorms are really dynamic and forecasting them with high precision can be difficult.Caching may lead to serving wrong weather information to user.

# TradeOff

I chose to manage Internal state in the container component , Because i would still keep my state organised. because of the size of the App . I decided not to use Redux as a state manager because it would be an overkill.
Another tradeoff was time to write Unit tests because its worth it to always take time to test my applications.
I chose webpack as a bundler and to run the app in

# WithMoreTime.

i would make the app look more beautiful with css
Work more on the way data is processed
Adding more features like searching weather forecast by city Id ,and location coordinates.
Also making application to pick current location by default and display the forecast data of that location as default
improving the unit tests
Would benchmark and improve performance of the application where ever needed.

# Accessing app

Download code or clone it from github repo
change Directory path to the weather-forecast directory
for example
"C/mycomputer/project/weather-forecast"

# running app

npm start

starts webpack development server

# running Test suites

npm test

runs jest test runner

# buidling for production

npm build
