document.addEventListener("DOMContentLoaded", () => {
  const display = document.getElementById("display");
  const buttons = document.querySelectorAll(".btn");
  let expression = "";

  // Handle number and operator buttons
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const val = button.getAttribute("data-value");

      if (val === "=") {
        try {
          const sanitizedExpression = expression.replace(/×/g, "*").replace(/÷/g, "/");
          const result = eval(sanitizedExpression);

          updateHistory(expression + " = " + result);
          expression = result.toString();
          display.value = result;
        } catch (e) {
          display.value = "Error";
          expression = "";
        }
      } else {
        expression += val;
        display.value = expression;
      }
    });
  });

  // AC button
  document.getElementById("clear").addEventListener("click", () => {
    expression = "";
    display.value = "";
  });

  // ⌫ Erase button
  document.getElementById("erase").addEventListener("click", () => {
    expression = expression.slice(0, -1);
    display.value = expression;
  });
  
// Keyboard Support
  document.addEventListener("keydown", (event) => {
    const key = event.key;

    if (!isNaN(key) || "+-*/.".includes(key)) {
      expression += key;
      display.value = expression;
    } else if (key === "Enter") {
      try {
        const sanitizedExpression = expression.replace(/×/g, "*").replace(/÷/g, "/");
        const result = eval(sanitizedExpression);

        updateHistory(expression + " = " + result);
        expression = result.toString();
        display.value = result;
      } catch (e) {
        display.value = "Error";
        expression = "";
      }
    } else if (key === "Backspace") {
      expression = expression.slice(0, -1);
      display.value = expression;
    } else if (key.toLowerCase() === "c") {
      expression = "";
      display.value = "";
    }
  });

  // History functions
  function updateHistory(entry) {
    const historyBox = document.getElementById("history");
    const p = document.createElement("p");
    p.textContent = entry;
    historyBox.appendChild(p);

    let saved = JSON.parse(localStorage.getItem("calcHistory")) || [];
    saved.push(entry);
    localStorage.setItem("calcHistory", JSON.stringify(saved));
  }

  function loadHistory() {
    const historyBox = document.getElementById("history");
    let saved = JSON.parse(localStorage.getItem("calcHistory")) || [];
    saved.forEach((entry) => {
      const p = document.createElement("p");
      p.textContent = entry;
      historyBox.appendChild(p);
    });
  }

  // Clear history
  document.getElementById("clearHistoryBtn").addEventListener("click", () => {
    localStorage.removeItem("calcHistory");
    document.getElementById("history").innerHTML = '<p class="text-gray-400 italic">History:</p>';
  });

  // Load history when page loads
  loadHistory();
});
