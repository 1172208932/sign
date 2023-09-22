<template>
    <div class="scroll-box" @scroll="handleScroll">
        <div class="first-page">
            <div id="canvas1"></div>
        </div>
        <div class="second-page" ref="canRef" @click="toSecongPage"></div>
    </div>
</template>
    
<script setup lang="ts">
import { showToast } from "vant";
import { ref, watch, onMounted, onUnmounted, nextTick } from "vue";
import { useRouter } from "vue-router";
import lottie from 'lottie-web';
import indexjson from './data.json'
import { useStore } from "vuex";

const store = useStore();

// import { postSignUp } from '@/api/resource'
const canRef = ref(null);
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

const toSecongPage = ()=>{
    // store.commit("setNowPage",'SecondPage')
    router.push({
        name: "video",
      });
}

onMounted(() => {
    window.addEventListener('scroll', handleScrollWindows);

    animation = lottie.loadAnimation({
        container: document.getElementById('canvas1'),
        renderer: 'svg',
        loop: false,
        autoplay: true,
        animationData: indexjson,
        assetsPath: 'src/assets/images/',
    });
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

onUnmounted(() => {
    window.removeEventListener('scroll', handleScrollWindows);
})

const handleScrollWindows = () => {
    const targetElement = canRef.value;
    const rect = targetElement.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    console.log(canRef.value, rect.top)
    if (rect.top < windowHeight && rect.bottom > 0) {
        console.log('目标元素已进入视口');
        // 执行相应的操作
    } else {
        console.log('目标元素已离开视口');
        // 执行相应的操作
    }
}

const handleScroll = (event) => {
    const targetElement = canRef.value;
    const rect = targetElement.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    console.log(canRef.value, rect.top, windowHeight)
    // && rect.bottom > 0
    if (rect.top < windowHeight) {
        console.log('目标元素已进入视口');
        // 执行相应的操作
    } else {
        // console.log('目标元素已离开视口');
        // 执行相应的操作
    }
}

async function sureBtnClick() {

}

function onClickCloseIcon() {
    emit('closePop')
}


</script>
    
<style  lang="scss" >
.overbg-sure {}

.scroll-box {
    width: 100vw;
    height: 100vh;
    overflow-y: scroll;
}

.first-page {
    background: url(../../../assets/3.png) no-repeat;
    background-size: 750px 1624px;
    width: 750px;
    height: 1624px;
}
.second-page{
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

.ani1 {
    position: absolute;
    top: 2100px;
    width: 100px;
    height: 100px;
    background-color: azure;
}</style>
