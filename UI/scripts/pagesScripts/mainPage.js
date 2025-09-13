import { LiveSearch } from "../modules/liveSearch.js";
const initMain = () => {
  const fromCity = document.getElementById("fromCity");
  const fromList = document.getElementById("fromList");
  const whereCity = document.getElementById("whereCity");
  const whereList = document.getElementById("whereList");
  const body = document.querySelector("body");

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
