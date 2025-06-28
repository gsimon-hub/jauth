<script setup>
import { onMounted, ref } from 'vue';
import TheWelcome from '../components/TheWelcome.vue'
import axios from 'axios';

const user_data = ref('')

onMounted(() => {
  axios
    .get('/api/v1/users/me/')
    .then(response => {
      console.log(response);
      user_data.value = response.data['username']
    })
    .catch(err => {
      console.log(err);
    })
})
</script>

<template>
  <!-- <main>
    <TheWelcome />
  </main> -->
  <div>
    <h1>HOME</h1>
    <span>{{ user_data }}</span>
  </div>
</template>
