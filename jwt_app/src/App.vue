<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import { onBeforeMount, onMounted, ref } from 'vue';
import { useJwtStore } from './stores/jwt-token';
import axios from 'axios'

const jwtStore = useJwtStore()
// const access = ref('')

onBeforeMount(() => {
  jwtStore.initializeStore()
  const access = jwtStore.access
  
  console.log('access: ', access);
  
  if (access) {
    axios.defaults.headers.common['Authorization'] = 'JWT ' + access
  } else {
    axios.defaults.headers.common['Authorization'] = ''
  }
})

onMounted(() => {
  setInterval(() => {
    getAccess()
  }, 5000);
})

function getAccess() {
  const refreshData =  {
    refresh: jwtStore.refresh
  }

  axios
    .post('/api/v1/jwt/refresh', refreshData)
    .then(res => {
      const access = res.data['access']
      console.log(access);

      localStorage.setItem('access', access)
      jwtStore.access = access
    })
    .catch(err => {
      console.log(err);
    })
}
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/log-in">Log In</RouterLink>
        <RouterLink to="/sign-up">Sign Up</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
