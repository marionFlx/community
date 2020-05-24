<template>
  <div>
    <Member v-for="member in members" :key="member.id" :memberModel="member" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { MemberModel } from '@/models/MemberModel';
import { InterestTypeEnum } from '@/enums/InterestTypeEnum';
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
          { id: 1, label: 'Gym', type: InterestTypeEnum.SPORT },
          { id: 2, label: 'Triton', type: InterestTypeEnum.JOB },
          { id: 3, label: 'Netflix', type: InterestTypeEnum.ACTIVITY }
        ]
      },
      {
        id: 2,
        name: 'Pierre',
        signupDate: '2020-02-18T08:02:00Z',
        interests: [
          { id: 4, label: 'Toulouse', type: InterestTypeEnum.FROM },
          { id: 5, label: 'Ubisoft', type: InterestTypeEnum.JOB },
          { id: 6, label: 'Poker', type: InterestTypeEnum.ACTIVITY }
        ]
      },
      {
        id: 3,
        name: 'Alexandre',
        signupDate: '2019-02-18T08:02:00Z',
        interests: [
          { id: 7, label: 'Travel', type: InterestTypeEnum.PASSION },
          { id: 8, label: 'Toronto', type: InterestTypeEnum.TRAVEL },
          { id: 3, label: 'Netflix', type: InterestTypeEnum.ACTIVITY }
        ]
      },
      {
        id: 4,
        name: 'Marion',
        signupDate: '2018-02-18T08:02:00Z',
        interests: [
          { id: 7, label: 'Travel', type: InterestTypeEnum.PASSION },
          { id: 9, label: 'Entrepreneur', type: InterestTypeEnum.JOB },
          { id: 3, label: 'Netflix', type: InterestTypeEnum.ACTIVITY }
        ]
      }
    ]);

    return { members };
  }
});
</script>
