import { ref, watch } from "vue";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", () => {
   const user = ref({
       name: "",
       mail: "",
   });

   if (localStorage.getItem("user")) {
       user.value = JSON.parse(localStorage.getItem("user"));
   }

   watch(
       user,
       (userVal) => {
           localStorage.setItem("user", JSON.stringify(userVal));
       },
       {deep:true}
   );

   const changeName = (newName) => {
       user.value.name = newName;
   };

    const changeMail = (changeMail) => {
        user.value.mail = changeMail;
    };


   return {
       user,
       changeName,
       changeMail,
   };
});