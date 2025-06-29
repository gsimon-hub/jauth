import { defineStore } from "pinia";
import { ref } from "vue";

export const useJwtStore = defineStore('token', () => {
    const access = ref('')
    const refresh = ref('')

    function initializeStore() {
        if (localStorage.getItem('access')) {
            access.value = localStorage.getItem('access')
            refresh.value = localStorage.getItem('refresh')
        } else {
            access.value = ''
            refresh.value = ''
        }
    }

    function setAccess(acc) {
        access.value = acc
    }

    function setRefresh(acc) {
        refresh.value = acc
    }

    return {access, refresh, initializeStore, setAccess, setRefresh}
})