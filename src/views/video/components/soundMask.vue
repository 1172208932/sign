<template>
    <div class="soundPage">
        <div class="logio"></div>
        <div class="t1">杭州第19届亚运会开幕式总导演 沙晓岚</div>
        <div class="t2">无论是开幕式演出，还是城市的美、人的美，都是能够体现出中国传统文化的延续性，绽放独特绵延的人文雅韵。</div>
        <div class="center-img"></div>
        <div class="t3">听，这是开幕式总导演的声音</div>
        <div class="cirle">
            <div class="begin-btn" @click="begin"></div>
        </div>
    </div>
</template>
    
<script setup lang="ts">
import { showToast } from "vant";
import { ref, watch, onMounted, onUnmounted, nextTick } from "vue";
import { useRouter } from "vue-router";

// import { postSignUp } from '@/api/resource'
const canRef = ref(null);

const emit = defineEmits(['closeSound', 'closeAndOpenNext'])

let showPopup = ref<boolean>(false);

const begin = () => {
    emit('closeSound')
}

onMounted(() => {


})

onUnmounted(() => {
})
</script>
    
<style  lang="scss" >
.soundPage {
    position: absolute;
    background: url(../../../assets/soundBg.png) no-repeat;
    background-size: 750px 1624px;
    width: 750px;
    height: 1624px;
    top: 0px;

    .logio {
        position: absolute;
        background: url(../../../assets/logo.png) no-repeat;
        background-size: 274px 34px;
        width: 274px;
        height: 34px;
        top: 31px;
        left: 43px;
    }

    .t1 {
        font-size: 40px;
        font-family: Source Han Sans CN-Medium, Source Han Sans CN;
        font-weight: 500;
        line-height: 47px;
        background: linear-gradient(100deg, #9815FF 0%, #569DD2 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        width: 577px;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 278px;
    }

    .t2 {
        width: 356px;
        font-size: 24px;
        font-family: Source Han Sans CN-Regular, Source Han Sans CN;
        font-weight: 400;
        color: #464646;
        line-height: 40px;
        // -webkit-background-clip: text;
        // -webkit-text-fill-color: transparent;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 578px;
    }

    .t3 {
        font-size: 24px;
        font-family: Source Han Sans CN-Regular, Source Han Sans CN;
        font-weight: 400;
        color: #FFFFFF;
        line-height: 40px;
        // text-shadow: 0px 2px 3px rgba(0, 0, 0, 0.4);
        // -webkit-background-clip: text;
        // -webkit-text-fill-color: transparent;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 988px;
    }

    .center-img {
        background: url(../../../assets/sound-line.png) no-repeat;
        background-size: 606px 97px;
        width: 606px;
        height: 97px;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 800px;
    }
}

.cirle {
    position: absolute;
    background: url(../../../assets/sound-cirle.png) no-repeat;
    background-size: 750px 450px;
    width: 750px;
    height: 450px;
    bottom: 0px;

    .begin-btn {
        background: url(../../../assets/begin-sound.png) no-repeat;
        background-size: 315px 143px;
        width: 315px;
        height: 143px;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 100px;
    }
}
</style>
