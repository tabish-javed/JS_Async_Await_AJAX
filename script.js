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



const lotteryPromise = new Promise(function (resolve, reject) {

    setTimeout(function () {
        if (Math.random() >= 0.5) resolve('You WON!');
        else reject(new Error('You LOST!'));
    }, 2 * 1_000);

});

lotteryPromise.then(response => console.log(response)).catch(error => console.error(error));

*/


// const position = navigator.geolocation.getCurrentPosition(
//     position => console.log(position),
//     error => console.log(error)
// );

async function getPosition () {
    try {
        return await new Promise(function (resolve, reject) {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
    } catch (error) {
        throw new Error(`Browser location undetermined: ${error}`);
    }
}

// getPosition().then(position => console.log(position)).catch(error => console.error(error));


// As of today, return of an async function with await can happen only inside of another async function
// Basically all async functions can exchange data
// A top-level await is in proposal phase, let's see when it becomes available to use

// Converting then-catch chain to an async function with await.
(async function () {
    try {
        const position = await getPosition();
        console.log(position)
    } catch (error) {
        console.error(error)
    }
})();