"use strict";

const bookList = document.querySelector(".books");
const books = document.querySelectorAll(".book");
const book2List = books[0].querySelector("ul");
const book2ListItems = books[0].querySelectorAll("li");
const book5List = books[5].querySelector("ul");
const book5ListItems = books[5].querySelectorAll("li");
const book6ListItems = books[2].querySelectorAll("li");

books[0].before(books[1]);
books[5].after(books[2]);
books[3].before(books[4]);

document.querySelector("body").style.backgroundImage =
  "url(../image/you-dont-know-js.jpg)";

books[4].querySelector("h2 a").textContent =
  "Книга 3. this и Прототипы Объектов";

document.querySelector(".adv").remove();

book2List.append(
  book2ListItems[3],
  book2ListItems[6],
  book2ListItems[8],
  book2ListItems[4],
  book2ListItems[5],
  book2ListItems[7],
  book2ListItems[9],
  book2ListItems[2],
  book2ListItems[10]
);

book5List.prepend(
  book5ListItems[0],
  book5ListItems[1],
  book5ListItems[9],
  book5ListItems[3],
  book5ListItems[4],
  book5ListItems[2],
  book5ListItems[6],
  book5ListItems[7],
  book5ListItems[5],
  book5ListItems[8]
);

book6ListItems[8].insertAdjacentHTML(
  "afterend",
  "<li>Глава 8: За пределами ES6</li>"
);
