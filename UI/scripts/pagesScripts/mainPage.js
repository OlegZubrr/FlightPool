import { LiveSearch } from "../modules/liveSearch.js";
import { ErrorBox } from "../modules/ErrorBox.js";
import { NullChecker } from "../modules/NullChecker.js";
const initMain = () => {
  const fromCity = document.getElementById("fromCity");
  const fromList = document.getElementById("fromList");
  const whereCity = document.getElementById("whereCity");
  const whereList = document.getElementById("whereList");
  const sendDataBtn = document.getElementById("sendDataBtn");
  const departingInput = document.getElementById("departingInput");
  const returningInput = document.getElementById("returningInput");
  const passengersInput = document.getElementById("passengersInput");
  const body = document.querySelector("body");
  const errorBox = new ErrorBox("mainErrorBox");
  fromCity.addEventListener("click", (e) => {
    e.stopPropagation();
    whereList.classList.remove("show");
    fromList.classList.toggle("show");
  });

  whereCity.addEventListener("click", (e) => {
    e.stopPropagation();
    fromList.classList.remove("show");
    whereList.classList.toggle("show");
  });

  fromList.addEventListener("click", (e) => {
    const fromCityElement = e.target.closest(".fromCityElement");
    if (!fromCityElement) return;

    fromCity.textContent = fromCityElement.textContent;
    fromList.classList.remove("show");
  });
  whereList.addEventListener("click", (e) => {
    const whereCityElement = e.target.closest(".whereCityElement");
    if (!whereCityElement) return;

    whereCity.textContent = whereCityElement.textContent;
    whereList.classList.remove("show");
  });

  sendDataBtn.addEventListener("click", () => {
    const fromCityData = fromCity.textContent;
    const toCityData = whereCity.textContent;
    const departingData = departingInput.value;
    const returningData = returningInput.value;
    const passengersData = passengersInput.value;

    let errorMessage = NullChecker.defaultIfEmpty([
      {
        value: fromCityData,
        defaultValue: "You have not selected a departure city",
      },
      {
        value: toCityData,
        defaultValue: "You have not selected the city of arrival",
      },
      {
        value: departingData,
        defaultValue: "You have not entered a departure date",
      },
      {
        value: passengersData,
        defaultValue: "You have not entered a count of passangers",
      },
    ]);

    if (passengersData >= 9 || passengersData <= 0) {
      errorMessage = "Invalid count of passengers";
    }

    if (errorMessage != "") {
      errorBox.show(errorMessage);
      return;
    }
  });

  body.addEventListener("click", (e) => {
    if (!whereList.contains(e.target)) {
      whereList.classList.remove("show");
    }
    if (!fromList.contains(e.target)) {
      fromList.classList.remove("show");
    }
  });
};

export { initMain };
