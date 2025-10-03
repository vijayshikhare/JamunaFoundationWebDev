const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");
const result = document.getElementById("result");
const year = document.getElementById("year");

year.textContent = new Date().getFullYear();

let currentInput = "";

// Button Clicks
buttons.forEach(button => {
  button.addEventListener("click", () => {
    if (button.classList.contains("clear")) {
      currentInput = "";
      display.value = "";
      result.textContent = "";
    } else if (button.classList.contains("delete")) {
      currentInput = currentInput.slice(0, -1);
      display.value = currentInput;
    } else if (button.classList.contains("calculate")) {
      try {
        let donation = eval(currentInput);
        display.value = donation;
        showResult(`💰 You donated $${donation}`);
      } catch {
        display.value = "Error";
      }
    } else if (button.classList.contains("impact")) {
      let donation = parseFloat(display.value) || 0;
      let trees = donation * 2; // Example: $1 = 2 trees
      animateImpact(donation, trees);
    } else {
      currentInput += button.dataset.value;
      display.value = currentInput;
    }
  });
});

// Show Result Text
function showResult(message) {
  result.style.opacity = 0;
  setTimeout(() => {
    result.textContent = message;
    result.style.opacity = 1;
  }, 200);
}

// Animate Impact Numbers
function animateImpact(donation, trees) {
  let start = 0;
  let duration = 1200;
  let increment = trees / (duration / 20);

  let counter = setInterval(() => {
    start += increment;
    if (start >= trees) {
      start = trees;
      clearInterval(counter);
    }
    result.textContent = `🌱 Your $${donation} donation will plant approx. ${Math.floor(start)} trees!`;
  }, 20);
}
