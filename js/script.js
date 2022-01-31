"use strict";

const title = prompt("Как называется ваш проект?");
const screens = prompt(
  "Какие типы экранов нужно разработать?",
  "Простые, Сложные, Интерактивные"
);
const screenPrice = parseInt(
  prompt("Сколько будет стоить данная работа?", "12000")
);
const rollback = 55;
const adaptive = confirm("Нужен ли адаптив на сайте?");

const service1 = prompt("Какой дополнительный тип услуги нужен?");
const servicePrice1 = parseInt(prompt("Сколько это будет стоить?"));
const service2 = prompt("Какой дополнительный тип услуги нужен?");
const servicePrice2 = parseInt(prompt("Сколько это будет стоить?"));

const fullPrice = screenPrice + servicePrice1 + servicePrice2;

const servicePercentPrice = Math.ceil(fullPrice - (fullPrice * rollback) / 100);

console.log("title имеет тип данных " + typeof title);
console.log("fullPrice имеет тип данных " + typeof fullPrice);
console.log("adaptive имеет тип данных " + typeof adaptive);

console.log("screens имеет длину " + screens.length);

console.log("Стоимость верстки экранов " + screenPrice + " рублей");
console.log("Стоимость разработки сайта " + fullPrice + " рублей");

console.log(screens.toLowerCase().split(", "));

console.log(
  "Процент отката посреднику за работу " + (fullPrice * rollback) / 100
);

console.log(
  "Итоговая стоимость за вычетом отката посреднику " + servicePercentPrice
);

switch (true) {
  case fullPrice > 30000:
    console.log("Даем скидку в 10%");
    break;
  case 15000 < fullPrice && fullPrice <= 30000:
    console.log("Даем скидку в 5%");
    break;
  case 0 <= fullPrice && fullPrice <= 15000:
    console.log("Скидка не предусмотрена");
    break;
  default:
    console.log("Что то пошло не так");
}
