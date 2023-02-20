<template>
<form class="review-form" @submit.prevent="onSubmit">

  <div class="form-wrapper">
  <label for="nameInput">Name:</label>
  <input id="name"  v-model="name" onkeypress="
if (!value) { document.getElementById('nameError').innerHTML= 'This field is required';
document.getElementById('submitButton').id = 'disabled';
}else {
  document.getElementById('nameError').innerHTML= '';
  document.getElementById('disabled').id = 'submitButton';
} ">
    <p id="nameError"></p>

  <label for="mailInput">Mail:</label>
  <input id="mail" v-model="mail" onkeypress= "
   if (!value || !String(value).match('@') || !String(value).match('.')) {
        document.getElementById('mailError').innerHTML= 'Enter a valid mail address';
       document.getElementById('submitButton').id = 'disabled';
        } else {
         document.getElementById('disabled').id = 'submitButton';
         document.getElementById('mailError').innerHTML= '';
}
">
  <p id="mailError"></p>

  <label for="rating">Rating:</label>
  <select id="rating" v-model.number="rating">
  <option>Very cool</option>
  <option>Very nice</option>
  <option>ok</option>
  <option>meh</option>
  <option>bad</option>
  </select>

  <label for="review">explain:</label>
  <textarea id="review" v-model="text"></textarea>

    <button id="submitButton" type="submit" value="Submit"> Submit </button>
    </div>
  </form>

  <div v-if="reviews.length" class="review-container">
    <h3 id="h3">Reviews:</h3>
    <div class="review" v-for="(review, index) in reviews" :key="index">
      {{ review.name }} thinks this page is {{ review.rating }}
      <br/>
      "{{ review.text}}"
      <br/>
      reachable at: {{review.mail}}
    </div>
  </div>

  </template>
<style scoped lang="scss"></style>
  <script>
  import axios from "axios";
  import { ref, watchEffect } from "vue";
  import {useUserStore} from "@/stores/user";
  const store = useUserStore();
  export default {
  data() {
    const name = ref(store.user.name);
    const mail = ref(store.user.mail);

    watchEffect(() => {
        store.changeName(name.value);
  })
    watchEffect(() => {
        store.changeMail(mail.value);
    })
    return {
      name,
      mail,
      text: '',
      rating: null,
      reviews: [],
      props: {
        reviews: {
          type: Array,
          required: true
        }
      }
    }
  },

  mounted() {
    this.name = store.user.name;
    this.mail = store.user.mail;

    fetch('http://localhost:3000/user')
        .then(res => res.json())
        .then(data => this.reviews = data)
        .catch(err => console.log(err))

  },
  methods: {

     onSubmit() {
      if (this.name === "" || this.mail === "" || this.text === "" || this.rating === null) {
        alert("Review is incomplete. Please fill out every field.")
        return
      }
      this.id ++;

      const review = {
        name: this.name,
        mail: this.mail,
        text: this.text,
        rating: this.rating,
        id:0,
      }

      if (this.name.match(".*\\d.*")) {
        alert("Invalid name")

      } else if (!this.mail.match(".") || !this.mail.match("@")) {
        alert("invalid mail")

      } else {
        this.addReview(review);
        this.name = ""
        this.mail = ""
        this.text = ""
        this.rating = null
      }
    },
    async addReview(review) {
      this.reviews.push(review);

      await axios.post('http://localhost:3000/user',review)
          .then(response => (this.info = response))
    }
  }
}

</script>
