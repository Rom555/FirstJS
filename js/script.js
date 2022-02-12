"use strict";

const title = document.getElementsByTagName("h1")[0];

const btnCollection = document.getElementsByClassName("handler_btn");
const btnStart = btnCollection[0];
const btnReset = btnCollection[1];

const btnAdd = document.querySelector(".screen-btn");

const otherItemsPercent = document.querySelectorAll(".other-items.percent");
const otherItemsNumber = document.querySelectorAll(".other-items.number ");

const range = document.querySelector(".rollback input[type=range]");
const rangeValue = document.querySelector(".rollback span.range-value");

const totalInputs = document.getElementsByClassName("total-input");
const total = totalInputs[0];
const totalCount = totalInputs[1];
const totalCountOther = totalInputs[2];
const fullTotalCount = totalInputs[3];
const totalCountRollback = totalInputs[4];

let screens = document.querySelectorAll(".screen");

const appData = {
  title: "",
  screens: [],
  screensCount: 0,
  screenPrice: 0,
  adaptive: false,
  servicePricesPercent: 0,
  servicePricesNumber: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  servicesPercent: {},
  servicesNumber: {},
  rollback: 0,

  init: function () {
    appData.addTitle();

    btnStart.addEventListener("click", function () {
      if (appData.dataCheck()) {
        appData.start();
      }
    });
    btnAdd.addEventListener("click", appData.addScreenBlock);
    range.addEventListener("input", appData.changeRollback);
  },
  addTitle: function () {
    document.title = title.textContent;
  },
  dataCheck: function () {
    let flag = true;

    screens = document.querySelectorAll(".screen");

    screens.forEach(function (screen) {
      const selectValue = screen.querySelector("select").value;
      const inputValue = screen.querySelector("input").value;

      if (!selectValue || !inputValue) {
        flag = false;
      }
    });

    return flag;
  },
  start: function () {
    appData.clearData();
    appData.addScreens();
    appData.addServices();
    appData.addPrices();

    appData.showResult();
    // appData.logger();
  },
  showResult: function () {
    total.value = appData.screenPrice;
    totalCount.value = this.screensCount;
    totalCountOther.value =
      appData.servicePricesPercent + appData.servicePricesNumber;
    fullTotalCount.value = appData.fullPrice;
    totalCountRollback.value = appData.servicePercentPrice;
  },
  addScreens: function () {
    screens = document.querySelectorAll(".screen");

    screens.forEach(function (screen, index) {
      const select = screen.querySelector("select");
      const input = screen.querySelector("input");
      const selectedName = select.options[select.selectedIndex].textContent;

      appData.screens.push({
        id: index,
        name: selectedName,
        price: +select.value * +input.value,
        count: +input.value,
      });
    });
  },
  addScreenBlock: function () {
    const cloneScreen = screens[0].cloneNode(true);

    screens[screens.length - 1].after(cloneScreen);
  },
  addServices: function () {
    otherItemsPercent.forEach(function (item) {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");

      if (check.checked) {
        appData.servicesPercent[label.textContent] = +input.value;
      }
    });

    otherItemsNumber.forEach(function (item) {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");

      if (check.checked) {
        appData.servicesNumber[label.textContent] = +input.value;
      }
    });
  },
  addPrices: function () {
    for (let screen of appData.screens) {
      appData.screenPrice += +screen.price;
      appData.screensCount += +screen.count;
    }

    for (let key in appData.servicesPercent) {
      appData.servicePricesPercent +=
        appData.screenPrice * (appData.servicesPercent[key] / 100);
    }

    for (let key in appData.servicesNumber) {
      appData.servicePricesNumber += appData.servicesNumber[key];
    }

    appData.fullPrice =
      +appData.screenPrice +
      appData.servicePricesPercent +
      appData.servicePricesNumber;

    appData.servicePercentPrice = Math.ceil(
      appData.fullPrice - appData.fullPrice * (appData.rollback / 100)
    );
  },
  changeRollback: function () {
    rangeValue.textContent = range.value + "%";
    appData.rollback = range.value;
  },

  clearData: function () {
    appData.screens = [];
    appData.screensCount = 0;
    appData.screenPrice = 0;
    appData.servicePricesPercent = 0;
    appData.servicePricesNumber = 0;
    appData.servicesPercent = {};
    appData.servicesNumber = {};
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
};

appData.init();
