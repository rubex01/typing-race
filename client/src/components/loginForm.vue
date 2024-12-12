<script setup>
import TextInput from "@/components/textInput.vue";
import {ref} from "vue";
import InputError from "@/components/inputError.vue";
import {loginUser} from "@/services/userService.js";

const email = ref('');
const password = ref('');
const errors = ref({});

const setErrorsFromResponse = (responseError) => {
  if (responseError.response.status !== 401) {
    return;
  }
  errors.value.password = ['Invalid email or password'];
}

const login = async (event) => {
  event.preventDefault()
  loginUser(email.value, password.value)
    .catch(errors => setErrorsFromResponse(errors))
}
</script>

<template>
  <form @submit="login" class="login-form">
    <text-input
      v-model="email"
      placeholder="Your email address"
      required="required"
      type="email"
      class="login-form-input"
      autocomplete="email"
    />
    <input-error :errors="[]" />
    <text-input
      v-model="password"
      placeholder="Your password"
      required="required"
      class="login-form-input"
      type="password"
      autocomplete="current-password"
    />
    <input-error :errors="errors.password" />
    <button type="submit" class="login-form-submit"></button>
  </form>
</template>

<style scoped lang="scss">
.login-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  &-submit {
    display: none;
  }

  &-input {
    width: 100%;
    box-sizing: border-box;
  }
}
</style>
