import initMain from "./pagesScripts/mainPage.js";
import initFlights from "./pagesScripts/flightsPage.js";

const page = document.body.dataset.page;

switch (page) {
  case "main":
    await initMain();
  case "flights":
    await initFlights();
}
