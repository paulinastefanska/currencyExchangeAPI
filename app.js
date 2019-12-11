// http://numbersapi.com/random/year?json

// EXERCISE 1
// const fetch = require("node-fetch");

// const year = process.argv[2] || Math.floor(Math.random() * 2021);
// // console.log(year);

// fetch(`http://numbersapi.com/${year}/year?json`)
//   .then(response => response.json())
//   .then(data => console.log(data.text))
//   .catch(error => console.log("Oooops ERROR", error));

// EXERCISE 2
// `http://numbersapi.com/${number}/${type}?json`
// console.log(process.argv);

// const fetch = require("node-fetch");
// const arg = process.argv[2];
// let type = "";

// if (arg.indexOf("--year") === 0) {
//   console.log("info about year ...");
//   type = "year";
// } else if (arg.indexOf("--math") === 0) {
//   console.log("info about number ...");
//   type = "math";
// } else if (arg.indexOf("--trivia") === 0) {
//   console.log("info about curiosity ...");
//   type = "trivia";
// }

// const equalSign = arg.search("=");
// // console.log(equalSign);
// if (equalSign === -1) console.log("you did not enter a number!");

// const number = arg.slice(equalSign + 1);
// // console.log(number);

// // if (number === "" || isNaN(Number(number))) {
// //   console.log("is not a number!");
// //   process.exit();
// // }

// fetch(`http://numbersapi.com/${number}/${type}?json`)
//   .then(response => {
//     if (response.ok) {
//       return response.json();
//     } else {
//       throw new Error("Oops! Something went wrong: " + response.status);
//     }
//   })
//   .then(response => console.log(response.text))
//   .catch(err => console.log("Oops! ERROR: ", err));

// EXERCISE 3 - NBP API - REQUEST
// `http://api.nbp.pl/api/exchangerates/rates/a/${code}/`

const request = require("request");
const fs = require("fs");

const validCodes = ["usd", "eur", "gbp", "chf"];

const code = process.argv[2];

const isValid = validCodes.find(currency => currency === code) ? true : false;
// console.log(isValid);
if (!isValid) process.exit();

const url = `http://api.nbp.pl/api/exchangerates/rates/a/${code}/?format=json`;

request(url, { json: true }, (err, res, body) => {
  if (err) {
    return console.log("Oops! Error: ", err);
  }
  if (res.statusCode !== 200) {
    return console.log("Oops! Something went wrong, check url");
  }
  const message = `Average ${body.currency} on ${body.rates[0].effectiveDate} = ${body.rates[0].mid} PLN`;

  fs.appendFile("curriencies.txt", message + "\n", err => {
    console.log("Data added to file");
  });

  console.log(message);
});
