'use strict';

const books = document.querySelector('.books');
const book = document.querySelectorAll('.book');

books.prepend(book[1]);
book[3].before(book[4]);
book[5].after(book[2]);

document.body.style.backgroundImage = 'url(./image/you-dont-know-js.jpg)';

const headThree = book[4].querySelector('h2');
headThree.innerHTML = '<a href="https://github.com/azat-io/you-dont-know-js-ru/blob/master/this%20%26%20object%20prototypes/README.md#you-dont-know-js-this--object-prototypes" target = "_blank">Книга 3. this и Прототипы Объектов</a >';

const ad = document.querySelector('.adv');
ad.remove();

const twoBookList = book[0].querySelectorAll('li');
twoBookList[9].after(twoBookList[2]);
twoBookList[8].after(twoBookList[4]);
twoBookList[4].after(twoBookList[5]);
twoBookList[5].after(twoBookList[7]);

const fiveBookList = book[5].querySelectorAll('li');
fiveBookList[1].after(fiveBookList[9]);
fiveBookList[4].after(fiveBookList[2]);
fiveBookList[7].after(fiveBookList[5]);

const sixBookList = book[2].querySelectorAll('li');
const newElem = document.createElement('li');
newElem.textContent = 'Глава 8: За пределами ES6';
sixBookList[8].after(newElem);


