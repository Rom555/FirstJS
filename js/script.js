"use strict";

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

const getString = function (str, value, notNullAndEmptyFlag = false) {
  let string;
  do {
    string = prompt(str, value);

    if (string === null || string === "") {
      if (notNullAndEmptyFlag) continue;
      break;
    }

    string = string.trim();
  } while (!isNaN(+string));

  return string;
};

const appData = {
  title: "",
  screens: [],
  screenPrice: 0,
  adaptive: false,
  allServicePrices: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  services: {},
  rollback: 55,

  asking: function () {
    let uniqueKey;

    appData.title = getString(
      "Как называется ваш проект?",
      " КальКулятор верСтки",
      true
    );

    uniqueKey = 0;
    while (true) {
      let name = getString(
        "Какие типы экранов нужно разработать? (оставьте пустой или нажмите отмена если больше не нужны)"
      );

      if (name === "" || name === null) {
        break;
      }

      let price = getNumber("Сколько это будет стоить?");

      appData.screens.push({ id: uniqueKey, name: name, price: price });
      uniqueKey++;
    }

    uniqueKey = 1;
    while (true) {
      let name = getString(
        "Какой дополнительный тип услуги нужен? (оставьте пустой или нажмите отмена если больше не нужны)"
      );

      if (name === "" || name === null) {
        break;
      }

      let price = getNumber("Сколько это будет стоить?");

      name = uniqueKey + ": " + name;

      appData.services[name] = price;
      uniqueKey++;
    }

    appData.adaptive = confirm("Нужен ли адаптив на сайте?");
  },

  getPrices: function () {
    appData.screenPrice = appData.screens.reduce(function (sum, screen) {
      return (sum += screen.price);
    }, 0);

    for (let key in appData.services) {
      appData.allServicePrices += +appData.services[key];
    }
  },

  getFullPrice: function () {
    appData.fullPrice = appData.screenPrice + appData.allServicePrices;
  },

  getTitle: function () {
    appData.title =
      appData.title[0].toUpperCase() + appData.title.substring(1).toLowerCase();
  },

  getServicePercentPrices: function () {
    appData.servicePercentPrice = Math.ceil(
      appData.fullPrice - appData.fullPrice * (appData.rollback / 100)
    );
  },

  getRollbackMessage: function () {
    switch (true) {
      case appData.fullPrice > 30000:
        console.log("Даем скидку в 10%");
        break;
      case 15000 < appData.fullPrice && appData.fullPrice <= 30000:
        console.log("Даем скидку в 5%");
        break;
      case 0 <= appData.fullPrice && appData.fullPrice <= 15000:
        console.log("Скидка не предусмотрена");
        break;
      default:
        console.log("Что то пошло не так");
    }
  },

  logger: function () {
    for (let key in appData) {
      console.log(
        typeof appData[key] !== "function" ? key : key + "()",
        typeof appData[key],
        typeof appData[key] !== "function" ? appData[key] : ""
      );
    }
  },

  start: function () {
    appData.asking();

    appData.getPrices();
    appData.getFullPrice();
    appData.getServicePercentPrices();
    appData.getTitle();

    appData.getRollbackMessage();

    appData.logger();
  },
};

appData.start();
