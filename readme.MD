```typescript
/* 7:38am 27 Jun 25 */
// axios.defaults.baseURL = 'http://127.0.0.1:8000'
// app.use(router, axios) not work in typescript
// 🚩 https://blog.logrocket.com/how-to-use-axios-vue-js/
app.use(axios, {
    baseURL: 'http://127.0.0.1:8000'
})
```