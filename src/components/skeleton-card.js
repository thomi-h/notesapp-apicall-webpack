class SkeletonCard extends HTMLElement {
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
    
  <div class="skeleton-card-container">
    <div class="card">
      <div class="skeleton-title"></div>
      <div class="skeleton-note"></div>
      <div class="skeleton-buttons">
        <div class="skeleton-button"></div>
        <div class="skeleton-button"></div>
      </div>
    </div>
  </div>
    `;
  }
}

customElements.define("skeleton-card", SkeletonCard);
