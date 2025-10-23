import ApiClient from "../services/ApiClient.js";
import Flight from "../modules/Flight.js";

const initFlights = async () => {
  const flightsContainer = document.querySelector(".flightsData");
  const filters = JSON.parse(sessionStorage.getItem("filters"));

  let maxSelectedFlights = 0;
  let currentSelectedFlights = 0;

  if (filters.arrival) {
    maxSelectedFlights = 2;
  } else {
    maxSelectedFlights = 1;
  }

  Flight.maxSelectedFlights = maxSelectedFlights;

  const speedSortCB = document.getElementById("speedSortCB");
  const priceSortCB = document.getElementById("priceSortCB");
  const bascetContainer = document.querySelector(".sidebar-flights-container");

  const api = new ApiClient();

  const flightsData = (await api.post("/flights/search", filters)).data;
  const flights = [];

  flightsData.forEach((flightData) => {
    const flight = new Flight({ ...flightData });
    flights.push(flight);
  });

  Flight.showFlightCards(flights, flightsContainer, bascetContainer);

  speedSortCB.addEventListener("change", () => {
    if (speedSortCB.checked) {
      const flightCards = flightsContainer.getElementsByClassName("flightCart");
      Array.from(flightCards).forEach((flightCard) => {
        flightCard.remove();
      });

      Flight.sortByFlightTime(flights);

      Flight.showFlightCards(flights, flightsContainer, bascetContainer);
    }
  });
  priceSortCB.addEventListener("change", () => {
    if (priceSortCB.checked) {
      const flightCards = flightsContainer.getElementsByClassName("flightCart");
      Array.from(flightCards).forEach((flightCard) => {
        flightCard.remove();
      });

      Flight.sortByPrice(flights);

      Flight.showFlightCards(flights, flightsContainer, bascetContainer);
    }
  });
};

export default initFlights;
