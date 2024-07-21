const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const countryName = document.getElementById('country');

function renderCountry(data, className = '') {
  const html = `
  <article class="country">
  <img class="country__img" src=${data.flags.svg} />
  <div class="country__data">
    <h3 class="country__name">${data.name.common}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${data.population}</p>
    <p class="country__row"><span>🗣️</span>${
      Object.values(data.languages)[0]
    }</p>
    <p class="country__row"><span>💰</span>${
      Object.values(data.currencies)[0].name
    }</p>
  </div>
</article>
  `;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
}

async function listNeighbours(country) {
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/alpha/${country}`
    );
    if (!response.ok) {
      throw new Error('Country not found');
    }
    const data = await response.json();
    renderCountry(data[0]);
  } catch (Error) {
    console.log(Error);
  }
}

async function whoAmI(country) {
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${country}`
    );
    if (!response.ok) {
      throw new Error('Country not found');
    }
    //rendern my favorite coutry
    const data = await response.json();
    renderCountry(data[0]);

    //render nachbarn
    for (let i of data[0].borders) {
      const border = i;
      listNeighbours(border);
    }
  } catch (Error) {
    console.log(Error);
  }
}


function clearCountries() {
  let countriesList = document.getElementById('countryList');
  countriesList.innerHTML = '';
  countryName.value = '';
}


var btnListNeighbours = document.getElementById('listNeighbours');
btnListNeighbours.addEventListener('click', () => {
  countryValue = countryName.value.toLowerCase();

  whoAmI(countryValue);
  renderCountry();
});

var btnClearCountries = document.getElementById('clearCountries');
btnClearCountries.addEventListener('click', clearCountries);
