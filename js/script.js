"use strict";

// let title;
// let screens;
// let screenPrice;
// let adaptive;
// let allServicePrices;
// let fullPrice;
// let servicePercentPrice;

// let services = [];

// const rollback = 55;

const isNumber = function (num) {
  return !isNaN(parseInt(num)) && isFinite(num);
};

const getNumber = function (str, value) {
  let num;

  do {
    num = prompt(str, value);
  } while (!isNumber(num));

  return +num;
};

const appData = {
  title: "",
  screens: "",
  screenPrice: 0,
  adaptive: false,
  allServicePrices: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  services: [],
  rollback: 55,

  asking: function () {
    appData.title = prompt(
      "Как называется ваш проект?",
      " КальКулятор верСтки"
    );
    appData.screens = prompt(
      "Какие типы экранов нужно разработать?",
      "Простой, сложный"
    );
    appData.screenPrice = getNumber("Сколько будет стоить данная работа?");
    appData.adaptive = confirm("Нужен ли адаптив на сайте?");
  },
  getAllServicePrices: function () {
    let sum = 0;

    while (true) {
      let str = prompt(
        "Какой дополнительный тип услуги нужен? (оставьте пустой или нажмите отмена если больше не нужны)"
      );

      if (str === "" || str === null) {
        break;
      }

      let value = getNumber("Сколько это будет стоить?");

      appData.services.push([str, value]);
      sum += value;
    }

    return sum;
  },

  getFullPrice: function (screenPrice, allServicePrices) {
    return screenPrice + allServicePrices;
  },

  getTitle: function (title) {
    let trimmedTitle = title.trim();

    return (
      trimmedTitle[0].toUpperCase() + trimmedTitle.substring(1).toLowerCase()
    );
  },

  getServicePercentPrices: function (fullPrice, rollback) {
    return Math.ceil(fullPrice - fullPrice * (rollback / 100));
  },

  getRollbackMessage: function (price) {
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
  },
  logger: function () {
    for (let key in appData) {
      console.log(
        key,
        typeof appData[key],
        typeof appData[key] !== "function" ? appData[key] : ""
      );
    }
  },
  start: function () {
    appData.asking();

    appData.allServicePrices = appData.getAllServicePrices();
    appData.fullPrice = appData.getFullPrice(
      appData.screenPrice,
      appData.allServicePrices
    );
    appData.servicePercentPrice = appData.getServicePercentPrices(
      appData.fullPrice,
      appData.rollback
    );
    appData.title = appData.getTitle(appData.title);

    appData.logger();
  },
};

appData.start();
