'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

/*
const REST_Countries = 'https://restcountries.com/v3.1/all';
// const URL = 'https://countries-api-836d.onrender.com/countries/'


function getCountryData (country) {
    const request = new XMLHttpRequest();
    const url = `https://restcountries.com/v3.1/name/${country}?fullText=true`;

    request.open('GET', url);
    request.send();
    request.addEventListener('load', function () {
        const [data] = JSON.parse(this.responseText);
        console.log(data);

        const html = `
        <article class="country">
        <img class="country__img" src="${data.flags.svg}" />
        <div class="country__data">
            <h3 class="country__name">${data.name.common}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)} millions</p>
            <p class="country__row"><span>🗣️</span>${Object.entries(data.languages)[0][1]}</p>
            <p class="country__row"><span>💰</span>${Object.entries(Object.entries(data.currencies)[0][1])[1][1]}</p>
        </div>
        </article>
    `;
        countriesContainer.insertAdjacentHTML('beforeend', html);
        countriesContainer.style.opacity = 1;
    });
}

getCountryData('India')



// AJEX CALL-BACK HELL

function renderCountry (data, className = '') {
    const html = `
        <article class="country ${className}">
        <img class="country__img" src="${data.flags.svg}" />
        <div class="country__data">
            <h3 class="country__name">${data.name.common}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)} millions</p>
            <p class="country__row"><span>🗣️</span>${Object.entries(data.languages)[0][1]}</p>
            <p class="country__row"><span>💰</span>${Object.entries(Object.entries(data.currencies)[0][1])[1][1]}</p>
        </div>
        </article>
    `;
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
}


function getCountryData (country) {
    // AJEX call country1
    const request = new XMLHttpRequest();
    const url = `https://restcountries.com/v3.1/name/${country}?fullText=true`;
    request.open('GET', url);
    request.send();

    request.addEventListener('load', function () {
        const [data] = JSON.parse(this.responseText);
        console.log(data);

        // Render country 1
        renderCountry(data);

        // Get neighbor country 2
        const neighbor = data.borders?.[0];

        if (!neighbor) return;

        // AJEX call country1
        const request2 = new XMLHttpRequest();
        const url = `https://restcountries.com/v3.1/alpha/${neighbor}`;
        request2.open('GET', url);
        request2.send();

        request2.addEventListener('load', function () {
            const [data2] = JSON.parse(this.responseText)
            console.log(data2);
            renderCountry(data2, 'neighbour')
        })
    });
}

// getCountryData('India');
getCountryData('United States');

*/

// USING PROMISES - Consuming and Chaining Promises //
// function getCountryData (country) {
//     const url = `https://restcountries.com/v3.1/name/${country}?fullText=true`;
//     fetch(url)                          // fetch() returns promise
//         .then(function (response) {     // received response when promise is fulfilled
//             console.log(response);      // to retrieve data from a response we need to call json()
//             return response.json();     // json() returns a new promise again
//         })
//         .then(function ([data]) {       // response of the json() promise is the data itself
//             console.log(data);
//             renderCountry(data)
//         });
// }

function renderCountry (data, className = '') {
    const html = `
        <article class="country ${className}">
        <img class="country__img" src="${data.flags.svg}" />
        <div class="country__data">
            <h3 class="country__name">${data.name.common}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(+data.population / 1_000_000).toFixed(1)} millions</p>
            <p class="country__row"><span>🗣️</span>${Object.entries(data.languages)[0][1]}</p>
            <p class="country__row"><span>💰</span>${Object.entries(Object.entries(data.currencies)[0][1])[1][1]}</p>
        </div>
        </article>
    `;
    countriesContainer.insertAdjacentHTML('beforeend', html);
    // countriesContainer.style.opacity = 1;
}

function renderError (message) {
    countriesContainer.insertAdjacentText('beforeend', message);
    // countriesContainer.style.opacity = 1
}

async function getJSON (url, errorMessage = '') {
    const response = await fetch(url);
    console.log(response)
    if (!response.ok) throw new Error(`${errorMessage}. Status Code: ${response.status}`);
    return await response.json();
}


function getCountryData (country) {
    const url = `https://restcountries.com/v3.1/name/${country}?fullText=true`;
    // Country-1
    getJSON(url, 'Country not found!')
        .then(([data]) => {
            renderCountry(data);
            const neighbor = data.borders?.[0];

            if (!neighbor) throw new Error('No Neighbor found!');

            const url2 = `https://restcountries.com/v3.1/alpha/${neighbor}`;
            // Country-2
            return getJSON(url2, 'Country not found');
        })
        .then(([data]) => renderCountry(data, 'neighbour'))
        .catch(error => {
            renderError(`${error}`);
        })
        .finally(() => {
            countriesContainer.style.opacity = 1;
        });
}

btn.addEventListener('click', function () {
    getCountryData('Russia');
});



// function getCountryData (country) {
//     const url = `https://restcountries.com/v3.1/name/${country}?fullText=true`;
//     // Country-1
//     fetch(url)
//         // <- Promise handler
//         .then(response => {
//             if (!response.ok) throw new Error(`Country "${country}" not found. Status Code: ${response.status}`);
//             return response.json();
//         })
//         .then(([data]) => {
//             renderCountry(data);

//             const neighbor = data.borders?.[0];
//             if (!neighbor) return;
//             const url2 = `https://restcountries.com/v3.1/alpha/${neighbor}`;

//             // Country-2
//             return fetch(url2);
//         })
//         .then(response => response.json())
//         .then(([data]) => renderCountry(data, 'neighbour'))
//         .catch(error => {   // <- Error Handler
//             console.error(error);
//             renderError(`${error}`);
//         })
//         .finally(() => {    // <- Handler for running the code regardless of promise fulfilled or rejected
//             countriesContainer.style.opacity = 1;
//         });
// }

// btn.addEventListener('click', function () {
//     getCountryData('Germanyy');
// });
