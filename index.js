/* eslint-disable no-console */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
/* eslint-disable no-inner-declarations */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
let isClicked = false;

let arr = [];

const arr1 = JSON.parse(localStorage.getItem('Watchlist')) || [];

let html;

const searchBtn = document.querySelector('.btn-1');
const movieContainer = document.querySelector('.movie-cont');
const filmCont = document.querySelector('.film-cont');
const btt = document.querySelector('.header');

searchBtn.addEventListener('click', callIt);

async function callIt() {
  const inputValue = document.querySelector('.input');

  arr = [];
  isClicked = true;
  console.log(isClicked);
  try {
    const res = await fetch(`https://www.omdbapi.com/?apikey=61abc5b&s=${inputValue.value}`);

    const data = await res.json();

    const Movie = data.Search;

    movieContainer.innerHTML = ' ';
    async function taiwo() {
      let cont = ' ';
      for (const i of Movie) {
        const rep = await fetch(`https://www.omdbapi.com/?apikey=61abc5b&i=${i.imdbID}`);
        const dat = await rep.json();

        arr.push(dat.imdbID);

        cont
            += `<div class="film-cont-2">
            <img src="${dat.Poster}">
           <h2>${dat.Title}<span class='rate'>${dat.imdbRating}</span></h2>
            <div class="add-to">
            <span class="run-time">${dat.Runtime}</span>
            <span class="genre">${dat.Genre}</span>
            <p class="added">Already in your Watchlist</p>
            <span class="btn-cont">
            <button class="btn-2" id="btt">+</button>
            
            </span>
            </div>
            <p class="plot">${dat.Plot}</p>
            </div> `;
      }

      movieContainer.innerHTML = cont;
      const spans = document.querySelectorAll('.btn-cont');
      const para = document.querySelectorAll('.added');
      const buttons = document.querySelectorAll('.btn-2');

      // MAKING THE ADD BUTTON FUNCTION
      buttons.forEach((button, i) => {
        button.addEventListener('click', () => {
          const pres = arr[i];
          const index = arr1.indexOf(pres);
          if (arr1.includes(pres) && isClicked) {
            spans[i].classList.add('hide-but');

            para[i].classList.add('display-p');
          } else if (index > -1) {
            arr1.splice(index, 1);
            button.textContent = '+';
          } else {
            arr1.push(pres);
            button.textContent = '-';
            isClicked = false;
          }

          localStorage.setItem('Watchlist', JSON.stringify(arr1));
        });
      });
    }

    taiwo();
  } catch (err) {
    movieContainer.innerHTML = err.message;
  }

  filmCont.classList.add('hide');

  inputValue.value = '';
}
