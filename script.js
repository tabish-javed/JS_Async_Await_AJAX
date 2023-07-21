'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');


//////////////////////////////////

/*

// AJEX USING WITHOUT FETCH (traditional way)


function getCountryData (country) {
    const url = `https://restcountries.com/v3.1/name/${country}?fullText=true`;

    const request = new XMLHttpRequest();
    request.open('get', url);
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
                <p class="country__row"><span>👫</span>${(+data.population / 1_000_000).toFixed(1)} millions</p>
                <p class="country__row"><span>🗣️</span>${Object.entries(data.languages)[0][1]}</p>
                <p class="country__row"><span>💰</span>${Object.entries(Object.entries(data.currencies)[0][1])[1][1]}<p>
            </div>
            </article>
            `;
        countriesContainer.insertAdjacentHTML('beforeend', html);
        countriesContainer.style.opacity = 1;
    });
}

getCountryData('Portugal');
getCountryData('United States');



// USING PROMISES WITH FETCH

const url = `https://restcountries.com/v3.1/name/India?fullText=true`;
const request = fetch(url)

console.log(request);

*/

const lotteryPromise = new Promise(function (resolve, reject) {
    if (Math.random() >= 0.5) resolve('You WON!')
    else reject('You LOST!')
})
    .then(response => console.log(response))
    .catch(error => console.log(error))

console.log(lotteryPromise)