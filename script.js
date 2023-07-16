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
//     getCountryData('Germany');
// });



// THE EVENT LOOP IN ACTION

console.log('Test start!');
setTimeout(() => console.log('0 sec timer', 0));
Promise.resolve('Resolved promise 1').then(response => console.log(response));

Promise.resolve('Resolved promise 2').then(response => {
    for (let i = 0; i < 1_000_000; i++) { }
    console.log(response)
});

console.log('Test end!')



// PROMISIFY ASYNCHRONOUS FUNCTIONS
const lotteryPromise = new Promise(function (resolve, reject) {
console.log('Lottery draw is happening...')

    setTimeout(() => {
        if (Math.random() >= 0.5) {
            resolve('You WON!');
        } else {
            reject(new Error('You LOST!'));
        }
    }, 2000);
});

lotteryPromise.then(response => console.log(response)).catch(error => console.error(error));

// PROMISIFY MEANS CONVERTING/WRAPPING OLD NORMAL CALLBACK FUNCTIONS TO MICRO-TASKS/PROMISES
// Converting callback based asynchronous functions/behaviors to promise based

// Promisify "setTimeout"
const wait = function (seconds) {
    return new Promise((resolve) => {
        setTimeout(resolve, seconds * 1_000)
    })
};

wait(2).then(() => {
    console.log('I waited for 2 seconds');
    return wait(1)
}).then(() => {
    console.log('I waited for 1 seconds');
    return wait(1)
}).then(() => {
    console.log('I waited for 2 seconds');
    return wait(1)
}).then(() => {
    console.log('I waited for 3 seconds');
    return wait(1)
}).then(() => {
    console.log('I waited for 4 seconds');
    return wait(1)
});

// Fullfil OR Reject Promise Immediately

Promise.resolve('abc').then((x) => console.log(x))
Promise.reject(new Error('abc')).then((x) => console.error(x))






// CONSUMING PROMISES WITH ASYNC/AWAIT

const getPosition = function () {
    return new Promise(function (resolve, reject) {
        // navigator.geolocation.getCurrentPosition(position => resolve(position), error => reject(error));
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
};

// getPosition().then(position => console.log(position));


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
    countriesContainer.style.opacity = 1;
}


async function whereAmI () {

    // ERROR HANDLING WITH TRY...CATCH
    try {
        let response;

        // Geolocation
        const { coords: { latitude, longitude } } = await getPosition();

        // Reverse geocoding
        response = await fetch(`https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}`);
        if (!response.ok) throw new Error('Can not reverse geocode');

        const { address: { country } } = await response.json();

        // Country data
        response = await fetch(`https://restcountries.com/v3.1/name/${country}?fullText=true`);

        const [data] = await response.json();
        renderCountry(data);
        console.log(data);

        return `You are in ${data.name.common}`;

    } catch (error) {
        console.error(error);
    }
}

whereAmI()

*/

async function getJSON (url, errorMessage = '') {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`${errorMessage}. Status Code: ${response.status}`);
    return await response.json();
}

// RUNNING ASYNC IN PARALLEL

async function get3Countries (c1, c2, c3) {
    try {
        // const [data1] = await getJSON(`https://restcountries.com/v3.1/name/${c1}?fullText=true`)
        // const [data2] = await getJSON(`https://restcountries.com/v3.1/name/${c2}?fullText=true`)
        // const [data3] = await getJSON(`https://restcountries.com/v3.1/name/${c3}?fullText=true`)
        // console.log([data1.capital, data2.capital, data3.capital]);


        const data = await Promise.all(
            [
                getJSON(`https://restcountries.com/v3.1/name/${c1}?fullText=true`),
                getJSON(`https://restcountries.com/v3.1/name/${c2}?fullText=true`),
                getJSON(`https://restcountries.com/v3.1/name/${c3}?fullText=true`),
            ]
        );

        console.log(data.map(element => element[0].capital[0]));

    } catch (error) {
        console.error(error);
    }
}

get3Countries('portugal', 'canada', 'tanzania')
