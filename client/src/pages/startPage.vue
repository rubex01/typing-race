<script setup>
import PlayerCreation from '@/components/playerCreation.vue'
import profile from '@/assets/images/profile.png'
import OptionSelector from "@/components/optionSelector.vue";
import {ref} from "vue";
import RegisterForm from "@/components/registerForm.vue";
import LoginForm from "@/components/loginForm.vue";

const guest = 'guest';
const login = 'login';
const register = 'register';

const formOptions = [
  guest,
  login,
  register
];
const selectedFormOption = ref('guest')

</script>

<template>
  <div class="start-page">
    <img :src="profile" class="start-page-image" alt="profile image" />
    <div>
      <player-creation class="start-page-form" v-if="selectedFormOption === guest" />
      <login-form class="start-page-form" v-else-if="selectedFormOption === login" />
      <register-form class="start-page-form" v-else-if="selectedFormOption === register" />
      <option-selector v-model="selectedFormOption" :options="formOptions" />
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/mixins';

.start-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  box-sizing: border-box;

  &-form {
    padding: 1.8rem 0 1.8rem 0;
    width: 100%;
    box-sizing: border-box;
  }

  @include mixins.mobile {
    flex-direction: column;
  }
}
</style>
