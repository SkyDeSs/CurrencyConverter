document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector("#first_value"),
    output = document.querySelector("#second_value"),
    firstCurrencySelector = document.querySelector("#first_currency_selector"),
    secondCurrencySelector = document.querySelector(
      "#second_currency_selector"
    );

  input.addEventListener("input", conversion, false);
  output.addEventListener("input", inverseConversion, false);

  function getCurrenciesList() {
    const currenciesRequest = new XMLHttpRequest();

    currenciesRequest.open("GET", "http://www.floatrates.com/daily/uah.json");
    currenciesRequest.setRequestHeader("Content-Type", "application/json");
    currenciesRequest.send();

    currenciesRequest.addEventListener("load", () => {
      if (currenciesRequest.status === 200) {
        const currenciesObj = JSON.parse(currenciesRequest.response);
        const iterate = (obj) => {
          Object.keys(obj).forEach((key) => {
            if (key == "name") {
              firstCurrencySelector.innerHTML += `<option value=${obj["code"]}> ${obj[key]} </option>`;
              secondCurrencySelector.innerHTML += `<option value=${obj["code"]}> ${obj[key]} </option>`;
            } else if (typeof obj[key] === "object" && obj[key] !== null) {
              iterate(obj[key]);
            }
          });
        };
        iterate(currenciesObj);
      } else {
        alert("Error at loading currencies");
      }
    });
  }

  getCurrenciesList();

  function conversion() {
    const jsonRequest = new XMLHttpRequest();
    jsonRequest.open(
      "GET",
      `http://www.floatrates.com/daily/${firstCurrencySelector.value}.json`
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
      `http://www.floatrates.com/daily/${firstCurrencySelector.value}.json`
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
});


// function conversion() {
//     output.value = (+input.value * currenciesObj[secondCurrencySelector.value.toLowerCase()].rate).toFixed(2);
// };

// function inverseConversion() {
//   output.value = (+input.value * currenciesObj[secondCurrencySelector.value.toLowerCase()].rate).toFixed(2);
// };
