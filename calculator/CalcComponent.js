var scientificTemplate = `<label>Calculator</label><button class="close-btn">x</button>
      <div class="history" style="display: none">
        <button class="history__close-btn">X</button>
        <ul class="history-list">
        </ul>
      </div>
      <div class="display">
        <div class="operationField"></div>
        <input class="inputField" placeholder="0" autocomplete="off" autofocus/>
      </div>
      <section class="buttons">
        <button class="rad-btn active" value="rad">rad</button>
        <button class="deg-btn" value="deg">deg</button>
        <button class="par-btn" value="(">(</button>
        <button class="par-btn" value=")">)</button>
        <button class="op-btn" value="%">%</button>
        <button value="bsp">⌫</button>
        <button value="ac" class="btns__btn--clear">AC</button>

        <button class="store" value="store">str</button>
        <button class="recall" value="recall">rcl</button>
        <button class="var" value="W">W</button>
        <button class="var" value="X">X</button>
        <button class="var" value="Y">Y</button>
        <button class="var" value="Z">Z</button>
        <button value="reset">rst</button>

        <button class="sci-btn" value="sin(">sin</button>
        <button class="sci-btn" value="cos(">cos</button>
        <button class="sci-btn" value="tan(">tan</button>
        <button class="num-btn" value="1">1</button>
        <button class="num-btn" value="2">2</button>
        <button class="num-btn" value="3">3</button>
        <button class="op-btn" value="/">/</button>

        <button class="sci-btn" value="π">π</button>
        <button class="sci-btn" value="log(">log</button>
        <button class="sci-btn" value="ln(">ln</button>
        <button class="num-btn" value="4">4</button>
        <button class="num-btn" value="5">5</button>
        <button class="num-btn" value="6">6</button>
        <button class="op-btn" value="*">*</button>

        <button class="sci-btn" value="sqrt(">sqrt</button>
        <button class="sci-btn" value="e">e</button>
        <button class="sci-btn" value="E">E</button>
        <button class="num-btn" value="7">7</button>
        <button class="num-btn" value="8">8</button>
        <button class="num-btn" value="9">9</button>
        <button class="op-btn" value="-">-</button>

        <button class="sci-btn" value="!">!</button> <!-- Factorial -->
        <button class="op-btn" value="^">^</button>
        <button class="op-btn" value=".">.</button>
        <button value="ans">Ans</button>
        <button class="num-btn" value="0">0</button>
        <button class="eval-btn" value="=">=</button>
        <button class="op-btn" value="+">+</button>
        <button class="show-history-btn hbtn" value="history">Show History</button>
        <button value="countRest">CR</button>
      </section>
      <span style="display:none" class="count">OverAllCount: 0</span><br><span style="display:none" class="count-min">CountPerMin: 0</span>`;
var normalTemplate = `<label>Calculator</label><button class="close-btn">x</button>
      <div class="history" style="display: none">
        <button class="history__close-btn">X</button>
        <ul class="history-list">
        </ul>
      </div>
      <div class="display">
        <div class="operationField"></div>
        <input class="inputField" placeholder="0" autocomplete="off" autofocus/>
      </div>
      <section class="buttons" style="grid-template-columns: repeat(4, 1fr); grid-template-rows: repeat(auto, 50px);">
        <button class="par-btn" value="(">(</button>
        <button class="par-btn" value=")">)</button>
        <button value="bsp">⌫</button>
        <button value="ac" class="btns__btn--clear">AC</button>
        <button class="num-btn" value="1">1</button>
        <button class="num-btn" value="2">2</button>
        <button class="num-btn" value="3">3</button>
        <button class="op-btn" value="/">/</button>
        <button class="num-btn" value="4">4</button>
        <button class="num-btn" value="5">5</button>
        <button class="num-btn" value="6">6</button>
        <button class="op-btn" value="*">*</button>
        <button class="num-btn" value="7">7</button>
        <button class="num-btn" value="8">8</button>
        <button class="num-btn" value="9">9</button>
        <button class="op-btn" value="-">-</button>
        <button class="op-btn" value=".">.</button>
        <button class="num-btn" value="0">0</button>
        <button class="eval-btn" value="=">=</button>
        <button class="op-btn" value="+">+</button>
        <button value="ans">Ans</button>
        <button class="show-history-btn hbtn" style="grid-column: span 3;" value="history">Show History</button>
     
      </section>`;
