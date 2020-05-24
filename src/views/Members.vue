<template>
  <div>
    <Member v-for="member in members" :key="member.id" :memberModel="member" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { MemberModel } from '@/models/MemberModel';
import Member from '@/components/Member.vue';
import { useMemberService } from '@/composables/MemberService';

export default defineComponent({
  name: 'Members',

  components: {
    Member
  },

  setup() {
    const members = ref<Array<MemberModel>>([]);
    const memberService = useMemberService();
    onMounted(async () => {
      members.value = await memberService.list();
    });
    return { members };
  }
});
</script>
