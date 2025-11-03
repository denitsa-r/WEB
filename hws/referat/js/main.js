// Initialize syntax highlighting
document.addEventListener("DOMContentLoaded", (event) => {
  hljs.highlightAll();
});

// Interactive Grid Example
const interactiveGrid = {
  container: document.getElementById("interactiveGrid"),
  addRowButton: document.getElementById("addRow"),
  addColumnButton: document.getElementById("addColumn"),
  removeRowButton: document.getElementById("removeRow"),
  removeColumnButton: document.getElementById("removeColumn"),
  rows: 1,
  columns: 3,
  itemCount: 0,

  init() {
    this.addRowButton.addEventListener("click", () => this.addRow());
    this.addColumnButton.addEventListener("click", () => this.addColumn());
    this.removeRowButton.addEventListener("click", () => this.removeRow());
    this.removeColumnButton.addEventListener("click", () =>
      this.removeColumn()
    );
    this.updateGrid();
  },

  addRow() {
    this.rows++;
    this.updateGrid();
  },

  addColumn() {
    this.columns++;
    this.updateGrid();
  },

  removeRow() {
    if (this.rows > 1) {
      this.rows--;
      this.updateGrid();
    }
  },

  removeColumn() {
    if (this.columns > 1) {
      this.columns--;
      this.updateGrid();
    }
  },

  updateGrid() {
    // Clear the grid
    this.container.innerHTML = "";

    // Update grid template
    this.container.style.gridTemplateColumns = `repeat(${this.columns}, 1fr)`;
    this.container.style.gridTemplateRows = `repeat(${this.rows}, 100px)`;

    // Add items with alternating colors
    for (let i = 0; i < this.rows * this.columns; i++) {
      const newItem = document.createElement("div");
      newItem.className = "grid-item";
      newItem.textContent = i + 1;

      // Alternate between black and white
      if (i % 2 === 0) {
        newItem.classList.add("black");
      } else {
        newItem.classList.add("white");
      }

      this.container.appendChild(newItem);
    }
  },
};

// Initialize the interactive grid
interactiveGrid.init();
