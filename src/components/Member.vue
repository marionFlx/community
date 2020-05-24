<template>
  <div>
    <h2>{{ memberModel.name }}</h2>
    <p>{{ signupDate }}</p>
    <ul>
      <li v-for="interest of memberModel.interests" :key="interest.id">{{ interest.label }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { MemberModel } from '@/models/MemberModel';
import fromNow from '@/utils/FromNow';

export default defineComponent({
  name: 'Member',

  props: {
    memberModel: {
      type: Object as PropType<MemberModel>,
      required: true
    }
  },

  setup(props) {
    const signupDate = computed(() => fromNow(props.memberModel.signupDate));
    return { signupDate };
  }
});
</script>
