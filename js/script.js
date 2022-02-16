'use strict';

const title = document.getElementsByTagName('h1')[0];

const btnCollection = document.getElementsByClassName('handler_btn');
const btnStart = btnCollection[0];
const btnReset = btnCollection[1];

const btnAdd = document.querySelector('.screen-btn');

const otherItemsPercent = document.querySelectorAll('.other-items.percent');
const otherItemsNumber = document.querySelectorAll('.other-items.number ');

const range = document.querySelector('.rollback input[type=range]');
const rangeValue = document.querySelector('.rollback span.range-value');

const totalInputs = document.getElementsByClassName('total-input');
const total = totalInputs[0];
const totalCount = totalInputs[1];
const totalCountOther = totalInputs[2];
const fullTotalCount = totalInputs[3];
const totalCountRollback = totalInputs[4];

const checkboxs = document.querySelectorAll('.custom-checkbox');

const cmsCheckbox = document.querySelector('#cms-open');
const hiddenCmsVariants = document.querySelector('.hidden-cms-variants');
const hiddenCmsSelect = hiddenCmsVariants.querySelector('select');
const hiddenCmsInputWrapper = hiddenCmsVariants.querySelector(
  '.main-controls__input'
);
const hiddenCmsInput = hiddenCmsVariants.querySelector('input');

let screenSelects;
let screenInputs;
let screens;

