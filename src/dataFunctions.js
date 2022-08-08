import axios from 'axios';

import { displayError, showSpinner, displayAQICard } from "./domFunctions.js";

import { Pollution } from "./Pollution.js";

//api key
const aqiApi = process.env.AQI_API;

let pollutionData = new Pollution();

//starts geolocation
export const getGeoIndex = () => {
    //shows spinner waiting for user's choice
    showSpinner()
    //displays error message if gelocation is denied
    if(!navigator.geolocation) return displayError();

    //if everything is ok geoSuccess else displayError
    navigator.geolocation.getCurrentPosition(geoSuccess, displayError)
}

// if gelocation response is good then it creates an object with lat and lon props and sends them to setPollutionObj
const geoSuccess = (pos) => {
    const coords = {
        lat: pos.coords.latitude,
        lon: pos.coords.longitude
    }

    setPollutionObj(coords, pollutionData)
}

/*if user inputs a city name then we set our istance name as the one looked for. Also we get lat and lon of that city
  in order to get data about its AQI*/
export const getSearchedIndex = (e) => {
    e.preventDefault();
    let requestedCity = document.getElementById('req-city').value;

    //it listens to submit event but if value is empty it does nothing
    if(!requestedCity.length) return;

    //else it sets that name as pollutionData name
    pollutionData.setName(requestedCity)
    showSpinner()
    
    //calls url: if res is ok it sends its data to getCoordsFromApi, else it displays the error
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${requestedCity}&limit=5&appid=${aqiApi}`;
    axios.get(url)
    .then( res => getCoordsFromApi(res.data))
    .catch(displayError)
}

// this function creates an obj with lat and lon data and sends it to setPollutionObj 
const getCoordsFromApi = (locObj) => {
    const coords = {
        lat: locObj[0].lat,
        lon: locObj[0].lon,
    }

    setPollutionObj(coords, pollutionData)

}


//gets coords obj and sets its lat and lon props as pollutionData lat and lon
const setPollutionObj = (coords, pollutionData) => {
    const {lat, lon} = coords;

    pollutionData.setLat(lat);
    pollutionData.setLon(lon);


    //uses pollutionData with present data to get the AQI Json
    getAQI(pollutionData)

}

const getAQI = (pollutionData) => {

    //gets pollution lat and lon and uses them in the api call
    const lat = pollutionData.getLat();
    const lon = pollutionData.getLon();

    const url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${aqiApi}`;

    //gets the AQI Json or an error
    axios.get(url)
    .then(res => getAQIData(res.data))
    .catch(err => displayError())
}

//extracts aqi property and 
const getAQIData = (aqiObj) => {
    const {aqi} = aqiObj.list[0].main;
    let name = pollutionData.getName()

    displayAQICard(aqi, name)
}

