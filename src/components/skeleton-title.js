class SkeletonTitle extends HTMLElement {
  constructor() {
    super();

    this._style = document.createElement("style");
  }

  connectedCallback() {
    this.render();
  }

  updateStyle() {
    this._style.textContent = ``;
  }

  render() {
    this.updateStyle();

    this.innerHTML = `
    ${this._style.outerHTML}
    `;

    this.innerHTML = `
  <div class="skeleton-title-container">
    <div class="small-card">
      <div class="skeleton-title"></div>
      <div class="skeleton-button"></div>
      <div class="skeleton-button"></div>
    </div>
    <div class="small-card">
      <div class="skeleton-title"></div>
      <div class="skeleton-button"></div>
      <div class="skeleton-button"></div>
    </div>
    <div class="small-card">
      <div class="skeleton-title"></div>
      <div class="skeleton-button"></div>
      <div class="skeleton-button"></div>
    </div>
  </div>
    `;
  }
}

customElements.define("skeleton-title", SkeletonTitle);
