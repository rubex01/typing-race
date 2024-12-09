<script setup>
import { ref, watch} from 'vue'
import TextInput from '@/components/textInput.vue'
import { registerUser} from "@/services/userService.js";
import {usePlayerStore} from "@/stores/player.js";
import InputError from "@/components/inputError.vue";
import {mapApiValidationErrors} from "@/helpers/mapApiValidationErrors.js";

const playerStore = usePlayerStore()

const errors = ref({})
const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

watch([password, confirmPassword], ([newPassword, newConfirmPassword]) => {
  errors.value.confirmPassword = [];

  if (newPassword && newConfirmPassword && newPassword !== newConfirmPassword) {
    errors.value.confirmPassword = ["Passwords do not match"]
  }
})

const setErrorsFromResponse = (responseError) => {
  if (responseError.response.status !== 400) {
    return;
  }
  errors.value = {
    confirmPassword: errors.value.confirmPassword,
    ...mapApiValidationErrors(responseError.response.data.errors)
  }
}

const register = async (event) => {
  event.preventDefault()

  await registerUser(name.value, email.value, password.value)
    .then(async () => await playerStore.login(email.value, password.value))
    .catch(error => setErrorsFromResponse(error))
}
</script>

<template>
  <form @submit="register" class="register-form">
    <text-input
      v-model="name"
      placeholder="Your player name"
      required="required"
      class="register-form-input"
      autocomplete="username"
    />
    <input-error :errors="errors.name" />
    <text-input
      v-model="email"
      placeholder="Your email address"
      required="required"
      type="email"
      class="register-form-input"
      autocomplete="email"
    />
    <input-error :errors="errors.email" />
    <text-input
      v-model="password"
      placeholder="Your password"
      required="required"
      class="register-form-input"
      type="password"
      autocomplete="new-password"
    />
    <input-error :errors="errors.password" />
    <text-input
      v-model="confirmPassword"
      placeholder="Confirm your password"
      required="required"
      class="register-form-input"
      type="password"
      autocomplete="new-password"
    />
    <input-error :errors="errors.confirmPassword" />
    <button type="submit" class="register-form-submit"></button>
  </form>
</template>

<style scoped lang="scss">
.register-form {
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
