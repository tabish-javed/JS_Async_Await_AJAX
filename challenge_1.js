'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

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

function urlConstructor (url, pathName, parameters = '') {
    // Construct URL and supply search parameters as object notation
    const baseURL = new URL(url);
    // Construct search parameters from object
    const addParameters = new URLSearchParams(parameters);
    // Add search parameters to URL
    baseURL.pathname = pathName;
    baseURL.search = addParameters;
    // Final URL
    return baseURL.toString();
}


const getPosition = function () {
    return new Promise(function (resolve, reject) {
        // navigator.geolocation.getCurrentPosition(position => resolve(position), error => reject(error));
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
};


function whereAmI () {

    getPosition()
        .then(
            // When location retrieved
            (position) => {
                const parameters = {
                    lat: position.coords.latitude,
                    lon: position.coords.longitude
                };

                const url = urlConstructor('https://geocode.maps.co', '/reverse', parameters);
                return fetch(url);
            },
            // When NO location retrieved
            (position) => {
                if (!position.message) throw new Error("BROWSER LOCATION UNDETERMINED");
            }
        )
        .then(response => {
            if (!response.ok) throw new Error('Invalid URL1');
            return response.json();
        })
        .then(data => {
            const { city, country } = data.address;
            console.log(`You are in ${city}, ${country}`);
            const url2 = `https://restcountries.com/v3.1/name/${country}?fullText=true`;

            return fetch(url2);
        })
        .then(response => {
            if (!response.ok) throw new Error('Invalid URL2');
            return response.json();
        })
        .then(([data]) => {
            renderCountry(data);
        })
        .catch(error => {
            console.error(error);
        });
}

whereAmI();
