const title = "FirstJS";
const screens = "Простые, Сложные, Интерактивные";
const screenPrice = 12000;
const rollback = 55;
const fullPrice = 24000;
const adaptive = true;

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
