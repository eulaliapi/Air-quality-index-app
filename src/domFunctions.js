let alert = document.getElementById('alert');

let spinner = document.getElementById('spinner');
let errMsg = document.getElementById('err-msg');

let card = document.getElementById('card');
let emoji = document.getElementById('emoji');
let cityName = document.getElementById('city-name');
let aqiDef = document.getElementById('aqi-def');


//shows the first alert with the instruction for the user
export const showAlert = () => {
    alert.classList = "d-flex justify-content-center mt-5 mx-5";
}


//shows spinner
export const showSpinner = () => {
    alert.classList = "d-none";
    spinner.classList = "d-flex justify-content-center"
}

//displays error alert
export const displayError = () => {
    spinner.classList = "d-none";
    card.classList = "d-none";
    errMsg.classList = "d-flex justify-content-center mt-5 mx-5"
}

//transforms aqi value in words to display later
const AQIDef = (aqi) => {
    if( aqi === 5) {
        return 'very poor'
    } else if( aqi === 4) {
        return 'poor'
    } else if (aqi === 3) {
        return 'moderate'
    } else if (aqi === 2) {
        return 'fair'
    } else {
        return 'good'
    }

}

//transforms aqi value in an emoji representative of that value
const AQIEmoji = (aqi) => {
    if( aqi === 5) {
        return "bi bi-emoji-dizzy-fill text-darkR fs-3"
    } else if( aqi === 4) {
        return "bi bi-emoji-frown-fill text-danger fs-3"
    } else if (aqi === 3) {
        return "bi bi-emoji-neutral-fill text-orange fs-3"
    } else if (aqi === 2) {
        return "bi bi-emoji-smile-fill text-warning fs-3"
    } else {
        return "bi bi-emoji-laughing-fill text-success fs-3"
    }

}


//displays the card which contains the infos requested by the user
export const displayAQICard = (aqi, name) => {
    spinner.classList = "d-none";
    errMsg.classList = "d-none";
    emoji.classList = AQIEmoji(aqi)
    aqiDef.innerText = AQIDef(aqi);
    cityName.innerText = name;
    card.classList = "d-flex justify-content-center mt-5 mx-5";
}