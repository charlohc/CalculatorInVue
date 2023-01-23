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

  <div class = "answer-log">
    <p>Calculation log:</p>
    <ul>
    <p id = "log">{{ log }} </p>
    </ul>
  </div>
  <RouterView />
</template>




<style scoped lang="scss"></style>
<script>
export default {
  //TODO: gi feilmeldinger, feks når deler med 0, hvorfor vil bare regne med et og et tall?? hvorfor vil ikke bytte linje??
  data() {
    return {
      calculatorValue: "",
      btnArr: ["C", "ANS", "NEW", "+", "1", "2", "3", "-", "4", "5", "6", "*", "7", "8", "9", "/", " ", "0", ".", "="],
      operator: null,
      previousCalculatorValue: "",
      log: "",
      newLine: false,
    };
  },
  methods: {
    clicked(n) {
      if (n === "C") {
        this.calculatorValue = "";
        this.log = "";
      }

      if (n === "NEW") {
        this.calculatorValue = " ";
        this.log += "\n";
      }

      if (!isNaN(n) || n === ".") {
        this.calculatorValue += n + " ";
        this.log += n + " ";
      }

      if (n === "+" || n === "-" || n === "*" || n === "/") {
        this.operator = n;
        this.previousCalculatorValue = this.calculatorValue;
        this.calculatorValue = " ";
        this.log += n + " "
      }

      if (n === "=" || n === "ANS") {
        if (this.operator === "/" && this.calculatorValue === "0") {
          this.calculatorValue = "Error";
        } else {
          this.calculatorValue = eval(this.previousCalculatorValue + this.operator + this.calculatorValue);
          this.previousCalculatorValue = "";
          this.operator = null;
          this.newLine = false;
          this.log += "= " + this.calculatorValue + "\n";
        }
      }
    },

   /* logCalculation() {
      if (this.newLine) {
        document.getElementById("log").innerHTML += "<li>";
      }
      document.getElementById("log").innerHTML += "hi";
    }*/
  }
}
</script>
