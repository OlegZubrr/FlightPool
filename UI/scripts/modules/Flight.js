class Flight {
  constructor({ from, to, flight, aircraft, departure, arrival, price }) {
    this.from = from;
    this.to = to;
    this.flight = flight;
    this.aircraft = aircraft;
    this.departureRaw = new Date(departure);
    this.arrivalRaw = new Date(arrival);
    this.price = price;
    this.isInBascet = false;

    const totalMinutes = Math.round(
      (this.arrivalRaw - this.departureRaw) / (1000 * 60)
    );
    this.flightTime = {
      hours: Math.floor(totalMinutes / 60),
      minutes: totalMinutes % 60,
    };
  }
  static maxSelectedFlights = 0;
  static cureentSelectedFlights = 0;

  formatTime = (date) => {
    const day = date.getDate();
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const month = monthNames[date.getMonth()];
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return {
      day: `${day} ${month}`,
      hours,
      minutes,
    };
  };

  renderBascetVersion = (bascetContainer) => {
    const cardRow = document.createElement("li");
    cardRow.setAttribute("id", `li${this.flight}`);
    cardRow.innerHTML = `<div class="sideBar-flightCard">
            <div class="priceSide">
              <p class="price">${this.price}$</p>
              <p class="flight">${this.flight}</p>
            </div>
            <div class="tripSide">
              <p class="from">${this.from}</p>
              <span class="arrow">&#8594;</span>
              <p class="to">${this.to}</p>
            </div>
          </div>
          <a class="deleteFromBascetBtn">X</a>`;

    const deleteBtn = cardRow.querySelector(".deleteFromBascetBtn");

    deleteBtn.addEventListener("click", () => {
      const row = bascetContainer.querySelector(`#li${this.flight}`);
      const flightCard = document.getElementById(this.flight);
      flightCard.classList.remove("selected");
      this.isInBascet = false;
      row.remove();
      if (Flight.cureentSelectedFlights > 0) {
        Flight.cureentSelectedFlights--;
      }
    });
    bascetContainer.appendChild(cardRow);
  };

  render = (bascetContainer) => {
    const departure = this.formatTime(this.departureRaw);
    const arrival = this.formatTime(this.arrivalRaw);

    const flightCard = document.createElement("div");
    flightCard.className = "flightCart";
    flightCard.setAttribute("id", this.flight);
    flightCard.innerHTML = `<div class="priceSide">
            <h4 class="flightPrice">${this.price}$</h4>
            <div class="aircraftData">
              <h5 class="aircraft">${this.aircraft}</h5>
              <h5 class="flight">${this.flight}</h5>
            </div>
            <a class="SelectFlightBtn">Select</a>
          </div>
          <div class="flightSide">
            <div class="dataOfFlight">
              <h4 class="timeOfDeparture">${departure.hours}:${departure.minutes}</h4>
              <h5 class="cityOfDeparture">${this.from}</h5>
              <h5 class="dateOfDeparture">${departure.day}</h5>
            </div>
            <div class="flightTimeData">
              <img src="../assets/direct-flight.png" class="flightImg" alt="" />
              <h5 class="flightTime">${this.flightTime.hours}h:${this.flightTime.minutes}m</h5>
            </div>
            <div class="dataOfFlight">
              <h4 class="timeOfArrival">${arrival.hours}:${arrival.minutes}</h4>
              <h5 class="cityOfArrival">${this.to}</h5>
              <h5 class="dateOfArrival">${arrival.day}</h5>
            </div>
          </div>`;

    const flightTimeItem = flightCard.querySelector(".flightTime");
    const aircraftItem = flightCard.querySelector(".aircraftData");
    const selectBtn = flightCard.querySelector(".SelectFlightBtn");
    flightTimeItem.style.setProperty(
      "--tooltip-text-time",
      `'Flight Time: ${this.flightTime.hours}h ${this.flightTime.minutes}m'`
    );
    aircraftItem.style.setProperty(
      "--tooltip-text-aircraft",
      `'Aircraft: ${this.aircraft}\\A Flight Number: ${this.flight}'`
    );

    selectBtn.addEventListener("click", () => {
      const flightCard = document.getElementById(this.flight);
      if (!this.isInBascet) {
        if (Flight.cureentSelectedFlights < Flight.maxSelectedFlights) {
          Flight.cureentSelectedFlights++;
          this.renderBascetVersion(bascetContainer);
          flightCard.classList.add("selected");
          this.isInBascet = true;
        }
      } else {
        const row = bascetContainer.querySelector(`#li${this.flight}`);
        row.remove();
        this.isInBascet = false;
        if (Flight.cureentSelectedFlights > 0) {
          Flight.cureentSelectedFlights--;
          flightCard.classList.remove("selected");
        }
      }
    });

    return flightCard;
  };

  static sortByPrice(flights, ascending = true) {
    return flights.sort((a, b) => {
      if (ascending) {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
  }

  static sortByFlightTime(flights, ascending = true) {
    return flights.sort((a, b) => {
      const aMinutes = a.flightTime.hours * 60 + a.flightTime.minutes;
      const bMinutes = b.flightTime.hours * 60 + b.flightTime.minutes;
      return ascending ? aMinutes - bMinutes : bMinutes - aMinutes;
    });
  }

  static showFlightCards(flights, container, bascetContainer) {
    flights.forEach((flight, i) => {
      const flightCard = flight.render(bascetContainer);

      container.appendChild(flightCard);

      setTimeout(() => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            flightCard.classList.add("show");
          });
        });
      }, 300 * i);
    });
  }
}

export default Flight;