const appData = {
  title: '',
  screens: [],
  screensCount: 0,
  screenPrice: 0,
  servicePricesPercent: 0,
  servicePricesNumber: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  servicesPercent: {},
  servicesNumber: {},
  rollback: 0,
  calculateState: true,
  cmsPercent: 0,

  init: function () {
    this.addTitle();

    btnStart.addEventListener('click', () => {
      if (this.dataCheck()) {
        this.start();
      }
    });
    btnReset.addEventListener('click', () => {
      this.reset();
    });

    btnAdd.addEventListener('click', this.addScreenBlock);
    range.addEventListener('input', this.changeRollback);

    cmsCheckbox.addEventListener('input', () => {
      hiddenCmsVariants.style.display =
        hiddenCmsVariants.style.display === 'none' ? 'flex' : 'none';
    });
    hiddenCmsSelect.addEventListener('input', function () {
      hiddenCmsInputWrapper.style.display =
        this.value === 'other' ? 'block' : 'none';
    });
  },
  addTitle: function () {
    document.title = title.textContent;
  },
  dataCheck: function () {
    let flag = true;
    screens = document.querySelectorAll('.screen');

    screens.forEach((screen) => {
      const selectValue = screen.querySelector('select').value;
      const input = screen.querySelector('input');

      if (!input.value) {
        flag = false;
      }
      if (!input.value.trim()) {
        input.value = '';
        flag = false;
      }
      if (!selectValue) {
        flag = false;
      }
    });

    if (cmsCheckbox.checked && hiddenCmsSelect.value === 'other') {
      if (!hiddenCmsInput.value) {
        flag = false;
      }
      if (!hiddenCmsInput.value.trim()) {
        hiddenCmsInput.value = '';
        flag = false;
      }
    }

    return flag;
  },
  start: function () {
    this.changeState();
    this.addScreens();
    this.addServices();
    this.addCmsValue();
    this.addPrices();

    this.showResult();
    this.logger();
  },
  reset: function () {
    this.clearAppData();
    this.clearSite();

    this.changeState();

    // this.logger();
  },
  changeState: function () {
    screenSelects = document.querySelectorAll('.screen select');
    screenInputs = document.querySelectorAll('.screen input');

    if (this.calculateState) {
      btnStart.style.display = 'none';
      btnReset.style.display = 'inline-block';
    } else {
      btnReset.style.display = 'none';
      btnStart.style.display = 'inline-block';
    }

    for (let item of [
      ...screenSelects,
      ...screenInputs,
      ...checkboxs,
      range,
      hiddenCmsInput,
      hiddenCmsSelect,
    ]) {
      item.disabled = this.calculateState;
    }

    this.calculateState = !this.calculateState;
  },
  showResult: function () {
    total.value = this.screenPrice;
    totalCount.value = this.screensCount;
    totalCountOther.value =
      this.servicePricesPercent + this.servicePricesNumber;
    fullTotalCount.value = this.fullPrice;
    totalCountRollback.value = this.servicePercentPrice;
  },
  addScreens: function () {
    screens = document.querySelectorAll('.screen');

    screens.forEach((screen, index) => {
      const select = screen.querySelector('select');
      const input = screen.querySelector('input');
      const selectedName = select.options[select.selectedIndex].textContent;

      this.screens.push({
        id: index,
        name: selectedName,
        price: +select.value * +input.value,
        count: +input.value,
      });
    });
  },
  addScreenBlock: function () {
    screens = document.querySelectorAll('.screen');

    const cloneScreen = screens[0].cloneNode(true);

    screens[screens.length - 1].after(cloneScreen);
  },
  addServices: function () {
    otherItemsPercent.forEach((item) => {
      const check = item.querySelector('input[type=checkbox]');
      const label = item.querySelector('label');
      const input = item.querySelector('input[type=text]');

      if (check.checked) {
        this.servicesPercent[label.textContent] = +input.value;
      }
    });

    otherItemsNumber.forEach((item) => {
      const check = item.querySelector('input[type=checkbox]');
      const label = item.querySelector('label');
      const input = item.querySelector('input[type=text]');

      if (check.checked) {
        this.servicesNumber[label.textContent] = +input.value;
      }
    });
  },
  addPrices: function () {
    for (let screen of this.screens) {
      this.screenPrice += +screen.price;
      this.screensCount += +screen.count;
    }

    for (let key in this.servicesPercent) {
      this.servicePricesPercent +=
        this.screenPrice * (this.servicesPercent[key] / 100);
    }

    for (let key in this.servicesNumber) {
      this.servicePricesNumber += this.servicesNumber[key];
    }

    this.fullPrice =
      (+this.screenPrice +
        this.servicePricesPercent +
        this.servicePricesNumber) *
      (1 + this.cmsPercent / 100);

    this.servicePercentPrice = Math.ceil(
      this.fullPrice - this.fullPrice * (this.rollback / 100)
    );
  },
  changeRollback: function () {
    rangeValue.textContent = range.value + '%';
    appData.rollback = +range.value;
  },
  showCmsVariants: function () {},
  cmsChangeValue: function () {},
  addCmsValue: function () {
    if (cmsCheckbox.checked) {
      this.cmsPercent =
        hiddenCmsSelect.value === 'other'
          ? +hiddenCmsInput.value.trim()
          : +hiddenCmsSelect.value;
    }
  },
  clearAppData: function () {
    this.screens = [];
    this.screensCount = 0;
    this.screenPrice = 0;
    this.servicePricesPercent = 0;
    this.servicePricesNumber = 0;
    this.fullPrice = 0;
    this.servicePercentPrice = 0;
    this.servicesPercent = {};
    this.servicesNumber = {};
    this.rollback = 0;
    this.cmsPercent = 0;
  },
  clearSite: function () {
    for (let i = 1; i < screens.length; i++) {
      screens[i].remove();
    }
    screenSelects[0].value = '';
    screenInputs[0].value = '';

    for (let item of checkboxs) {
      item.checked = false;
    }

    for (let item of totalInputs) {
      item.value = 0;
    }

    range.value = 0;
    rangeValue.textContent = '0%';

    hiddenCmsInput.value = '';
    hiddenCmsSelect.value = '';
    hiddenCmsVariants.style.display = 'none';
    hiddenCmsInputWrapper.style.display = 'none';
  },

  logger: function () {
    for (let key in this) {
      console.log(
        typeof this[key] !== 'function' ? key : key + '()',
        typeof this[key],
        typeof this[key] !== 'function' ? this[key] : ''
      );
    }
  },
};

appData.init();
