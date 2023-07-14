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
    baseURL.pathname = pathName
    baseURL.search = addParameters;
    // Final URL
    return baseURL.toString();
}


function whereAmI (lat, lon) {
    const parameters = {
        lat: lat,
        lon: lon
    };
    const url = urlConstructor('https://geocode.maps.co', '/reverse', parameters);

    fetch(url)
        .then(response => {
            console.log(response)
            if (!response.ok) throw new Error('Invalid URL')
            return response.json();
        })
        .then(data => {
            const { city, country } = data.address;
            console.log(`You are in ${city}, ${country}`);
            const url2 = `https://restcountries.com/v3.1/name/${country}?fullText=true`

            return fetch(url2)
        })
        .then(response => {
            console.log(response)
            return response.json()
        })
        .then(([data]) => {
            renderCountry(data)
        })
        .catch(error => {
            console.log(error)
        })
}

// const latitude = 52.508;
// const longitude = 13.381;

// const latitude = 19.037;
// const longitude = 72.873;

const latitude = -33.933;
const longitude = 18.474;

whereAmI(latitude, longitude);
