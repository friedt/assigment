

/*
*
* When the user enters at least three characters into this input field, you should display all flight information from the flights.json file where the destination matches the entered input. Do this by using vanilla Javascript.
*
* get request to flights.json
*
* */

let storedData;
let flightsInfoArray;
let dataOutputElement;


const getFlightInformation = () => {

    let xhr = new XMLHttpRequest();
    const url = 'http://localhost:8081/data/flights.json';
    const method = 'GET';
    const async = true;

    xhr.open(method, url, async);
    xhr.send();

    // This will be called after the response is received
    return new Promise(function (resolve, reject) {
        xhr.onload = function () {
            if (xhr.status != 200) { // analyze HTTP status of the response
                // reject
                reject({
                    status: xhr.status,
                    statusText: xhr.statusText
                });
            } else { // show the result
                // resolve
                resolve(xhr);
            }
        };
    });
};

// show the filtered data and inject in html container

const showFlightData = (filteredData) => {
    let flights = [];
    let html = '';

    if (filteredData.length === 0){
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
                            <dt>url</dt><dd>${item.url}</dd>
                              <dt>Score</dt><dd>${item.score}</dd>
                         </dl>
                      </div>
                     </div>`;
        flights.push(html);

    }
    dataOutputElement.innerHTML = flights;
}

/*
* Filter the data after user input
* */

const showFlightInformation = (e) => {
    let target = e.target;
    let value = target.value.toLowerCase();
    let inputLenght = target.value.length;
    if (inputLenght >= 3) {
        console.log(flightsInfoArray.length);
        // filter the flightsInfoArray array
        let filteredData = flightsInfoArray.filter(item => {
            let destination = item.airport.toLowerCase();
            return destination.indexOf(value) !== -1;
        });

        showFlightData(filteredData);
    }
};

const bindFlightInformationInput = () => {
    let inputElement = document.querySelector('.js-flightinformation-input');
    inputElement.addEventListener('input', showFlightInformation);
};

export const init = () => {
    //bind the html output container
    dataOutputElement = document.querySelector('.js-flightinformation-output');
    // bind the input field
    bindFlightInformationInput();

    // load the data only once
    getFlightInformation().then(data => {
        storedData = JSON.parse(data.response);
        flightsInfoArray = storedData.flights;

    });

};







