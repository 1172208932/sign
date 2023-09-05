<template>
    <div class="city-item">
        <div class="t1">{{  }}</div>

        <div class="people"></div>
    </div>
</template>
    
<script setup lang="ts">
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

const props = defineProps<{
    title: string
}>()

let showPopup = ref<boolean>(false);

// watch(props, (newProps) => {
//     showPopup.value = newProps.show;
// });


</script>
    
<style  lang="scss" scoped>
.city-item {
    display: flex;
    width: 180px;
    // background-color: rgba($color: #000000, $alpha: .6);

    .people {
        // background: url(../../assets/people.png) no-repeat;
        background-size: 60px 85px;
        width: 60px;
        height: 85px;
        margin-right: 0;
    }

    .t1 {
        width: 120px;
        font-size: 28px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #272727;
        line-height: 85px;
    }
}
</style>
    