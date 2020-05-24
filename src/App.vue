<template>
  <div>
    <Navbar />
    <div class="container" style="margin-top: 70px;">
      <h1>Maplr Community</h1>
      <Members />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Navbar from '@/components/Navbar.vue';
import Members from '@/views/Members.vue';

export default defineComponent({
  name: 'App',

  components: {
    Navbar,
    Members
  }
});
</script>

<style>
@import '~bootstrap/dist/css/bootstrap.min.css';
@import '~font-awesome/css/font-awesome.min.css';
</style>
