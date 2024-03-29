/*
*
* When the user enters at least three characters into this input field, you should display all flight information from the flights.json file where the destination matches the entered input. Do this by using vanilla Javascript.
* This should work in all browsers including IE 10+
*
* get request to the flights.json
*
* */

let storedData;
let flightsInfoArray;
let dataOutputElement;
let errorElement;
let resultsFound;

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
    let html = '';

    if (filteredData.length === 0) {
        resultsFound.innerHTML = '';
        dataOutputElement.innerHTML = 'No data found or enter at least 3 characters';
        return;
    } else {
        resultsFound.innerHTML = `We found ${filteredData.length} result(s)`;
    }

    for (let item of filteredData) {

        html += `<div class="rw-card margin-bottom-one">
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
    }
    // inject into the DOM once
    dataOutputElement.innerHTML = html;
};

/*
* Filter the data after user input
* prevent the form from being submitted when the 'submit' event is invoked
* */

const setInputFlightInformation = (e) => {
    // prevent the form from being submitted
    if (e.type === 'submit'){
        e.preventDefault();
        return;
    }
    if (e.target.classList.contains('js-flightinformation-input')){
        let target = e.target;
        let value = target.value.toLowerCase();
        let inputLength = value.length;
        if (inputLength >= 3) {

            let filteredData = filterFlightInformation(value);
            showFlightData(filteredData);
        }
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

// bind to the form element and create an event handler oninput and onsubmit

const bindFlightInformationForm = (form) => {
    const events = ['input', 'submit'];
    events.forEach(event => {
        form.addEventListener(event, setInputFlightInformation);
    })

};

// initialize the flightInformation module

export const init = () => {
    //bind the html elements
    const form = document.getElementById('flight-information-form');
    dataOutputElement = document.querySelector('.js-flightinformation-output');
    errorElement = form.querySelector('.js-attention-message');
    resultsFound = document.getElementById('results-found');

    // bind the input field
    bindFlightInformationForm(form);

    // load the data only once
    getFlightInformation().then(data => {
        storedData = JSON.parse(data.response);
        flightsInfoArray = storedData.flights;
    });
};









