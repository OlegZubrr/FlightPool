import { initMain } from "./pagesScripts/mainPage.js";

const page = document.body.dataset.page;
console.log(page);

switch (page) {
  case "main":
    initMain();
}
