<script setup>
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
  <header>
    <nav>
      <router-link to="/">Calculator</router-link>
      <router-link to="/reviews">Reviews</router-link>
    </nav>
  </header>
  <router-view />
</template>