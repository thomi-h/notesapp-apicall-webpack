class ArchiveItem extends HTMLElement {
  constructor() {
    super();

    this._title = this.getAttribute("title") || "NEED_TITLE";
    this._id = this.getAttribute("id");
  }

  connectedCallback() {
    this.render();

    this.addDeleteListener();
    this.addUnarchivedListener();
  }

  render() {
    this.innerHTML = `
        <div class="small-card">
        <h3 class="archive__title">${this._title}</h3>
        <button class="unarchived__button">Unarchived
        <button class="delete__archive">Delete</button>
        </div>
        `;
  }

  addDeleteListener() {
    const deleteButton = this.querySelector(".delete__archive");
    deleteButton.addEventListener("click", function () {
      this.dispatchEvent(
        new CustomEvent("delete-archive", {
          bubbles: true,
        }),
      );
    });
  }

  addUnarchivedListener() {
    const unarchivedButton = this.querySelector(".unarchived__button");
    unarchivedButton.addEventListener("click", function () {
      this.dispatchEvent(
        new CustomEvent("unarchive", {
          bubbles: true,
        }),
      );
    });
  }
}

customElements.define("archive-item", ArchiveItem);
