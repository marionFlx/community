<template>
  <div>
    <Member v-for="member in members" :key="member.id" :memberModel="member" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { MemberModel } from '@/models/MemberModel';
import Member from '@/components/Member.vue';

export default defineComponent({
  name: 'Members',

  components: {
    Member
  },

  setup() {
    const members = ref<Array<MemberModel>>([
      {
        id: 1,
        name: 'Julien',
        signupDate: '2019-02-18T08:02:00Z',
        interests: [
          { id: 1, label: 'Gym' },
          { id: 2, label: 'Triton' },
          { id: 3, label: 'Netflix' }
        ]
      },
      {
        id: 2,
        name: 'Pierre',
        signupDate: '2020-02-18T08:02:00Z',
        interests: [
          { id: 4, label: 'Trade' },
          { id: 5, label: 'Ubisoft' },
          { id: 6, label: 'Poker' }
        ]
      },
      {
        id: 3,
        name: 'Alexandre',
        signupDate: '2019-02-18T08:02:00Z',
        interests: [
          { id: 7, label: 'Travel' },
          { id: 8, label: 'Toronto' },
          { id: 3, label: 'Netflix' }
        ]
      },
      {
        id: 4,
        name: 'Marion',
        signupDate: '2018-02-18T08:02:00Z',
        interests: [
          { id: 7, label: 'Travel' },
          { id: 9, label: 'Entrepreneurship' },
          { id: 3, label: 'Netflix' }
        ]
      }
    ]);

    return { members };
  }
});
</script>
