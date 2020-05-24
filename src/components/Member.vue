<template>
  <div>
    <h2>{{ memberModel.name }}</h2>
    <p>{{ signupDate }}</p>
    <div class="row">
      <div class="col" v-for="interest in memberModel.interests" :key="interest.id">
        <Interest :interestModel="interest" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { MemberModel } from '@/models/MemberModel';
import fromNow from '@/utils/FromNow';
import Interest from '@/components/Interest.vue';

export default defineComponent({
  name: 'Member',

  components: {
    Interest
  },

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
