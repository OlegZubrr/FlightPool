import ApiClient from "../services/ApiClient.js";
import Flight from "../modules/Flight.js";

const initFlights = async () => {
  const flightsContainer = document.querySelector(".flightsData");
  const filters = JSON.parse(sessionStorage.getItem("filters"));

  let maxFlightsCount = 0;
  let currentFlightsCount = 0;

  if (filters.arrival) {
    maxFlightsCount = 2;
  } else {
    maxFlightsCount = 1;
  }

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
