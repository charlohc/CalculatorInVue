<!--
TODO: CE fjerner kun sist som ble skrevet feil, kan ikke endre mer enn en tilbake, fiks
loggen kan ha en egen knapp for å tømme

-->
<template>

  <header>
    <h1>Calculator!</h1>
  </header>
  <button class="button" type="button" @click="emptyLog()">Empty log</button>
  <div id = "wrapper">
    <div class = "answer-field">
      <div id = "answer">{{ calculatorValue || 0 }}</div>
    </div>
    <div class="buttons">
      <div
          class="button"
          v-for="n in btnArr"
          :key = "n"
      >
        <div class="text" @click="clicked(n)">
          {{ n }}
        </div>
      </div>
    </div>
  </div>

  <div id = "answer-log">
    <p class="text">Calculation log:</p>
    <ul>
      <p id = "log"></p>
    </ul>
  </div>
</template>




<style scoped lang="scss"></style>
<script>
let logArr;
export default {
  data() {
    return {
      calculatorValue: "",
      btnArr: ["C", "CE", "%", "+", "1", "2", "3", "-", "4", "5", "6", "*", "7", "8", "9", "/", " ", "0", ".", "="],
      operator: null,
      previousCalculatorValue: "",
      answer: 0,
    };
  },
  methods: {
    var: logArr = [],
    clicked(n) {
      if (n === "C") {this.clickedC();
      } else if (n=== "CE") {
        this.clickedCE(n);
      } else if (!isNaN(n) || n === ".") {
        this.clickedNumberOrComma(n);
      } else if (n === "+" || n === "-" || n === "*" || n === "/" || n === "&") {
        this.clickedOperator(n);
      } else if (n === "=") {
        this.clickedAnswer(n);
      }else {
        this.calculatorValue = this.calculatorValue / 100 + "";
        //TODO: fix more
      }


    },

    clickedC() {
      let charsToRemove = this.calculatorValue.length;
      logArr = logArr.slice((logArr.length +1)- charsToRemove, (charsToRemove-1));
      this.calculatorValue = "";
      this.previousCalculatorValue= "";
      this.operator = "";

    },
    clickedCE() {
      let charsToRemove = this.calculatorValue.length;
      logArr = logArr.slice((logArr.length +1)- charsToRemove, (charsToRemove-1));
      this.calculatorValue = this.previousCalculatorValue;
      logArr.push(this.calculatorValue);

    },

    clickedNumberOrComma(n) {
      this.continuingEquation();
      this.calculatorValue += n;
      logArr.push(n + " ");
    },

    clickedOperator(n) {
      if(this.legalNumber(this.calculatorValue)) {
        this.previousCalculatorValue = this.calculatorValue;
        this.operator = n;
        this.calculatorValue = " ";
        logArr.push(" " + n + " ");
      } else {
        this.errorHandler();
      }
    },

    clickedAnswer(n) {
      if(!this.legalNumber(this.calculatorValue)) {
        this.errorHandler();
      } else if (eval(this.previousCalculatorValue + this.operator + this.calculatorValue) == "Infinity") {
        this.errorHandler();
      } else{
         this.answer = eval(this.previousCalculatorValue + this.operator + this.calculatorValue);
        this.calculatorValue = this.answer;
        this.previousCalculatorValue = "";
        this.operator = null;
        logArr.push(n);
        logArr.push(" " + this.answer);
        document.getElementById("log").innerHTML += "<li>" + logArr.toString().replaceAll(",", "") + "</li>";

      }
    },

     continuingEquation() {
       let charPlacement = 0;
       let entriesBeforeChar = 0;
       let logArrString = logArr.to
       for (let i = 0; i < logArr.length; i++) {
         entriesBeforeChar++
         if (logArr[i] === "=") {
           charPlacement = i + 1;
           break;
         }
       }
       for (let j = 0; j < charPlacement; j++) {
         logArr.shift();
       }

     },

    legalNumber(number) {
      let comma = 0;
      for (let i = 0; i < number.length; i++) {
        if ( logArr[i] == ".") {
          comma++;
          if(comma > 1) {
            return false;
          }
        }
      }
      return true;
    },
    errorHandler() {
      this.calculatorValue = "ERROR";
      /*this.calculatorValue = "";
      this.previousCalculatorValue = "";
      this.operator = null;
      logArr.length =0;*/
    },
    emptyLog() {
      logArr.length = 0;
      document.getElementById("log").innerHTML = "";
    }
  }
}

</script>