var inputTemplate = `<div class="display" style="margin:0">
        <div class="operationField"></div>
        <input class="inputField" placeholder="0" autocomplete="off" autofocus/>
      </div>`
export default function createNewCalculator(params) {
  var {
    containerId,
    mode,
    shape
  } = params;
  mode = mode ? mode : "noUI";
  shape = shape ? shape : "";
  //UI
  if (mode.trim() != "noUI") {
    var container = document.createElement("main");
    container.className = "container";
    //for changing shape of the btn    
    if (shape.trim() == "circle") {
      var style = document.createElement("style");
      style.innerHTML = `button {
                                    border-radius: 50%;
                                  }`
      document.head.appendChild(style);
    }
    //adding template as per the requirement
    if (mode.trim() == "scientific") {
      container.innerHTML = scientificTemplate;
    } else if (mode.trim() == "input") {
      container.innerHTML = inputTemplate;
      container.style.cssText = "padding : 0;min-height:0px;box-shadow:none;"
    } else if (mode.trim() == "normal") {
      container.innerHTML = normalTemplate;
    }
    //display element - inputField
    var input = container.querySelector(".inputField");
    //display element - operationField
    var operationField = container.querySelector(".operationField");
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
            var result = evaluate(input.value, input, operationField);
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
          if (mode != "input") {
            lastMinCount.innerText = "CountPerMin: " + lastOneMinuteCalcCount;
            allCount.innerText = "OverAllCount: " + calcCount;
          }
          break;

        case "store":
          storeActive = true;
          recallActive = false;
          break;

        case "recall":
          storeActive = false;
          recallActive = true;
          break;

        case "rad":
          radian = true;
          container.querySelector(".rad-btn").classList.add("active");
          container.querySelector(".deg-btn").classList.remove("active");
          break;

        case "deg":
          radian = false;
          container.querySelector(".deg-btn").classList.add("active");
          container.querySelector(".rad-btn").classList.remove("active");
          break;

        case "reset":
          memory = {};
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
          storeActive &&
            store(btnValue, input.value, operationField);
          recallActive && (input.value += recall(btnValue));
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
        case "countRest":
          lastOneMinuteCalcCount = 0;
          calcCount = 0;
          lastMinCount.innerText = "CountPerMin: 0";
          allCount.innerText = "OverAllCount:0";
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
    //check for if it is an input only mode  
    if (mode != "input") {
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
      //history ul element
      var historyUl = container.querySelector(".history-list");
      //history container element
      var hist = container.querySelector(".history");
      var lastMinCount = container.querySelector(".count-min");
      var allCount = container.querySelector(".count")
      //performing operations correspoding to the button's value 
      var clear = false; // flag to clear  display

      container.querySelector(".close-btn").addEventListener("click", function () {
        container.remove(); // Remove the calculator from the DOM
      });
      container.querySelector(".history__close-btn").addEventListener("click", function () {
        hist.style.display = "none"; // closes the history list
      });
      //function to generate the history list and display it
      var showHistory = function () {
        historyUl.innerHTML = "";
        history.forEach(function (entry) {
          var li = document.createElement("li");
          li.textContent = `${entry.expression} = ${entry.result}`;
          li.addEventListener("click", function () {
            input.value = entry.result;
            operationField.innerText = entry.expression;
            history.style.display = "none";
          });
          historyUl.appendChild(li);
        });
        hist.style.display = "block";
      }

      input.focus();

      setInterval(function () {
        lastOneMinuteCalcCount = 0;
        lastMinCount.innerText = "CountPerMin :0";
      }, 60000)
    }
    if (containerId) {
      document.querySelector("#" + containerId).appendChild(container);
    } else {
      document.body.appendChild(container);
    }
  }
  var numbers = [];
  var operators = [];
  var history = [];
  var storeActive = false;
  var recallActive = false;
  var memory = {};
  var lastAnswer = 0;
  var radian = true;
  var lastOneMinuteCalcCount = 0;
  var calcCount = 0;

  //function to store
  var store = function (variable, value, operationField) {
    if (value.trim()) {
      memory[variable] = value;
      operationField.innerText = variable + "→";
      storeActive = false;
    }
  };
  //function to recall
  var recall = function (variable) {
    if (memory[variable] !== undefined) {
      return memory[variable];
    } else {
      return "No value in " + variable;
    }
  };
  //function to find factorial
  var factorial = function (n) {
    if (n === 0 || n === 1) return 1;
    var result = 1;
    for (var i = 2; i <= n; i++) {
      result *= i;
    }
    return result;
  };
  // Replace scientific functions with their computed values
  var preprocessExpression = function (expression) {
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
        return number + "*" + lastAnswer;
      })
      .replace(/(^|[+\-*/\^\(\)])\s*ans/g, function (match, operator) {
        return operator + lastAnswer;
      })
      .replace(/sqrt\(((?:[^)(]+|\((?:[^)(]+|\([^)(]*\))*\))*)\)/g, function (match, innerExpression) {
        return Math.sqrt(parseFloat(evaluate(innerExpression).result)).toString();
      })
      .replace(/log\(((?:[^)(]+|\((?:[^)(]+|\([^)(]*\))*\))*)\)/g, function (match, innerExpression) {
        return Math.log10(parseFloat(evaluate(innerExpression).result)).toString();
      })
      .replace(/ln\(((?:[^)(]+|\((?:[^)(]+|\([^)(]*\))*\))*)\)/g, function (match, innerExpression) {
        return Math.log(parseFloat(evaluate(innerExpression).result)).toString();
      })
      .replace(/sin\(((?:[^)(]+|\((?:[^)(]+|\([^)(]*\))*\))*)\)/g, function (match, innerExpression) {
        return radian ? Math.sin(parseFloat(evaluate(innerExpression).result)) : Math.sin((parseFloat(evaluate(innerExpression).result) * Math.PI) / 180);
      })
      .replace(/cos\(((?:[^)(]+|\((?:[^)(]+|\([^)(]*\))*\))*)\)/g, function (match, innerExpression) {
        return radian ? Math.cos(parseFloat(evaluate(innerExpression).result)) : Math.cos((parseFloat(evaluate(innerExpression).result) * Math.PI) / 180);
      })
      .replace(/tan\(((?:[^)(]+|\((?:[^)(]+|\([^)(]*\))*\))*)\)/g, function (match, innerExpression) {
        return radian ? Math.tan(parseFloat(evaluate(innerExpression).result)) : Math.tan((parseFloat(evaluate(innerExpression).result) * Math.PI) / 180);
      })
      .replace(/(\d+)!/g, function (match, innerExpression) {
        return ("(" + factorial(parseInt(evaluate(innerExpression).result)) + ")");
      }));
  };
  //function to push history
  var pushHistory = function (expression, result) {
    if (
      history.length == 0 ||
      history[history.length - 1].expression != expression
    ) {
      history.push({
        expression: expression,
        result: result,
      });
    }
    if (history.length > 10) {
      history.shift();
    }
  };
  // Validate the expression
  var validateExpression = function (expression) {
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

  var getPrecedence = function (op) {
    if (op === "+" || op === "-") return 1;
    if (op === "*" || op === "/") return 2;
    if (op === "^") return 3;
    if (op === "%") return 5;
    return 0;
  };

  var applyOperator = function () {
    var op = operators.pop();
    if (op == "%") {
      var b = numbers.pop();
      var a = numbers[numbers.length - 1];
      numbers.push(a * (b / 100));
    } else {
      if (numbers.length < 2) {
        throw ({
          continue: false,
          error: "Insufficient operands."
        });
      }

      var b = numbers.pop();
      var a = numbers.pop();

      if (op === "/" && b === 0) {
        throw ({
          continue: true,
          error: "Division by zero is not allowed."
        });
      }

      switch (op) {
        case "+":
          numbers.push(a + b);
          break;
        case "-":
          numbers.push(a - b);
          break;
        case "*":
          numbers.push(a * b);
          break;
        case "/":
          numbers.push(a / b);
          break;
        case "^":
          numbers.push(Math.pow(a, b));
          break;
      }
    }
  };

  var evaluateParentheses = function () {
    while (
      operators.length > 0 &&
      operators[operators.length - 1] !== "("
    ) {
      applyOperator();
    }
    operators.pop(); // Remove the '('
  };

  var evaluate = function (expression) {
    if (expression.length === 0) {
      return;
    }
    lastOneMinuteCalcCount++;
    calcCount++;
    var originalExpression = expression;
    // Preprocess the expression to replace scientific functions
    // if (/[πeE!%sin|cos|tan|sqrt|log|ln]/.test(expression)) {
    //   // Preprocess the expression to replace scientific functions
    expression = preprocessExpression(expression);
    // }
    // Validate the processed expression
    validateExpression(expression);
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
        numbers.push(parseFloat(token));
      } else if (token === "(") {
        // Push '(' to the operators stack
        operators.push(token);
      } else if (token === ")") {
        // Evaluate expressions within parentheses
        evaluateParentheses();
      } else if (/[\+\-\*\/\^%]/.test(token)) {

        // Handle operators
        if (token === "-" && (i === 0 || tokens[i - 1] === "(") || ["*", "/"].includes(tokens[i - 1])) {
          // Handle unary minus
          numbers.push(0); // or -1
          operators.push("-"); // or "*"
        } else if (token === "+" && (i === 0 || tokens[i - 1] === "(")) {
          // Handle unary plus
          numbers.push(0); // or 1
          operators.push("+"); // or "*"
        } else {
          while (
            operators.length > 0 &&
            getPrecedence(operators[operators.length - 1]) >=
            getPrecedence(token)
          ) {
            applyOperator();
          }
          operators.push(token);
        }
      }
    }
    //Apply remaining operators
    while (operators.length > 0) {
      applyOperator();
    }
    // Save the evaluated expression and result to history
    var result = numbers.pop();
    lastAnswer = result;
    //pushing on to the history
    pushHistory(originalExpression, result);

    return {
      result: result,
      operation: result == originalExpression ? "ans" : originalExpression,
    };
  };

  return {
    evaluate,
    history
  }
}



