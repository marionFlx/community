<template>
  <nav class="navbar navbar-expand-md navbar-light bg-light">
    <RouterLink to="/" class="navbar-brand">Maplr Community</RouterLink>
    <button type="button" class="navbar-toggler" @click="toggleNavbar()">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div id="navbar" class="navbar-collapse" :class="{ collapse: navbarCollapsed }">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <RouterLink to="/members" class="nav-link">Members</RouterLink>
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
