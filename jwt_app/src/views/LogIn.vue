<script setup>
import { useJwtStore } from '@/stores/jwt-token';
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const token = useJwtStore()
const router = useRouter()
const username = ref('')
const password = ref('')
const acc = ref('')
const refresh = ref('')

function submitForm() {
    axios.defaults.headers.common['Authorization'] = ''
    localStorage.removeItem('access')

    const formData = {
        username: username.value,
        password: password.value
    }

    axios
        .post('/api/v1/jwt/create/', formData)
        .then(response => {
            console.log(response.data);

            acc.value = response.data['access']
            refresh.value = response.data['refresh']

            token.setAccess(acc.value)
            token.setRefresh(refresh.value)
            axios.defaults.headers.common['Authorization'] = 'JWT ' + acc.value
            localStorage.setItem('access', acc.value)
            localStorage.setItem('refresh', refresh.value)
            // console.log('Authorization: ', acc.value);

            router.push('/')
        })
        .catch(err => {
            console.log(err);
        })
}
</script>

<template>
    <div>
        <h1>Log In</h1>
        <form @submit.prevent="submitForm">
            <label>Username: </label>
            <input type="email" name="username" v-model="username"> <br><br>
            <label>password: </label>
            <input type="password" name="password" v-model="password"> <br><br>
            <button type="submit">Log In</button>
        </form>
    </div>
</template>