// function Calculator() {
//   numbers = [];
//   operators = [];
//   history = [];
//   storeActive = false;
//   recallActive = false;
//   memory = {};
//   lastAnswer = 0;
//   radian = true;
//   lastOneMinuteCalcCount = 0;
//   calcCount = 0 ;

//   //function to store
//   store = function (variable, value, operationField) {
//     if (value.trim()) {
//       memory[variable] = value;
//       operationField.innerText = variable + "→";
//       storeActive = false;
//     }
//   };
//   //function to recall
//   recall = function (variable) {
//     if (memory[variable] !== undefined) {
//       return memory[variable];
//     } else {
//       return "No value in " + variable;
//     }
//   };
//   //function to find factorial
//   factorial = function (n) {
//     if (n === 0 || n === 1) return 1;
//     var result = 1;
//     for (var i = 2; i <= n; i++) {
//       result *= i;
//     }
//     return result;
//   };
//   // Replace scientific functions with their computed values
//   preprocessExpression = function (expression) {
//     // Replace percentages that are not preceded by a division operator
//     function replacePercentages(expr) {
//       return expr.replace(/(?<=[\+\-\*])(?<!\d)(\d+(\.\d+)?)([\+\-\*])(\d+(\.\d+)?)(%)/g, function (match, num1, decimal1, operator, num2) {
//         var percentageValue = parseFloat(num2) / 100;
//         var result;
//         switch (operator) {
//           case '+':
//             result = (parseFloat(num1) + (parseFloat(num1) * percentageValue)).toString();
//             break;
//           case '-':
//             result = (parseFloat(num1) - (parseFloat(num1) * percentageValue)).toString();
//             break;
//           case '*':
//             result = (parseFloat(num1) * percentageValue).toString();
//             break;
//           default:
//             result = match; // Unrecognized operator
//         }
//         return result;
//       });
//     }
//     // Process percentages and check if more replacements are needed
//     var newExpression = replacePercentages(expression);
//     while (/(?<=[\+\-\*])(\d+(\.\d+)?)([\+\-\*])(\d+(\.\d+)?)(%)/g.test(newExpression)) {
//       newExpression = replacePercentages(newExpression);
//     }
//     return (
//       newExpression
//       .replace(/pi|π/gi, Math.PI.toString())
//       .replace(/^(\d+(\.\d+)?)%/g, function (match, num) {
//         return num + '*0.01';
//       })
//       .replace(/(?<!\w)e(?![\w\()])/g, Math.E.toString())
//       .replace(/(\d+(\.\d+)?)([E]\d+)/g, function (match, base, decimal, exponent) {
//         return parseFloat(base + exponent).toString();
//       })
//       .replace(/(\d+(\.\d+)?)([e])/g, function (match, value) {
//         return (parseFloat(value) * Math.E).toString();
//       })
//       .replace(/(\d+)\s*ans/g, function (match, number) {
//         return number + "*" + lastAnswer;
//       })
//       .replace(/(^|[+\-*/\^\(\)])\s*ans/g, function (match, operator) {
//         return operator + lastAnswer;
//       })
//       .replace(/sqrt\(((?:[^)(]+|\((?:[^)(]+|\([^)(]*\))*\))*)\)/g, function (match, innerExpression) {
//         return Math.sqrt(parseFloat(evaluate(innerExpression).result)).toString();
//       })
//       .replace(/log\(((?:[^)(]+|\((?:[^)(]+|\([^)(]*\))*\))*)\)/g, function (match, innerExpression) {
//         return Math.log10(parseFloat(evaluate(innerExpression).result)).toString();
//       })
//       .replace(/ln\(((?:[^)(]+|\((?:[^)(]+|\([^)(]*\))*\))*)\)/g, function (match, innerExpression) {
//         return Math.log(parseFloat(evaluate(innerExpression).result)).toString();
//       })
//       .replace(/sin\(((?:[^)(]+|\((?:[^)(]+|\([^)(]*\))*\))*)\)/g, function (match, innerExpression) {
//         return radian ? Math.sin(parseFloat(evaluate(innerExpression).result)) : Math.sin((parseFloat(evaluate(innerExpression).result) * Math.PI) / 180);
//       })
//       .replace(/cos\(((?:[^)(]+|\((?:[^)(]+|\([^)(]*\))*\))*)\)/g, function (match, innerExpression) {
//         return radian ? Math.cos(parseFloat(evaluate(innerExpression).result)) : Math.cos((parseFloat(evaluate(innerExpression).result) * Math.PI) / 180);
//       })
//       .replace(/tan\(((?:[^)(]+|\((?:[^)(]+|\([^)(]*\))*\))*)\)/g, function (match, innerExpression) {
//         return radian ? Math.tan(parseFloat(evaluate(innerExpression).result)) : Math.tan((parseFloat(evaluate(innerExpression).result) * Math.PI) / 180);
//       })
//       .replace(/(\d+)!/g, function (match, innerExpression) {
//         return ("(" + factorial(parseInt(evaluate(innerExpression).result)) + ")");
//       }));
//   };
//   //function to push history
//   pushHistory = function (expression, result) {
//     if (
//       history.length == 0 ||
//       history[history.length - 1].expression != expression
//     ) {
//       history.push({
//         expression: expression,
//         result: result,
//       });
//     }
//     if (history.length > 10) {
//       history.shift();
//     }
//   };
//   // Validate the expression
//   validateExpression = function (expression) {
//     if (!/^[\d+\-*/^().e%]+$/.test(expression)) {
//       throw ({
//         continue: false,
//         error: "Invalid input"
//       });
//     }
//     // Check if the last char is an operator
//     var lastChar = expression[expression.length - 1];
//     if (/[\+\-\*\/\^]/.test(lastChar)) {
//       throw ({
//         continue: true,
//         error: "Expression cannot end with an operator."
//       });
//     }
//     // Check for equal parentheses
//     var openParenthesesCount = 0;
//     for (var i = 0; i < expression.length; i++) {
//       var char = expression[i];
//       if (char === "(") openParenthesesCount++;
//       if (char === ")") openParenthesesCount--;
//       if (openParenthesesCount < 0)
//         throw ({
//           continue: true,
//           error: "ERROR! Too many closing parentheses."
//         });
//     }
//     if (openParenthesesCount > 0)
//       throw ({
//         continue: true,
//         error: "ERROR! Too many open parentheses."
//       });
//     //check for consecutive operators
//     if (/[\+\*\/]{2,}/.test(expression)) {
//       throw ({
//         continue: false,
//         error: "Consecutive operators or invalid operator placement."
//       });
//     }

