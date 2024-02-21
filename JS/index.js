const countriesElem = document.querySelector(".countries");
const dropDown = document.querySelector(".dropDown");
const dropElem = document.querySelector(".drop");
const region = document.querySelectorAll(".region");
const search = document.querySelector(".search");
const toggle = document.querySelector(".toggle");
// const moon = document.querySelector(".moon");

async function getCountry() {
  const url = await fetch("./index.json");
  const res = await url.json();
  const resdata = res.data;
  console.log(resdata);
  resdata.forEach((element) => {
    showCountry(element);
  });
}

getCountry();

function showCountry(data) {
  const country = document.createElement("div");
  country.classList.add("country");
  country.innerHTML = `<div class="country-img">
  <img src="${data.flags.png}" alt="${data.flags.alt}" />
</div>
<div class="country-info">
  <h5 class="countryName">${data.name.common}</h5>
  <p><b>Population:</b> ${data.population}</p>
  <p class="regionName"><b>Region:</b> ${data.region}</p>
  <p><b>Capital:</b> ${data.capital}</p>
  </div>`;
  countriesElem.appendChild(country);
  country.addEventListener("click", () => {
    showCountryDetail(data);
  });
}

dropDown.addEventListener("click", () => {
  dropElem.classList.toggle("showDropDown");
});

const regionName = document.getElementsByClassName("regionName");
const countryName = document.getElementsByClassName("countryName");
region.forEach((element) => {
  element.addEventListener("click", () => {
    // console.log(element);
    Array.from(regionName).forEach((elem) => {
      if (
        elem.innerText.includes(element.innerText) ||
        element.innerText == "All"
      ) {
        elem.parentElement.parentElement.style.display = "grid";
      } else elem.parentElement.parentElement.style.display = "none";
    });
  });
});

search.addEventListener("input", () => {
  // console.log(search.value.toLowerCase());
  Array.from(countryName).forEach((elem) => {
    if (elem.innerText.toLowerCase().includes(search.value.toLowerCase())) {
      elem.parentElement.parentElement.style.display = "grid";
    } else elem.parentElement.parentElement.style.display = "none";
  });
});

// DARK-MODE///////////////////
toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

//MODAL///////////////////////////////////
const counrtyModal = document.querySelector(".counrtyModal");

function showCountryDetail(data) {
  // function getCurrenciesName(country) {
  //   const currenciesKey = Object.keys(country.currencies)[0];
  //   const currenciesName = country.currencies[currenciesKey].name;
  //   return currenciesName;
  // }
  counrtyModal.classList.toggle("show");
  let [, languages] = Object.keys(data.languages);
  let currencies = Object.keys(data.currencies)[0];
  console.log(currencies);
  counrtyModal.innerHTML = `<button class="back">
  <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          style="fill: rgba(0, 0, 0, 1); transform: ; msfilter: "
        >
          <path
            d="M21 11H6.414l5.293-5.293-1.414-1.414L2.586 12l7.707 7.707 1.414-1.414L6.414 13H21z"
          ></path>
        </svg>
          Back</button>
  <div class="modal">
    <div class="leftModal">
      <img src="${data.flags.png}" alt="" />
    </div>
    <div class="rightModal">
      <h1>${data.name.common}</h1>
      <div class="moldalInfo">
        <div class="innerLeft inner">
          <p><b>Native Name: </b> ${data.altSpellings[2]}</p>
          <p><b>Population: </b> ${data.population}</p>
          <p><b>Region: </b> ${data.region}</p>
          <p><b>Sub-region: </b> ${data.subregion}</p>
        </div>
        <div class="innerRight inner">
          <p><b>Capital: </b> ${data.capital}</p>
          <p><b>Top Level Domain: </b> ${data.tld}</p>
          <p><b>Currencies: </b> ${currencies}</p>
          <p><b>Languages: </b> ${languages}</p>
        </div>
      </div>
    </div>
  </div>`;
  const back = counrtyModal.querySelector(".back");
  back.addEventListener("click", () => {
    counrtyModal.classList.toggle("show");
  });
}
