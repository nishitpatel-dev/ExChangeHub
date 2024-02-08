const selects = document.querySelectorAll(".dropdown select");
const img = document.querySelectorAll(".select-container img");
const button = document.querySelector("button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const resultInput = document.querySelectorAll("form input");

window.addEventListener("load", () => {
  updateExchangeRate();
});

for (let select of selects) {
  for (let country in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = country;
    newOption.value = country;

    if (select.name == "From" && country == "USD") {
      newOption.selected = "selected";
    } else if (select.name == "To" && country == "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  select.addEventListener("change", (e) => {
    updateFlag(e.target);
  });
}

const updateFlag = (element) => {
  //   console.log(element);

  let eleValue = element.value;
  let countryCode = countryList[eleValue];

  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;

  if (element.name == "From") {
    img[0].src = newSrc;
  } else {
    img[1].src = newSrc;
  }
};

button.addEventListener("click", (e) => {
  e.preventDefault();
  updateExchangeRate();
});

const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;

  if (amtVal == "" || amtVal < 1) {
    amtVal = 1;
    amount.value = amtVal;
  }

  const URL = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;

  const response = await fetch(URL);

  const jsonRes = await response.json();

  console.log(jsonRes);

  const toCurrVal = toCurr.value.toLowerCase();

  resultInput[1].value = `${amtVal} ${fromCurr.value} = ${(
    jsonRes[toCurrVal] * amtVal
  ).toFixed(2)} ${toCurr.value}`;
};
