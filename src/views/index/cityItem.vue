<template>
    <div class="city-item">
        <div class="people"></div>
        <div class="t1">{{ title }}</div>
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
    width: 130px;

    .people {
        background: url(../../assets/people.png) no-repeat;
        background-size: 60px 85px;
        width: 60px;
        height: 85px;
    }

    .t1 {
        font-size: 28px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #272727;
        line-height: 85px;
    }
}
</style>
    