class LiveSearch {
  constructor(input, domList, dataList, domElementClass) {
    this.input = input;
    this.domList = domList;
    this.dataList = Array.from(dataList);
    this.domElementClass = domElementClass;

    this.init();
  }

  init = () => {
    this.input.addEventListener("input", () => {
      this.filterList();
    });
    this.filterList();
  };

  filterList = () => {
    const query = this.input.value.toLowerCase().trim();
    const limit = 50;
    Array.from(this.domList.children).forEach((domElement) => {
      domElement.remove();
    });
    let count = 0;

    for (const cityName of this.dataList) {
      let isVisible = cityName.toLowerCase().trim().includes(query);
      if (query == "") {
        isVisible = true;
      }
      if (isVisible) {
        const newCityElement = document.createElement("li");
        newCityElement.textContent = cityName;
        newCityElement.classList.add(this.domElementClass);
        this.domList.appendChild(newCityElement);
        count++;
        if (count >= limit) {
          break;
        }
      }
    }
  };
}

export { LiveSearch };
