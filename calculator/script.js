"use strict";

var calculatorCount = 1;
// button to create a new calculator or that calls the createNewCalculator function
document.getElementById("new-calculator-btn").addEventListener("click", function () {
  calculatorCount++;
  createNewCalculator(calculatorCount);
});
//initiating the UI with one calculator   
createNewCalculator(1);
//function to create new calculator UI
function createNewCalculator(id) {
  var calculator = new Calculator();
  var container = document.getElementById("calculator-template").content.cloneNode(true).querySelector(".calculator");
  // Handle button clicks
  container.querySelector(".buttons").addEventListener("click", function (event) {
    var btnValue = event.target.value;
    //returns if it is not a button
    if (!btnValue) {
      return;
    }
    //switch to perform corresponding operations
    handleKeys(btnValue);
  });
  //updating heading
  container.querySelector("label").innerText += " " + id;
  //display element - inputField
  var input = container.querySelector(".inputField");
  //display element - operationField
  var operationField = container.querySelector(".operationField");
  //history ul element
  var historyUl = container.querySelector(".history-list");
  //history container element
  var history = container.querySelector(".history");
  //performing operations correspoding to the button's value
  var clear = false; // flag to clear  display
  function handleKeys(btnValue) {
    if (clear) {
      input.value = "";
      clear = false;
    }
    switch (btnValue) {
      case "=":
        if (!input.value.trim()) {
          return;
        }
        try {
          var result = calculator.evaluate(input.value, input, operationField);
          input.value = result.result;
          operationField.innerText = result.operation;
          clear = true;
        } catch (error) {
          if (error.continue) {
            alert(error.error);
          } else {
            input.value = "ERROR!" + error.error;
            clear = true;
          }
        }
        break;

      case "store":
        calculator.storeActive = true;
        calculator.recallActive = false;
        break;

      case "recall":
        calculator.storeActive = false;
        calculator.recallActive = true;
        break;

      case "rad":
        calculator.radian = true;
        container.querySelector(".rad-btn").classList.add("active");
        container.querySelector(".deg-btn").classList.remove("active");
        break;

      case "deg":
        calculator.radian = false;
        container.querySelector(".deg-btn").classList.add("active");
        container.querySelector(".rad-btn").classList.remove("active");
        break;

      case "reset":
        calculator.memory = {};
        break;

      case "+":
      case "-":
      case "*":
      case "/":
      case "^":
        //Handle operators
        if (input.value.length >= 0) {
          if (["*", "/"].includes(input.value[input.value.length - 1]) && btnValue === '-') {
            input.value += btnValue;
          } else if (/[+\-*\^/]/.test(input.value[input.value.length - 1])) {
            // Replace last operator with new operator
            input.value = input.value.slice(0, -1) + btnValue;
          } else {
            // Append new operator
            input.value += btnValue;
          }
        }
        break;

      case "X":
      case "Y":
      case "Z":
      case "W":
        calculator.storeActive &&
          calculator.store(btnValue, input.value, operationField);
        calculator.recallActive && (input.value += calculator.recall(btnValue));
        break;

      case "ac":
        input.value = operationField.innerText = "";
        break;

      case "bsp":
        input.value = input.value.slice(0, -1);
        break;

      case "history":
        showHistory();
        break;

      default:
        if (
          (["e", "π", "s", "!", ")", "%"].includes(
              input.value[input.value.length - 1]
            ) &&
            btnValue != ")") ||
          (!isNaN(input.value[input.value.length - 1]) && ["e", "π"].includes(btnValue))
        ) {
          // Add '*' if the last character is a symbol or ')' and the new value is not an operator or '('
          input.value += "*" + btnValue;
        } else {
          // Append the new value directly
          input.value += btnValue;
        }
    }
  }
  container.querySelector(".close-btn").addEventListener("click", function () {
    container.remove();
    calculatorCount--; // Remove the calculator from the DOM
  });
  container.querySelector(".history__close-btn").addEventListener("click", function () {
    history.style.display = "none"; // closes the history list
  });
  //function to generate the history list and display it
  function showHistory() {
    historyUl.innerHTML = "";
    calculator.history.forEach(function (entry) {
      var li = document.createElement("li");
      li.textContent = `${entry.expression} = ${entry.result}`;
      li.addEventListener("click", function () {
        input.value = entry.result;
        operationField.innerText = entry.expression;
        history.style.display = "none";
      });
      historyUl.appendChild(li);
    });
    history.style.display = "block";
  }
  //adding the keydown to each container
  container.addEventListener("keydown", function (event) {
    event.preventDefault();
    var btnValue;
    // Map valid keyboard keys to calculator button values
    switch (event.key) {
      case "Enter":
        btnValue = "=";
        break;
      case "Backspace":
        btnValue = "bsp";
        break;
      case "Escape":
        btnValue = "ac";
        break;
      case "+":
      case "-":
      case "*":
      case "/":
      case "^":
      case "%":
      case "!":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
      case "0":
      case "(":
      case ")":
        btnValue = event.key;
        break;
      case "s":
        btnValue = "sin("; // Add 'sin(' when 's' is pressed
        break;
      case "c":
        btnValue = "cos("; // Add 'cos(' when 'c' is pressed
        break;
      case "t":
        btnValue = "tan("; // Add 'tan(' when 't' is pressed
        break;
      default:
        // Ignore invalid inputs like 'r', 'y', 'z', etc.
        return;
    }
    if (btnValue) {
      handleKeys(btnValue);
    }
  });
  // Append the new calculator to the container
  document.querySelector(".calculator-container").appendChild(container);
  input.focus();
}

