document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector("#first_value"),
    output = document.querySelector("#second_value"),
    firstCurrencySelector = document.querySelector("#first_currency_selector"),
    secondCurrencySelector = document.querySelector(
      "#second_currency_selector"
    ),
    swapButton = document.querySelector(".swap-button"),
    infoButton = document.querySelector("#info-button"),
    disclaimerModal = document.querySelector("#modal-disclaimer"),
    closeButton = document.querySelector(".close-modal");

  input.addEventListener("input", conversion, false);
  output.addEventListener("input", inverseConversion, false);
  swapButton.addEventListener("click", swapCurrency, false);
  infoButton.addEventListener("click", toggleDisclaimer, false);
  closeButton.addEventListener("click", toggleDisclaimer, false);

  function getCurrenciesList() {
    const currenciesArr = [];
    const currenciesRequest = new XMLHttpRequest();

    currenciesRequest.open("GET", "https://www.floatrates.com/daily/uah.json");
    currenciesRequest.setRequestHeader("Content-Type", "application/json");
    currenciesRequest.send();

    currenciesRequest.addEventListener("load", () => {
      if (currenciesRequest.status === 200) {
        const currenciesObj = JSON.parse(currenciesRequest.response);
        const iterate = (obj) => {
          Object.keys(obj).forEach((key) => {
            if (key == "name") {
              currenciesArr.push({ name: obj[key], code: obj["code"] });
            } else if (typeof obj[key] === "object" && obj[key] !== null) {
              iterate(obj[key]);
            }
          });
        };
        iterate(currenciesObj);
      } else {
        alert("Error at loading currencies");
      }
      const sortCurrenciesArr = (arr) => {
        arr.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));
      };
      sortCurrenciesArr(currenciesArr);
      currenciesArr.forEach((elem) => {
        firstCurrencySelector.innerHTML += `<option value=${elem["code"]}> ${elem["name"]} </option>`;
        secondCurrencySelector.innerHTML += `<option value=${elem["code"]}> ${elem["name"]} </option>`;
      });
    });
  }

  getCurrenciesList();

  function conversion() {
    const jsonRequest = new XMLHttpRequest();
    jsonRequest.open(
      "GET",
      `https://www.floatrates.com/daily/${firstCurrencySelector.value}.json`
    );
    jsonRequest.setRequestHeader("Content-Type", "application/json");
    jsonRequest.send();

    jsonRequest.addEventListener("load", () => {
      if (jsonRequest.status === 200) {
        const currenciesObj = JSON.parse(jsonRequest.response);
        output.value = (
          +input.value *
          currenciesObj[secondCurrencySelector.value.toLowerCase()].rate
        ).toFixed(2);
      } else {
        alert("Error occured");
      }
    });
  }

  function inverseConversion() {
    const jsonRequest = new XMLHttpRequest();
    jsonRequest.open(
      "GET",
      `https://www.floatrates.com/daily/${firstCurrencySelector.value}.json`
    );
    jsonRequest.setRequestHeader("Content-Type", "application/json");
    jsonRequest.send();

    jsonRequest.addEventListener("load", () => {
      if (jsonRequest.status === 200) {
        const currenciesObj = JSON.parse(jsonRequest.response);
        input.value = (
          +output.value *
          currenciesObj[secondCurrencySelector.value.toLowerCase()].inverseRate
        ).toFixed(2);
      } else {
        alert("Error occured");
      }
    });
  }

  function swapCurrency() {
    const choosedCurrencies = [
      firstCurrencySelector.value,
      secondCurrencySelector.value,
    ];
    const puttedValues = [input.value, output.value];

    firstCurrencySelector.value = choosedCurrencies[1];
    secondCurrencySelector.value = choosedCurrencies[0];

    input.value = puttedValues[1];
    output.value = puttedValues[0];
  }

  function toggleDisclaimer(event) {
    disclaimerModal.style.display == "block"
      ? (disclaimerModal.style.display = "none")
      : (disclaimerModal.style.display = "block");
  }

  document.onclick = function(event) {
    if (event.target == disclaimerModal) {
      disclaimerModal.style.display = "none";
    }}
  
});
