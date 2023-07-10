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

*/

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