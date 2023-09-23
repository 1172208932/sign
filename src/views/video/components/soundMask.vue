<template>
    <div class="soundPage" id="soundPage" ref="clickboxRef">
        <audio id="bg-music" ref="audioElement" loop :src="soundConfig[soundNum].sound"></audio>
        <div class="logio"></div>
        <div class="t1">{{ soundConfig[soundNum].t1 }}</div>
        <div class="t2">{{ soundConfig[soundNum].t2 }}</div>
        <div class="center-img"></div>
        <div class="t3">{{ soundConfig[soundNum].t3 }}</div>
        <div class="cirle">
            <div class="begin-btn" @click="begin"></div>
            <div class="pre-btn" @click="preClick"></div>
            <div class="next-btn" @click="nextClick"></div>
        </div>
    </div>
</template>
    
<script setup lang="ts">
import { showToast } from "vant";
import { ref, watch, onMounted, onUnmounted, nextTick } from "vue";
import { useRouter } from "vue-router";
import { Howl } from "howler";
import wx from "weixin-js-sdk";
const soundConfig = [
    {
        t1: '杭州第19届亚运会开幕式总导演 沙晓岚',
        t2: '无论是开幕式演出，还是城市的美、人的美，都是能够体现出中国传统文化的延续性，绽放独特绵延的人文雅韵。',
        t3: '听，那是江南雅韵发出的动人邀约',
        sound: 'https://ohudong.cztv.com/1/266130/sound/shatan.mp3'
    },
    {
        t1: '《国风雅韵》芭蕾舞演员 宁珑',
        t2: '用芭蕾舞蹈将江南画卷诗意展开，“立起脚尖”的芭蕾特色与上身肢体的江南韵味互相“碰撞”，绽放别样风情。',
        t3: '听，那是徐徐展开的江南诗意画卷',
        sound: 'https://ohudong.cztv.com/1/266130/sound/balei.mp3'
    },
    {
        t1: '《钱塘潮涌》双人威亚演员 黄琛迪 李艳超',
        t2: '炫酷的双人3D威亚表演背后，是无数次的大腿充血和贯穿始终的肌肉高速运转，只为再现钱塘江的无畏潮涌。',
        t3: '听，那是从远处滚滚而来的钱塘潮水',
        sound: 'https://ohudong.cztv.com/1/266130/sound/weiya.mp3'
    },
    {
        t1: '《白鹭精灵》演员 骆文博',
        t2: '登上亚运舞台的“白鹭”不仅仅是白鹭，还是人与自然和谐共生的代表，也是和平的象征。',
        t3: '听，那是“山间精灵”想要诉说的新故事',
        sound: 'https://ohudong.cztv.com/1/266130/sound/bailu.mp3'
    },
    {
        t1: '《平凡的微光》群演',
        t2: '跳舞跳到“脸红”、手开始抖、一次等待7到9小时……但他们说有这“一分钟时间的认可”也值得了。',
        t3: '听，那是一种为了“一分钟的肯定”付出的坚韧 ',
        sound: 'https://ohudong.cztv.com/1/266130/sound/pingfan.mp3'
    },
    {
        t1: '杭州第19届亚运会开幕式引导员',
        t2: '一群之前没有经过形体训练，特别“素”的孩子，第一次在她们眼中“很大”的场馆里亮相，绽放的笑容都是最真挚的祝福。',
        t3: '听，那是她们第一次在千万人前的亮相 ',
        sound: 'https://ohudong.cztv.com/1/266130/sound/yindao.mp3'
    },
    {
        t1: '杭州第19届亚运会开幕式旗手',
        t2: '从进场口到升旗台，每一步都彰显着中国军人的威武。这背后的苦练和巧练，只为了“国家的荣耀、人民的期望”。',
        t3: '听，那是整齐有力的步伐声荣耀登场',
        sound: 'https://ohudong.cztv.com/1/266130/sound/qishou.mp3'
    },

]

// import { postSignUp } from '@/api/resource'
const audioElement = ref(null);
const clickboxRef = ref(null)
const soundNum = ref(0);
let isFirst = true
let music = null

const props = defineProps<{
    num: Number
}>()

const emit = defineEmits(['closeSound', 'nextClick', 'preClick'])

let showPopup = ref<boolean>(false);

const begin = () => {
    emit('closeSound')
}

const preClick = () => {
    const viodo = document.getElementById('sound')
    viodo.pause()
    emit('preClick')

    soundNum.value--
    if (soundNum.value == -1) {
        soundNum.value = 6
    }
    nextTick(() => {
        audioElement.value.play();
    });
}

const palySound = () => {
    console.log('play')
    audioElement.value.play();
}

const nextClick = () => {
    const viodo = document.getElementById('sound')
    viodo.pause()
    emit('nextClick')
    soundNum.value++
    if (soundNum.value == 7) {
        soundNum.value = 0
    }
    nextTick(() => {
        palySound();
        audioElement.value.play();
    });

}

// music =  new Howl({
//     src: soundConfig[soundNum.value].sound,
//     preload: true,
//     autoplay: true,
//     loop: true,
//     onload: () => {
//         wx.ready(() => {
//             music.play();
//         });
//     }
// });

onMounted(() => {
    soundNum.value = props.num
    // audioAutoPlay();
    function audioAutoPlay() {
        console.log('audioAutoPlay')

        var audio = document.getElementById('bg-music');
        if(audio){
            console.log('-----isaudio')
        }
        console.log(audio,'audio')
        audio.play();
        document.addEventListener("WeixinJSBridgeReady", function () {
            console.log('WeixinJSBridgeReady')
            audio.play();
        }, false);
    }
    nextTick(() => {
        console.log('nextTick',audioElement)
        // var element = document.getElementById("soundPage");

        // // 创建一个新的点击事件
        // var event = new MouseEvent("click", {
        //     bubbles: true,
        //     cancelable: true,
        //     view: window
        // });

        // // 触发点击事件
        // element.dispatchEvent(event);
        // audioElement.value.play();
        // clickboxRef.value.click()
    });

    // setTimeout(() => {
    //     console.log('setTimeout')
    //     audioElement.value.play();
    // }, 1000);
})

onUnmounted(() => {
    const viodo = document.getElementById('sound')
    if(viodo){
        viodo.remove()
    }
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
        top: 458px;
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
        top: 858px;
    }

    .center-img {
        background: url(../../../assets/sound-line.png) no-repeat;
        background-size: 606px 97px;
        width: 606px;
        height: 97px;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 700px;
    }
}

.cirle {
    position: fixed;
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

    .pre-btn {
        background: url(../../../assets/pre-sound-btn.png) no-repeat;
        background-size: 186px 106px;
        width: 186px;
        height: 106px;
        position: absolute;
        bottom: 100px;
        left: 40px;
    }

    .next-btn {
        background: url(../../../assets/next-sound-btn.png) no-repeat;
        background-size: 186px 106px;
        width: 186px;
        height: 106px;
        position: absolute;
        bottom: 100px;
        right: 40px;
    }
}
</style>
