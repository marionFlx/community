<template>
  <figure @click="clicked()">
    <img :src="interestImageUrl" :alt="interestModel.label" />
    <figcaption>{{ interestModel.label }}</figcaption>
  </figure>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { InterestModel } from '@/models/InterestModel';

export default defineComponent({
  name: 'Interest',

  props: {
    interestModel: {
      type: Object as PropType<InterestModel>,
      required: true
    }
  },

  setup(props, { emit }) {
    const interestImageUrl = computed(() => `/images/icon-${props.interestModel.type.toString().toLowerCase()}.svg`);

    function clicked() {
      emit('interestSelected');
    }

    return { interestImageUrl, clicked };
  }
});
</script>

<style scoped>
figure {
  margin: 3px;
  padding: 3px;
  font-size: 12px;
}

img {
  height: 30px;
  color: red;
}
img > svg {
  display: block;
}
</style>
