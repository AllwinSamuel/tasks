
import calculator from "./CalcComponent.js";
var newCalc;
document.getElementById("new-calculator-btn").addEventListener("click", function () {

  newCalc = calculator({ 
                         containerId : "calculator-container",
                         mode:"input",
                         shape:"circle"
                       });
                       try{
                         newCalc.evaluate("12/0uyhiuhj")
                       }catch(error){
                         console.log(error.error);
                       }
  console.log(newCalc)
});