function Calculator() {
  this.numbers = [];
  this.operators = [];
  this.history = [];
  this.storeActive = false;
  this.recallActive = false;
  this.memory = {};
  this.lastAnswer = 0;
  this.radian = true;
  //function to store
  this.store = function (variable, value, operationField) {
    if (value.trim()) {
      this.memory[variable] = value;
      operationField.innerText = variable + "→";
      this.storeActive = false;
    }
  };
  //function to recall
  this.recall = function (variable) {
    if (this.memory[variable] !== undefined) {
      return this.memory[variable];
    } else {
      return "No value in " + variable;
    }
  };
  //function to find factorial
  this.factorial = function (n) {
    if (n === 0 || n === 1) return 1;
    var result = 1;
    for (var i = 2; i <= n; i++) {
      result *= i;
    }
    return result;
  };
  // Replace scientific functions with their computed values
  this.preprocessExpression = function (expression) {
    // Replace percentages that are not preceded by a division operator
    function replacePercentages(expr) {
      return expr.replace(/(?<=[\+\-\*])(?<!\d)(\d+(\.\d+)?)([\+\-\*])(\d+(\.\d+)?)(%)/g, function (match, num1, decimal1, operator, num2) {
        var percentageValue = parseFloat(num2) / 100;
        var result;
        switch (operator) {
          case '+':
            result = (parseFloat(num1) + (parseFloat(num1) * percentageValue)).toString();
            break;
          case '-':
            result = (parseFloat(num1) - (parseFloat(num1) * percentageValue)).toString();
            break;
          case '*':
            result = (parseFloat(num1) * percentageValue).toString();
            break;
          default:
            result = match; // Unrecognized operator
        }
        return result;
      });
    }
    // Process percentages and check if more replacements are needed
    var newExpression = replacePercentages(expression);
    while (/(?<=[\+\-\*])(\d+(\.\d+)?)([\+\-\*])(\d+(\.\d+)?)(%)/g.test(newExpression)) {
      newExpression = replacePercentages(newExpression);
    }
    return (
      newExpression
      .replace(/pi|π/gi, Math.PI.toString())
      .replace(/^(\d+(\.\d+)?)%/g, function (match, num) {
        return num + '*0.01';
      })
      .replace(/(?<!\w)e(?![\w\()])/g, Math.E.toString())
      .replace(/(\d+(\.\d+)?)([E]\d+)/g, function (match, base, decimal, exponent) {
        return parseFloat(base + exponent).toString();
      })
      .replace(/(\d+(\.\d+)?)([e])/g, function (match, value) {
        return (parseFloat(value) * Math.E).toString();
      })
      .replace(/(\d+)\s*ans/g, function (match, number) {
        return number + "*" + this.lastAnswer;
      }.bind(this))
      .replace(/(^|[+\-*/\^\(\)])\s*ans/g, function (match, operator) {
        return operator + this.lastAnswer;
      }.bind(this))
      .replace(/sqrt\(((?:[^)(]+|\((?:[^)(]+|\([^)(]*\))*\))*)\)/g, function (match, innerExpression) {
        return Math.sqrt(parseFloat(this.evaluate(innerExpression).result)).toString();
      }.bind(this))
      .replace(/log\(((?:[^)(]+|\((?:[^)(]+|\([^)(]*\))*\))*)\)/g, function (match, innerExpression) {
        return Math.log10(parseFloat(this.evaluate(innerExpression).result)).toString();
      }.bind(this))
      .replace(/ln\(((?:[^)(]+|\((?:[^)(]+|\([^)(]*\))*\))*)\)/g, function (match, innerExpression) {
        return Math.log(parseFloat(this.evaluate(innerExpression).result)).toString();
      }.bind(this))
      .replace(/sin\(((?:[^)(]+|\((?:[^)(]+|\([^)(]*\))*\))*)\)/g, function (match, innerExpression) {
        return this.radian ? Math.sin(parseFloat(this.evaluate(innerExpression).result)) : Math.sin((parseFloat(this.evaluate(innerExpression).result) * Math.PI) / 180);
      }.bind(this))
      .replace(/cos\(((?:[^)(]+|\((?:[^)(]+|\([^)(]*\))*\))*)\)/g, function (match, innerExpression) {
        return this.radian ? Math.cos(parseFloat(this.evaluate(innerExpression).result)) : Math.cos((parseFloat(this.evaluate(innerExpression).result) * Math.PI) / 180);
      }.bind(this))
      .replace(/tan\(((?:[^)(]+|\((?:[^)(]+|\([^)(]*\))*\))*)\)/g, function (match, innerExpression) {
        return this.radian ? Math.tan(parseFloat(this.evaluate(innerExpression).result)) : Math.tan((parseFloat(this.evaluate(innerExpression).result) * Math.PI) / 180);
      }.bind(this))
      .replace(/(\d+)!/g, function (match, innerExpression) {
        return ("(" + this.factorial(parseInt(this.evaluate(innerExpression).result)) + ")");
      }.bind(this)));
  };
  //function to push history
  this.pushHistory = function (expression, result) {
    if (
      this.history.length == 0 ||
      this.history[this.history.length - 1].expression != expression
    ) {
      this.history.push({
        expression: expression,
        result: result,
      });
    }
    if (this.history.length > 10) {
      this.history.shift();
    }
  };
  // Validate the expression
  this.validateExpression = function (expression) {
    if (!/^[\d+\-*/^().e%]+$/.test(expression)) {
      throw ({
        continue: false,
        error: "Invalid input"
      });
    }
    // Check if the last char is an operator
    var lastChar = expression[expression.length - 1];
    if (/[\+\-\*\/\^]/.test(lastChar)) {
      throw ({
        continue: true,
        error: "Expression cannot end with an operator."
      });
    }
    // Check for equal parentheses
    var openParenthesesCount = 0;
    for (var i = 0; i < expression.length; i++) {
      var char = expression[i];
      if (char === "(") openParenthesesCount++;
      if (char === ")") openParenthesesCount--;
      if (openParenthesesCount < 0)
        throw ({
          continue: true,
          error: "ERROR! Too many closing parentheses."
        });
    }
    if (openParenthesesCount > 0)
      throw ({
        continue: true,
        error: "ERROR! Too many open parentheses."
      });
    //check for consecutive operators
    if (/[\+\*\/]{2,}/.test(expression)) {
      throw ({
        continue: false,
        error: "Consecutive operators or invalid operator placement."
      });
    }

  };

  this.getPrecedence = function (op) {
    if (op === "+" || op === "-") return 1;
    if (op === "*" || op === "/") return 2;
    if (op === "^") return 3;
    if (op === "%") return 5;
    return 0;
  };

  this.applyOperator = function () {
    var op = this.operators.pop();
    if (op == "%") {
      var b = this.numbers.pop();
      var a = this.numbers[this.numbers.length - 1];
      this.numbers.push(a * (b / 100));
    } else {
      if (this.numbers.length < 2) {
        throw ({
          continue: false,
          error: "Insufficient operands."
        });
      }

      var b = this.numbers.pop();
      var a = this.numbers.pop();

      if (op === "/" && b === 0) {
        throw ({
          continue: true,
          error: "Division by zero is not allowed."
        });
      }

      switch (op) {
        case "+":
          this.numbers.push(a + b);
          break;
        case "-":
          this.numbers.push(a - b);
          break;
        case "*":
          this.numbers.push(a * b);
          break;
        case "/":
          this.numbers.push(a / b);
          break;
        case "^":
          this.numbers.push(Math.pow(a, b));
          break;
      }
    }
  };

  this.evaluateParentheses = function () {
    while (
      this.operators.length > 0 &&
      this.operators[this.operators.length - 1] !== "("
    ) {
      this.applyOperator();
    }
    this.operators.pop(); // Remove the '('
  };

  this.evaluate = function (expression) {
    if (expression.length === 0) {
      return;
    }
    var originalExpression = expression;
    // Preprocess the expression to replace scientific functions
    // if (/[πeE!%sin|cos|tan|sqrt|log|ln]/.test(expression)) {
    //   // Preprocess the expression to replace scientific functions
    expression = this.preprocessExpression(expression);
    // }
    // Validate the processed expression
    this.validateExpression(expression);
    // Tokenize the input expression
    var tokens = expression.match(/(\d+(\.\d+)?|[\+\-\*\/\^\(\)%])/g);
    if (!tokens) throw ({
      continue: false,
      error: "Invalid expression format."
    });
    //loop to push tokens o to the corresponding stacks
    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];
      if (/\d/.test(token)) {
        // If the token is a number, push it to the numbers stack
        this.numbers.push(parseFloat(token));
      } else if (token === "(") {
        // Push '(' to the operators stack
        this.operators.push(token);
      } else if (token === ")") {
        // Evaluate expressions within parentheses
        this.evaluateParentheses();
      } else if (/[\+\-\*\/\^%]/.test(token)) {

        // Handle operators
        if (token === "-" && (i === 0 || tokens[i - 1] === "(") || ["*", "/"].includes(tokens[i - 1])) {
          // Handle unary minus
          this.numbers.push(0); // or -1
          this.operators.push("-"); // or "*"
        } else if (token === "+" && (i === 0 || tokens[i - 1] === "(")) {
          // Handle unary plus
          this.numbers.push(0); // or 1
          this.operators.push("+"); // or "*"
        } else {
          while (
            this.operators.length > 0 &&
            this.getPrecedence(this.operators[this.operators.length - 1]) >=
            this.getPrecedence(token)
          ) {
            this.applyOperator();
          }
          this.operators.push(token);
        }
      }
    }
    //Apply remaining operators
    while (this.operators.length > 0) {
      this.applyOperator();
    }
    // Save the evaluated expression and result to history
    var result = this.numbers.pop();
    this.lastAnswer = result;
    //pushing on to the history
    this.pushHistory(originalExpression, result);

    return {
      result: result,
      operation: result == originalExpression ? "ans" : originalExpression,
    };
  };
}
