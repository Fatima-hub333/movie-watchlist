/* eslint-disable eqeqeq */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
const movie2Container = document.querySelector('.movie2-cont');

function displayIt(ele) {
  return `
<div class="film-cont-2">
          <img src="${ele.Poster}">
          <h2>${ele.Title}<span class='rate'>${ele.imdbRating}</span></h2>
          <div class="add-to">
          <span class="run-time">${ele.Runtime}</span>
          <span class="genre">${ele.Genre}</span>
          <span class="btn-cont">
          <button class="btn-3" id="btt">-</button>
          </span>
          </div>
          <p class="plot">${ele.Plot}</p>
          </div> `;
}

const myWatchList = JSON.parse(localStorage.getItem('Watchlist')) || [];

async function showMovie(IDS) {
  let html = ' ';
  for (const i of IDS) {
    const res = await fetch(`https://www.omdbapi.com/?apikey=61abc5b&i=${i}`);
    const data = await res.json();

    html += displayIt(data);
  }
  movie2Container.innerHTML = html;

  const removeButtons = movie2Container.querySelectorAll('button');
  removeButtons.forEach((but, i) => {
    but.addEventListener('click', () => {
      IDS.splice(i, 1);

      if (IDS.length == 1) {
        IDS = [];
      }
      const cont = but.parentElement.parentElement.parentElement;
      cont.remove();

      localStorage.setItem('Watchlist', JSON.stringify(IDS));
    });
  });
}

showMovie(myWatchList);