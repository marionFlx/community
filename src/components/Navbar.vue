<template>
  <nav class="navbar navbar-expand-md navbar-light bg-light">
    <a class="navbar-brand">Maplr Community</a>
    <button type="button" class="navbar-toggler" @click="toggleNavbar()">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div id="navbar" class="navbar-collapse" :class="{ collapse: navbarCollapsed }">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <a class="nav-link">Maplrs</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'NavBar',

  setup() {
    const navbarCollapsed = ref(true);
    function toggleNavbar() {
      navbarCollapsed.value = !navbarCollapsed.value;
    }
    return { navbarCollapsed, toggleNavbar };
  }
});
</script>