//   };

//   getPrecedence = function (op) {
//     if (op === "+" || op === "-") return 1;
//     if (op === "*" || op === "/") return 2;
//     if (op === "^") return 3;
//     if (op === "%") return 5;
//     return 0;
//   };

//   applyOperator = function () {
//     var op = operators.pop();
//     if (op == "%") {
//       var b = numbers.pop();
//       var a = numbers[numbers.length - 1];
//       numbers.push(a * (b / 100));
//     } else {
//       if (numbers.length < 2) {
//         throw ({
//           continue: false,
//           error: "Insufficient operands."
//         });
//       }

//       var b = numbers.pop();
//       var a = numbers.pop();

//       if (op === "/" && b === 0) {
//         throw ({
//           continue: true,
//           error: "Division by zero is not allowed."
//         });
//       }

//       switch (op) {
//         case "+":
//           numbers.push(a + b);
//           break;
//         case "-":
//           numbers.push(a - b);
//           break;
//         case "*":
//           numbers.push(a * b);
//           break;
//         case "/":
//           numbers.push(a / b);
//           break;
//         case "^":
//           numbers.push(Math.pow(a, b));
//           break;
//       }
//     }
//   };

//   evaluateParentheses = function () {
//     while (
//       operators.length > 0 &&
//       operators[operators.length - 1] !== "("
//     ) {
//       applyOperator();
//     }
//     operators.pop(); // Remove the '('
//   };

