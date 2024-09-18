"use strict";

var calculatorCount = 1;
// Function to create a new calculator
document
  .getElementById("new-calculator-btn")
  .addEventListener("click", function () {
    calculatorCount++;
    createNewCalculator(calculatorCount);
  });
//function to create new calculator UI
createNewCalculator(1);

function createNewCalculator(id) {
  var calculator = new Calculator();
  var container = document
    .getElementById("calculator-template")
    .content.cloneNode(true)
    .querySelector(".calculator");
  // Handle button clicks
  container
    .querySelector(".buttons")
    .addEventListener("click", function (event) {
      console.log(event.target.value);
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
  var input = container.querySelector("#inputField");
  //display element - operationField
  var operationField = container.querySelector("#operationField");
  //history ul element
  var historyUl = container.querySelector(".history-list");
  //history container element
  var history = container.querySelector(".history");

  function handleKeys(btnValue) {
    switch (btnValue) {
      case "=":
        try {
          var result = calculator.evaluate(input.value, input, operationField);
          input.value = result.result;
          operationField.innerText = result.operation;
        } catch (error) {
          input.value = "ERROR!" + error.message;
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
        // Handle operators
        if (input.value.length >= 0) {
          if (/[+\-*\^]/.test(input.value[input.value.length - 1])) {
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
          (!isNaN(input.value[input.value.length - 1]) && ["e", "π", "!"].includes(btnValue))
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
    container.remove(); // Remove the calculator from the DOM
  });
  container
    .querySelector(".history__close-btn")
    .addEventListener("click", function () {
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
  document.getElementById("calculator-container").appendChild(container);
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
      console.log("kojikoji");
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
    return (
      expression
      // Handles 'pi' and 'π'
      .replace(/pi|π/gi, Math.PI.toString())
      // Handles standalone 'e'
      .replace(/(?<!\w)e(?![\w\()])/g, Math.E.toString())
      // Handles exponent 'E'
      .replace(
        /(\d+(\.\d+)?)([E]\d+)/g,
        function (match, base, decimal, exponent) {
          return parseFloat(base + exponent).toString();
        }
      )
      // Handles number followed by 'e'
      .replace(/(\d+(\.\d+)?)([e])/g, function (match, value) {
        return (parseFloat(value) * Math.E).toString();
      })
      //handle percentages
      .replace(/%/g, "*0.01")
      //handle ans keyword replacemnet
      .replace(
        /(\d+)\s*ans/g,
        function (match, number) {
          return number + "*" + this.lastAnswer;
        }.bind(this)
      )
      // Handle 'ans' as a standalone term or following an operator
      .replace(
        /(^|[+\-*/\^\(\)])\s*ans/g,
        function (match, operator) {
          return operator + this.lastAnswer;
        }.bind(this)
      )
      // Handles sqrt
      .replace(
        /sqrt\(([^)]*)\)/g,
        function (match, innerExpression) {
          return Math.sqrt(
            parseFloat(this.evaluate(innerExpression).result)
          ).toString();
        }.bind(this)
      )
      // Handles log10
      .replace(
        /log\(([^)]*)\)/g,
        function (match, innerExpression) {
          return Math.log10(
            parseFloat(this.evaluate(innerExpression).result)
          ).toString();
        }.bind(this)
      )
      // Handles ln (natural log)
      .replace(
        /ln\(([^)]*)\)/g,
        function (match, innerExpression) {
          return Math.log(
            parseFloat(this.evaluate(innerExpression).result)
          ).toString();
        }.bind(this)
      )
      // Handles sin
      .replace(
        /sin\(((?:[^)(]+|\((?:[^)(]+|\([^)(]*\))*\))*)\)/g,
        function (match, innerExpression) {
          console.log("innerrrr    " + innerExpression);
          // Evaluate the inner expression
          var evaluatedInner = this.evaluate(innerExpression).result;
          return this.radian ?
            Math.sin(parseFloat(evaluatedInner)) :
            Math.sin((parseFloat(evaluatedInner) * Math.PI) / 180);
        }.bind(this)
      )
      .replace(
        /cos\(([^)]*)\)/g,
        function (match, innerExpression) {
          return this.radian ?
            Math.cos(parseFloat(this.evaluate(innerExpression).result)) :
            Math.cos(
              (parseFloat(this.evaluate(innerExpression).result) *
                Math.PI) /
              180
            );
        }.bind(this)
      )
      .replace(
        /tan\(([^)]*)\)/g,
        function (match, innerExpression) {
          return this.radian ?
            Math.tan(parseFloat(this.evaluate(innerExpression).result)) :
            Math.tan(
              (parseFloat(this.evaluate(innerExpression).result) *
                Math.PI) /
              180
            );
        }.bind(this)
      )
      // Handles factorial
      .replace(
        /(\d+)!/g,
        function (match, innerExpression) {
          return (
            "(" +
            this.factorial(parseInt(this.evaluate(innerExpression).result)) +
            ")"
          );
        }.bind(this)
      )
    );
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
    // Check if the last char is an operator
    var lastChar = expression[expression.length - 1];
    if (/[\+\-\*\/\^]/.test(lastChar)) {
      throw new Error("Expression cannot end with an operator.");
    }
    // Check for equal parentheses
    var openParenthesesCount = 0;
    for (var i = 0; i < expression.length; i++) {
      var char = expression[i];
      if (char === "(") openParenthesesCount++;
      if (char === ")") openParenthesesCount--;
    }
    if (openParenthesesCount > 0)
      throw new Error("Mismatched parentheses: Missing closing parentheses.");
    if (openParenthesesCount < 0)
      throw new Error("Mismatched parentheses: Too many closing parentheses.");
    //check for consecutive operators
    // if (/[\+\-\*\/]{2,}/.test(cleanExpression)){
    //   throw new Error("Consecutive operators or invalid operator placement.");
    // }
    // if (!/^[\d+\-*/^().e%]+$/.test(expression)){
    //   throw new Error("Invalid characters in the expression.");
    // }
  };

  this.getPrecedence = function (op) {
    if (op === "+" || op === "-") return 1;
    if (op === "*" || op === "/") return 2;
    if (op === "^") return 3;
    return 0;
  };

  this.applyOperator = function () {
    if (this.numbers.length < 2) {
      throw new Error("Insufficient operands.");
    }
    var op = this.operators.pop();
    var b = this.numbers.pop();
    var a = this.numbers.pop();

    if (op === "/" && b === 0) {
      throw new Error("Division by zero is not allowed.");
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
    if (/[πeE!%sin|cos|tan|sqrt|log|ln]/.test(expression)) {
      // Preprocess the expression to replace scientific functions
      expression = this.preprocessExpression(expression);
    }
    // Validate the processed expression
    // this.validateExpression(expression);
    // Tokenize the input expression
    var tokens = expression.match(/(\d+(\.\d+)?|[\+\-\*\/\^\(\)])/g);
    if (!tokens) throw new Error("Invalid expression format.");

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
      } else if (/[\+\-\*\/\^]/.test(token)) {
        // Handle operators
        if (token === "-" && (i === 0 || tokens[i - 1] === "(")) {
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
    // Apply remaining operators
    while (this.operators.length > 0) {
      this.applyOperator();
    }
    // Save the evaluated expression and result to history
    var result = this.numbers.pop();
    //pushing on to the history
    this.pushHistory(originalExpression, result);

    return {
      result: result,
      operation: result == originalExpression ? "ans" : originalExpression,
    };
  };
}