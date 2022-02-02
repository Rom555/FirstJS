"use strict";

let title;
let screens;
let screenPrice;
let adaptive;
let service1;
let servicePrice1;
let service2;
let servicePrice2;
let allServicePrices;
let fullPrice;
let servicePercentPrice;

let services = [];

const rollback = 55;

const isNumber = function (num) {
  return isNaN(parseInt(num)) || !isFinite(num);
};

const getNumber = function (str, value) {
  let num;

  do {
    num = prompt(str, value);
  } while (isNumber(num));

  return +num;
};

const asking = function () {
  title = prompt("Как называется ваш проект?", " КальКулятор верСтки");
  screens = prompt("Какие типы экранов нужно разработать?", "Простой, сложный");
  screenPrice = getNumber("Сколько будет стоить данная работа?");
  adaptive = confirm("Нужен ли адаптив на сайте?");
};

const showTypeOf = function (variable) {
  console.log(variable, typeof variable);
};

const getAllServicePrices = function (services) {
  let sum = 0;

  while (true) {
    let str = prompt(
      "Какой дополнительный тип услуги нужен? (оставьте пустой или нажмите отмена если больше не нужны)"
    );

    if (str === "" || str === null) {
      break;
    }

    let value = getNumber("Сколько это будет стоить?");

    services.push([str, value]);
    sum += value;
  }

  return sum;
};

function getFullPrice(screenPrice, allServicePrices) {
  return screenPrice + allServicePrices;
}

const getTitle = function (title) {
  let trimmedTitle = title.trim();

  return (
    trimmedTitle[0].toUpperCase() + trimmedTitle.substring(1).toLowerCase()
  );
};

const getServicePercentPrices = function (fullPrice, rollback) {
  return Math.ceil(fullPrice - fullPrice * (rollback / 100));
};

const getRollbackMessage = function (price) {
  switch (true) {
    case price > 30000:
      return "Даем скидку в 10%";
    case 15000 < price && price <= 30000:
      return "Даем скидку в 5%";
    case 0 <= price && price <= 15000:
      return "Скидка не предусмотрена";
    default:
      return "Что то пошло не так";
  }
};

asking();

allServicePrices = getAllServicePrices(services);
fullPrice = getFullPrice(screenPrice, allServicePrices);
servicePercentPrice = getServicePercentPrices(fullPrice, rollback);

showTypeOf(getTitle(title));
showTypeOf(screenPrice);
showTypeOf(adaptive);

console.log(screens.toLowerCase().split(", "));

console.log(getRollbackMessage(fullPrice));

console.log(
  "Итоговая стоимость за вычетом отката посреднику " + servicePercentPrice
);
