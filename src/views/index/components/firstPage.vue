<template>
    <div class="first-page">
    </div>
</template>
    
<script setup lang="ts">
import { showToast } from "vant";
import { ref, watch, onMounted, nextTick } from "vue";
import { useRouter } from "vue-router";
// import { postSignUp } from '@/api/resource'

const router = useRouter();

const props = defineProps<{
    // cityName?:string,
    // selectCityId?: number,
    // show?: boolean
}>()
const emit = defineEmits(['closePop', 'closeAndOpenNext'])

let showPopup = ref<boolean>(false);

// watch(props, (newProps) => {
//     showPopup.value = newProps.show;
// });

let animation

onMounted(() => {
})

async function sureBtnClick() {

}

function onClickCloseIcon() {
    emit('closePop')
}


</script>
    
<style  lang="scss" >
.overbg-sure {
}

.first-page{
    background: url(../../../assets/3.png) no-repeat;
    background-size: 750px 1624px;
    width: 750px;
    height: 1624px;
}

.close {
    width: 333px;
    height: 91px;
    position: absolute;
    top: 700px;
    left: 50%;
    transform: translateX(-50%);
}
</style>
