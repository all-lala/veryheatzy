const form = document.getElementById("form-login");
const username = document.getElementById("form-login-username");
const password = document.getElementById("form-login-password");
const valid = document.getElementById("form-login-valid");
const resultDataZone = document.getElementById("result-data-zone");

const BASE_HEATZY_API_URL = "http://euapi.gizwits.com/app/";
const BASE_HEATZY_API_KEY = "c70a66ff039d41b4a220e198b0fcc8b3";

let token = "";

form.onsubmit = (event) => {
  event.preventDefault();
  sendLogin(username.text, password.text);
};

valid.onclick = (event) => {
  event.preventDefault();
  if (username.value && password.value) {
    sendLogin(username.value, password.value);
  }
};

function sendLogin(username, password) {
  const data = { username, password };
  const url = "login";
  apiPost(url, data).then((data) => {
    token = data.token;
  });
}

function apiPost(url, data) {
  const dest = `${BASE_HEATZY_API_URL}${url}`;
  var header = new Headers();
  header.append("X-Gizwits-Application-Id", BASE_HEATZY_API_KEY);
  var init = {
    method: "POST",
    headers: header,
    body: JSON.stringify(data),
  };
  fetch(dest, init)
    .then((response) => response.json())
    .then((responseDatas) => {
      resultDataZone.innerHTML = JSON.stringify(responseDatas, undefined, 2);
    });
}
