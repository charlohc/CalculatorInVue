
<template>
<h1>Here you can review the calculator</h1>

  <div class = "wrapperFields">
    <p>Name</p>
    <input id="nameField" contenteditable="true" value="Kari">
    <p>Mail</p>
    <input id="mailField" contenteditable="true" value="Kari.Knutsen@gmail.com"/>
    <p>Message</p>
    <input id="messageField" contenteditable="true" value="Veeeldig kul kalkulator wowow"/>

    <button id = "submit" @click = "acceptedReview()"> submit</button>
  </div>

</template>

<script>

export default {
  name: "reviews",
  methods: {
    acceptedReview () {
      if (this.acceptedName() && this.acceptedMail() && this.acceptedMessage()) {
        console.log("Success!");
      } else {
        console.log("fail");
      }
    },
    acceptedName() {

 },

  acceptedMail() {
  return false;
},

 acceptedMessage() {
  return false;
  },
  }
}


</script>
<style scoped>

</style>