<script setup>
import { RouterLink, RouterView } from 'vue-router'</script>

<template>

  <header>
    <h1>Calculator!</h1>

<!--    <div class="wrapper">

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>-->
  </header>
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
    <p>Calculation log:</p>
    <ul>
    <p id = "log"></p>
    </ul>
  </div>
  <RouterView />

</template>




<style scoped lang="scss"></style>
<script>
let logArr;
export default {
  data() {
    return {
      calculatorValue: "",
      btnArr: ["C", "ANS", "NEW", "+", "1", "2", "3", "-", "4", "5", "6", "*", "7", "8", "9", "/", " ", "0", ".", "="],
      operator: null,
      previousCalculatorValue: "",
    };
  },
  methods: {
    var: logArr = [],
    clicked(n) {
      if (n === "C") {
        this.calculatorValue = "";
        this.previousCalculatorValue= "";
        this.operator = "";
        document.getElementById("log").innerHTML = " ";
        logArr.length = 0;

      }
      if (n === "NEW") {
        this.calculatorValue = " ";
        logArr.length = 0;
      }

      if (!isNaN(n) || n === ".") {
        this.calculatorValue += n;
        logArr.push(n);
        console.log(logArr.toString());
      }

      if (n === "+" || n === "-" || n === "*" || n === "/") {
        this.operator = n;
        this.previousCalculatorValue = this.calculatorValue;
        this.calculatorValue = " ";
        logArr.push(n);
      }

      if (n === "=" || n === "ANS") {
          var answer = eval(this.previousCalculatorValue + this.operator + this.calculatorValue);
          if(answer == "Infinity") {
            this.calculatorValue = "Error";
          } else {
            this.calculatorValue = answer;
            this.previousCalculatorValue = "";
            this.operator = null;
            logArr.push(n);
            logArr.push(answer);
            document.getElementById("log").innerHTML += "<li>" + logArr.toString().replaceAll(",", "") + "</li>";

          }
        }
      }
    },
}

</script>


