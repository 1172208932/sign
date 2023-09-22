<template>
    <div class="first-page">
        <div id="canvas1"></div>
    </div>
</template>
    
<script setup lang="ts">
import { showToast } from "vant";
import { ref, watch, onMounted, nextTick } from "vue";
import { useRouter } from "vue-router";
import lottie from 'lottie-web';
import indexjson from './data.json'

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

let animation;

onMounted(() => {
    // animation = lottie.loadAnimation({
    //     container: document.getElementById('canvas1'),
    //     renderer: 'svg',
    //     loop: false,
    //     autoplay: false,
    //     animationData: indexjson,
    //     assetsPath: 'src/assets/images/',
    // });
    // animation.addEventListener('complete', () => {
    //     console.log('end')
    //     // 设置开始帧和结束帧
    //     animation.goToAndPlay(90, true)
    //     // animation.stop()
    //     // goToAndPlay(20, 40, true); // 替换为你想要的开始帧和结束帧

    //     // // 重新播放动画
    //     // animation.play();
    // });

})

async function sureBtnClick() {

}

function onClickCloseIcon() {
    emit('closePop')
}


</script>
    
<style  lang="scss" >
.overbg-sure {}

.first-page {
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
