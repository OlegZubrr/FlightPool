class ErrorBox {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
  }

  show = (message, duration = 300) => {
    this.container.textContent = message;
    this.container.classList.add("show");

    setTimeout(() => {
      this.hide();
    }, duration);
  };

  hide = () => {
    this.container.classList.remove("show");
  };
}

export { ErrorBox };
