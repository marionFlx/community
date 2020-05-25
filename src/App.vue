<template>
  <div>
    <Navbar />
    <div class="container" style="margin-top: 70px;">
      <div v-if="error" class="alert alert-danger">
        An error occurred while loading.
      </div>
      <Suspense v-else>
        <RouterView />
        <template #fallback>
          Loading...
        </template>
      </Suspense>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onErrorCaptured, ref } from 'vue';
import Navbar from '@/components/Navbar.vue';

export default defineComponent({
  name: 'App',

  components: {
    Navbar
  },

  setup() {
    const error = ref(false);
    onErrorCaptured(() => {
      error.value = true;
      return true;
    });
    return { error };
  }
});
</script>

<style>
@import '~bootstrap/dist/css/bootstrap.min.css';
@import '~font-awesome/css/font-awesome.min.css';
</style>