//   evaluate = function (expression) {
//     if (expression.length === 0) {
//       return;
//     }
//     lastOneMinuteCalcCount++;
//     calcCount++;
//     var originalExpression = expression;
//     // Preprocess the expression to replace scientific functions
//     // if (/[πeE!%sin|cos|tan|sqrt|log|ln]/.test(expression)) {
//     //   // Preprocess the expression to replace scientific functions
//     expression = preprocessExpression(expression);
//     // }
//     // Validate the processed expression
//     validateExpression(expression);
//     // Tokenize the input expression
//     var tokens = expression.match(/(\d+(\.\d+)?|[\+\-\*\/\^\(\)%])/g);
//     if (!tokens) throw ({
//       continue: false,
//       error: "Invalid expression format."
//     });
//     //loop to push tokens o to the corresponding stacks
//     for (var i = 0; i < tokens.length; i++) {
//       var token = tokens[i];
//       if (/\d/.test(token)) {
//         // If the token is a number, push it to the numbers stack
//         numbers.push(parseFloat(token));
//       } else if (token === "(") {
//         // Push '(' to the operators stack
//         operators.push(token);
//       } else if (token === ")") {
//         // Evaluate expressions within parentheses
//         evaluateParentheses();
//       } else if (/[\+\-\*\/\^%]/.test(token)) {

//         // Handle operators
//         if (token === "-" && (i === 0 || tokens[i - 1] === "(") || ["*", "/"].includes(tokens[i - 1])) {
//           // Handle unary minus
//           numbers.push(0); // or -1
//           operators.push("-"); // or "*"
//         } else if (token === "+" && (i === 0 || tokens[i - 1] === "(")) {
//           // Handle unary plus
//           numbers.push(0); // or 1
//           operators.push("+"); // or "*"
//         } else {
//           while (
//             operators.length > 0 &&
//             getPrecedence(operators[operators.length - 1]) >=
//             getPrecedence(token)
//           ) {
//             applyOperator();
//           }
//           operators.push(token);
//         }
//       }
//     }
//     //Apply remaining operators
//     while (operators.length > 0) {
//       applyOperator();
//     }
//     // Save the evaluated expression and result to history
//     var result = numbers.pop();
//     lastAnswer = result;
//     //pushing on to the history
//     pushHistory(originalExpression, result);

//     return {
//       result: result,
//       operation: result == originalExpression ? "ans" : originalExpression,
//     };
//   };

//   return{
//      evaluate 
//   }
// }