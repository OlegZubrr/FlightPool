class ErrorBox {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.timeoutId = null;
    this.init();
  }

  init = () => {
    this.container.addEventListener("click", () => {
      this.hide();
    });
  };

  show = (message, duration = 3000) => {
    this.container.textContent = message;
    this.container.classList.add("show");

    console.log(this.timeoutId);

    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

    this.timeoutId = setTimeout(() => {
      this.hide();
    }, duration);
  };

  hide = () => {
    this.container.classList.remove("show");
  };
}

export { ErrorBox };
