import './styles/style.scss';
import favicon from './favicon.png';

import { showAlert } from "./domFunctions.js";
import { getGeoIndex, getSearchedIndex } from "./dataFunctions.js"

const initApp = () => {
    showAlert();

    //get infos according to geolocation
    const geoLink = document.getElementById('user-pos');
    geoLink.addEventListener('click', getGeoIndex);

    //get infos according to user's request
    const searchedCity = document.getElementById('search');
    searchedCity.addEventListener('submit', getSearchedIndex);
}


//starts app
document.addEventListener("DOMContentLoaded", initApp);
