/*
*
* When the user enters at least three characters into this input field, you should display all flight information from the flights.json file where the destination matches the entered input. Do this by using vanilla Javascript.
* This should work in all browsers including IE 10+
*
* get request to flights.json
*
* */

let storedData;
let flightsInfoArray;
let dataOutputElement;
let errorElement;

// create a promise for this request to get the flightInformation
const getFlightInformation = () => {

    let xhr = new XMLHttpRequest();
    const url = 'http://localhost:8081/data/flights.json';
    const method = 'GET';
    const async = true;

    xhr.open(method, url, async);
    xhr.send();

    return new Promise( (resolve, reject) => {
        console.log('loading indicator....');
        xhr.onload = () => {
            if (xhr.status !== 200) { // http status of the response
                // rejected
                reject({
                    status: xhr.status,
                    statusText: xhr.statusText
                });
                console.log('hide loading indicator....');
                showHideError(true);
            } else { // show the result
                // resolved
                console.log('hide loading indicator....');
                showHideError(false);
                resolve(xhr);
            }
        };
    });
};
/*
* show or hide the error element after response for the rest api call
* at this moment not very dynamic, just with static data
* */
const showHideError = (state) => {
    (state === true) ? errorElement.classList.remove('visually-hidden') : errorElement.classList.add('visually-hidden');

};

// show the filtered data and inject in html container

const showFlightData = (filteredData) => {
    let flights = [];
    let html = '';

    if (filteredData.length === 0) {
        dataOutputElement.innerHTML = 'No data found';
        return;
    }

    for (let item of filteredData) {
        html = `<div class="rw-card">
                        <div class="rw-card__body">
                        <h3 class="rw-card__header">${item.airport}</h3>
                        <dl class="rw-card__content">
                            <dt>Flightidentifier</dt><dd>${item.flightIdentifier}</dd>
                            <dt>Flightnumber</dt><dd>${item.flightNumber}</dd> 
                            <dt>Expected time</dt><dd>${item.expectedTime}</dd>
                            <dt>Original time</dt><dd>${item.originalTime}</dd>
                            <dt>url</dt><dd><a href="${item.url}">${item.url}</a></dd>
                              <dt>Score</dt><dd>${item.score}</dd>
                         </dl>
                      </div>
                     </div>`;
        flights.push(html);
    }
    // inject into the DOM once
    dataOutputElement.innerHTML = flights;
}

/*
* Filter the data after user input
* */

const setInputFlightInformation = (e) => {
    let target = e.target;
    let value = target.value.toLowerCase();
    let inputLength = target.value.length;
    if (inputLength >= 3) {

        let filteredData = filterFlightInformation(value);
        showFlightData(filteredData);
    }
};

// filter the flight information on input against destination(airport) value

const filterFlightInformation = (value) => {
    console.log(flightsInfoArray.length);
    // filter the flightsInfoArray array
    return flightsInfoArray.filter(item => {
        let destination = item.airport.toLowerCase();
        return destination.indexOf(value) !== -1;
    });
};


// bind the text input element and create an event handler oninput

const bindFlightInformationInput = () => {
    let inputElement = document.querySelector('.js-flightinformation-input');
    inputElement.addEventListener('input', setInputFlightInformation);
};

// initialize the flightInformation module

export const init = () => {
    //bind the html output container
    dataOutputElement = document.querySelector('.js-flightinformation-output');
    errorElement = document.querySelector('.js-attention-message');

    // bind the input field
    bindFlightInformationInput();

    // load the data only once
    getFlightInformation().then(data => {
        storedData = JSON.parse(data.response);
        flightsInfoArray = storedData.flights;
    });

};







