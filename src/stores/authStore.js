import { defineStore } from 'pinia'
import { ref } from 'vue';

export const useAuthStore = defineStore('auth',() => {
  const auth = ref(null);
  function changeAuth(e) {
    auth.value = e;
  }
  return { auth, changeAuth }
})