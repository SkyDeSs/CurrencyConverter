const input = document.querySelector("#first_value"),
      output = document.querySelector("#second_value");

input.addEventListener('input', () => {
  const request = new XMLHttpRequest();
  request.open("GET", 'currencies.json');
  request.setRequestHeader("Content-Type", "application/json");
  request.send();

  request.addEventListener('load', () => {
    if (request.status === 200) {
      const data = JSON.parse(request.response);
      output.value = (+input.value / data.currency.usd).toFixed(2);
    } else {
        alert("Error occured");
    }
  });
});

output.addEventListener('input', () => {
  const request = new XMLHttpRequest();
  request.open("GET", 'currencies.json');
  request.setRequestHeader("Content-Type", "application/json");
  request.send();

  request.addEventListener('load', () => {
    if (request.status === 200) {
      const data = JSON.parse(request.response);
      input.value = (+output.value * data.currency.usd).toFixed(2);
    } else {
        alert("Error occured");
    }
  });
});

