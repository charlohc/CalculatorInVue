<template>
<form class="review-form" @submit.prevent="onSubmit">
<h3>Leave a review</h3>

  <div  v-if="reviews.length" class="review-container">
    <h3>Reviews:</h3>
    <ul>
      <li v-for="(review, index) in reviews" :key="index">
        {{ review.name }} thinks this page is {{ review.rating }}
        <br/>
        "{{ review.text}}"
        <br/>
        reachable at: {{review.mail}}
      </li>
    </ul>
  </div>

  <label for="name">Name:</label>
  <input id="name" v-model="name">

  <label for="mail">Mail:</label>
  <input id="mail" v-model="mail">

  <label for="rating">Rating:</label>
  <select id="rating" v-model.number="rating">
  <option>Very cool</option>
  <option>Very nice</option>
  <option>ok</option>
  <option>meh</option>
  <option>bad</option>
  </select>

  <label for="review">pls explain:</label>
  <textarea id="review" v-model="text"></textarea>

  <input class="button" type="submit" value="Submit">
  </form>

  </template>
  <style scoped lang="scss"></style>
  <script>

export default {
  data() {
    return {
      name: '',
      mail: '',
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
  methods: {
    onSubmit() {
      if (this.name === " " || this.mail ===" " || this.text ===" " || this.rating === null) {
        alert("Review is incomplete. Please fill out every field.")
        return
      }

      const review = {
        name: this.name,
        mail: this.mail,
        text: this.text,
        rating: this.rating
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
    addReview(review) {
      this.reviews.push(review);
    }
  }
}

</script>
