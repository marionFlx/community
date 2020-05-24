<template>
  <div>
    <Member v-for="member in members" :key="member.id" :memberModel="member" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { MemberModel } from '@/models/MemberModel';
import Member from '@/components/Member.vue';
import { useMemberService } from '@/composables/MemberService';

export default defineComponent({
  name: 'Members',

  components: {
    Member
  },

  async setup() {
    const memberService = useMemberService();
    const members = ref<Array<MemberModel>>(await memberService.list());
    return { members };
  }
});
</script>
