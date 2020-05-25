<template>
  <div class="text-center" style="margin-top: 100px;">
    <div>
      <h1>
        Maplr Community
      </h1>
    </div>

    <div>
      <RouterLink to="/members" class="btn btn-large btn-primary">Go to members</RouterLink>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Home'
});
</script>
