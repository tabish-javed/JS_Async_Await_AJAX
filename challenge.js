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


// Construct URL and supply search parameters as object notation
const apiEndPoint = new URL('https://geocode.maps.co/reverse');
// Parameters in object form
const parameters = {
    lat: 52.508,
    lon: 13.381
}
// Construct search parameters from object
const searchParams = new URLSearchParams(parameters)
// Add search parameters to URL
apiEndPoint.search = searchParams
// Final URL
const reverseLocationURL = apiEndPoint.toString()


fetch(reverseLocationURL)
    .then(response => {
        return response.json()
    })
    .then(data => {
        console.log(data);
    })
