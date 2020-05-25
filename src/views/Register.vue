<template>
  <div class="row">
    <div class="col-md-6 offset-md-3">
      <h1>Sign up</h1>

      <div id="registration-error" class="alert alert-danger" v-if="registrationFailed">
        <button type="button" class="close" aria-label="Close" @click="registrationFailed = false">
          <span aria-hidden="true">&#215;</span>
        </button>
        Try again with another login.
      </div>

      <form @submit.prevent="register()">
        <div class="form-group">
          <label for="email" :class="{ 'text-danger': dirty.email && errors.email }">Email</label>
          <input
            id="email"
            name="email"
            class="form-control"
            :class="{ 'is-invalid': dirty.email && errors.email }"
            v-model="userModel.email"
            @input.once="dirty.email = true"
          />
          <div v-if="dirty.email && errors.email" class="invalid-feedback d-block">Email is required.</div>
        </div>
        <div class="form-group">
          <label for="password" :class="{ 'text-danger': dirty.password && errors.password }">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            class="form-control"
            :class="{ 'is-invalid': dirty.password && errors.password }"
            v-model="userModel.password"
            @input.once="dirty.password = true"
          />
          <div v-if="dirty.password && errors.password" class="invalid-feedback d-block">The password is required.</div>
        </div>
        <button class="btn btn-primary" type="submit" :disabled="Object.keys(errors).length > 0">Let's Go!</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { UserModel } from '@/models/UserModel';
import { useUserService } from '@/composables/UserService';

export default defineComponent({
  name: 'Register',

  setup() {
    const userModel = reactive({
      email: '',
      password: ''
    } as UserModel);

    const dirty = reactive<{ [K in keyof UserModel]: boolean }>({
      email: false,
      password: false
    });

    const errors = computed(() => {
      const errors: Partial<Record<keyof UserModel, boolean>> = {};

      if (!userModel.email) {
        errors.email = true;
      }
      if (!userModel.password) {
        errors.password = true;
      }
      return errors;
    });

    const userService = useUserService();
    const registrationFailed = ref(false);
    const router = useRouter();
    async function register() {
      try {
        await userService.register(userModel);
        router.push({ name: 'members' });
      } catch (e) {
        registrationFailed.value = true;
      }
    }
    return { userModel, dirty, errors, registrationFailed, register };
  }
});
</script>
