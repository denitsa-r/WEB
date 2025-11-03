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
  activeMessages: 0,

  init() {
    // Create error messages container
    this.errorContainer = document.createElement('div');
    this.errorContainer.style.cssText = `
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      flex-direction: column;
      gap: 10px;
      z-index: 1000;
    `;
    document.body.appendChild(this.errorContainer);

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

  showError(message) {
    // Create and show error message
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.textContent = message;
    errorMessage.style.cssText = `
      background-color: #7f170e;
      color: #fbeccb;
      padding: 1rem;
      border-radius: 5px;
      animation: fadeOut 3s forwards;
    `;

    // Add animation keyframes
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeOut {
        0% { opacity: 1; }
        70% { opacity: 1; }
        100% { opacity: 0; }
      }
    `;
    document.head.appendChild(style);

    this.errorContainer.appendChild(errorMessage);

    // Remove the message after animation
    setTimeout(() => {
      errorMessage.remove();
      style.remove();
    }, 3000);
  },

  removeRow() {
    if (this.rows > 1) {
      this.rows--;
      this.updateGrid();
    } else {
      this.showError('Не може да премахнете последния ред!');
    }
  },

  removeColumn() {
    if (this.columns > 1) {
      this.columns--;
      this.updateGrid();
    } else {
      this.showError('Не може да премахнете последната колона!');
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

// Menu functionality
const menu = {
  burger: document.getElementById("burger"),
  links: document.getElementById("links"),
  menuItems: document.querySelectorAll("#links a"),

  init() {
    // Toggle menu on burger click
    this.burger.addEventListener("click", (e) => {
      e.stopPropagation();
      this.links.classList.toggle("show");
    });

    // Close menu when clicking a menu item
    this.menuItems.forEach(item => {
      item.addEventListener("click", () => {
        this.links.classList.remove("show");
      });
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!this.links.contains(e.target) && !this.burger.contains(e.target)) {
        this.links.classList.remove("show");
      }
    });
  }
};

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  interactiveGrid.init();
  menu.init();
});
