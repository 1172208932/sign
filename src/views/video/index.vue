<template>
  <div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  onMounted,
  SetupContext,
  ref,
} from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { showToast } from 'vant';

export default defineComponent({
  name: "videoPage",
  components: {
  },
  setup(props, { emit }: SetupContext) {
    const store = useStore();
    const { index } = store.state;

    onMounted(async () => {
    });
  },
});
</script>

<style lang="scss" scoped >
</style>
