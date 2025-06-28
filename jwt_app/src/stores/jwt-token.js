import { defineStore } from "pinia";
import { ref } from "vue";

export const useJwtStore = defineStore('token', () => {
    const access = ref('')
    const refresh = ref('')

    function initializeStore() {
        if (localStorage.getItem('access')) {
            access.value = localStorage.getItem('access')
        } else {
            access.value = ''
        }
    }

    function setAccess(acc) {
        access.value = acc
    }

    return {access, refresh, initializeStore, setAccess}
})