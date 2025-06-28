<script setup>
import { ref } from 'vue';
import axios from 'axios'
import { useRouter } from 'vue-router';

const username = ref('')
const password = ref('')
const router = useRouter()

function submitForm(e) {
    const formData = {
        username: username.value,
        password: password.value
    }

    axios
        .post('/api/v1/users/', formData)
        .then(response => {
            console.log(response.data);
            router.push('/')
        })
        .catch(err => {
            console.log(err);
        })
}
</script>

<template>
    <div>
        <h1>Sign Up</h1>
        <form @submit.prevent="submitForm">
            <label>Username: </label>
            <input type="email" name="username" v-model="username"> <br><br>
            <label>Password: </label>
            <input type="password" name="password" v-model="password"> <br><br>
            <button type="submit">Sign Up</button>
        </form>
    </div>
</template>