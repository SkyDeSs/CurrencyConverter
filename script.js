const input = document.querySelector("#first_value"),
  output = document.querySelector("#second_value"),
  currencySelector = document.querySelector("#currency_select");

function currenciesList() {
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
            currencySelector.innerHTML += `<option value=${obj["code"]}> ${obj[key]} </option>`;
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

currenciesList();

input.addEventListener("input", convertCurrencies, false);
currencySelector.addEventListener("change", convertCurrencies, false);


function convertCurrencies() { 
  const convertionRequest = new XMLHttpRequest();
  convertionRequest.open("GET", "http://www.floatrates.com/daily/uah.json");
  convertionRequest.setRequestHeader("Content-Type", "application/json");
  convertionRequest.send();

  convertionRequest.addEventListener("load", () => {
    if (convertionRequest.status === 200 && currencySelector.value !== null) {
      const data = JSON.parse(convertionRequest.response);
      output.value = (
        +input.value * data[currencySelector.value.toLowerCase()].inverseRate
      ).toFixed(2);
    } else {
      alert("Error occured");
    }
  });
};

