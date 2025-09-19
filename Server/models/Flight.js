class Flight {
  constructor({
    from,
    to,
    flight,
    aircraft,
    departure,
    arrival,
    price,
    maxPassangers,
    occupiedPlaces,
    neededPlaces,
  }) {
    this.from = from;
    this.to = to;
    this.flight = flight;
    this.aircraft = aircraft;
    this.departure = new Date(departure);
    this.arrival = new Date(arrival);
    this.maxPassangers = maxPassangers;
    this.occupiedPlaces = occupiedPlaces;
    this.neededPlaces = neededPlaces;
    this.price = price;
    this.cost = price * Number(this.neededPlaces);
  }
}
