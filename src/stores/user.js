import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore(
  "user",
  () => {
    const userInfo = ref(null);

    const setUserInfo = (info) => {
      userInfo.value = info;
    };

    const clearUserInfo = () => {
      userInfo.value = null;
    };

    return { userInfo, setUserInfo, clearUserInfo };
  },
  {
    persist: true,
  }
);
