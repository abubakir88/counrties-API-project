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
  //   console.log(resdata);
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
  <p><b>Population</b> ${data.population}</p>
  <p class="regionName"><b>Region:</b> ${data.region}</p>
  <p><b>Capital</b> ${data.capital}</p>
  </div>`;
  countriesElem.appendChild(country);
}

dropDown.addEventListener("click", () => {
  dropElem.classList.toggle("showDropDown");
  console.log("hello");
});

const regionName = document.getElementsByClassName("regionName");
const countryName = document.getElementsByClassName("countryName");
region.forEach((element) => {
  element.addEventListener("click", () => {
    console.log(element);
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
  //   console.log(search.value);
  console.log(search.value.toLowerCase());
  Array.from(countryName).forEach((elem) => {
    if (elem.innerText.toLowerCase().includes(search.value.toLowerCase())) {
      elem.parentElement.parentElement.style.display = "grid";
    } else elem.parentElement.parentElement.style.display = "none";
  });
});

toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  // moon.classList.toggle("fas");
});
