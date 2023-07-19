'use strict';

const wait = function (seconds) {
    return new Promise((resolve) => {
        setTimeout(resolve, seconds * 1_000);
    });
};

const imageElement = document.querySelector('.images');

function createImage (imagePath) {
    return new Promise(function (resolve, reject) {
        const image = document.createElement('img');
        image.src = imagePath;

        image.addEventListener('load', function () {
            imageElement.append(image);
            resolve(image);
        });

        image.addEventListener('error', function () {
            reject(new Error('Image not found'));
        });
    });
}

let currentImage;
createImage('./img/img-1.jpg')
    .then(image => {
        currentImage = image;
        return wait(2);
    })
    .then(() => {
        currentImage.style.display = 'none';
        return createImage('img/img-2.jpg');
    })
    .then(image => {
        currentImage = image;
        return wait(2);
    })
    .then(() => {
        currentImage.style.display = 'none';
    })
    .catch(error => console.error(error));