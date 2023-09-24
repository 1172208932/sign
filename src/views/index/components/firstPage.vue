<template>
    <div ref="scrollRef" :class="canScroll ? 'scroll-box' : 'no-scroll'" @scroll="handleScroll">
        <audio ref="soundRef" loop src="http://ali-v.cztv.com/cztv/vod/2023/09/04/40ccfc735b74754732583f35e7cd9383/40ccfc735b74754732583f35e7cd9383_h264_128k_mp3.mp3"></audio>
        <div class="first-page">
            <div id="canvas2"></div>
            <div id="canvas1"></div>
            <div v-if="showTip" class="tip"></div>
            <div class="click-box" @click="beginAni"></div>
        </div>
        <div class="second-page" ref="canRef" @click="toSecongPage">
            <div id="canvas3"></div>
            <div class="flower1 an"></div>
            <div class="flower2 an"></div>
            <div class="flower3 an"></div>
            <div class="flower4 an"></div>
            <div class="flower5 an"></div>
            <div class="people1" @click="() => { peopleClick(0) }">
                <div class="title1 line1">总导演 沙晓岚 <div class="play-icon"></div>
                </div>
                <div class="title1 line2">杭州第19届亚运会开幕式</div>
                <div class="title2">无论是开幕式演出，还是城市的美、人的美，都是能够体现出中国传统文化的延续性，绽放独特绵延的人文雅韵。</div>
            </div>
            <div class="people2" @click="() => { peopleClick(1) }">
                <div class="title1 line1">宁珑 <div class="play-icon"></div>
                </div>
                <div class="title1 line2">《国风雅韵》芭蕾舞演员</div>
                <div class="title2">用芭蕾舞蹈将江南画卷诗意展开，“立起脚尖”的芭蕾特色与上身肢体的江南韵味互相“碰撞”，绽放别样风情。</div>
            </div>
            <div class="people3" @click="() => { peopleClick(2) }">
                <div class="title1 line1">黄琛迪 李艳超 <div class="play-icon"></div>
                </div>
                <div class="title1 line2">《钱塘潮涌》双人威亚演员</div>
                <div class="title2">首次在大型空间使用3D双威亚技术，和钱塘江大潮互动展现浪潮的“力与美”。</div>
            </div>
            <div class="people4" @click="() => { peopleClick(3) }">
                <div class="title1 line1">骆文博 <div class="play-icon"></div>
                </div>
                <div class="title1 line2">《白鹭精灵》演员</div>
                <div class="title2">登上亚运舞台的“白鹭”不仅仅是白鹭，还是人与自然和谐共生的代表，也是和平的象征。</div>
            </div>
            <div class="people5" @click="() => { peopleClick(4) }">
                <div class="title1 line1">平凡的微光-群演 <div class="play-icon"></div>
                </div>

                <div class="title2">跳舞跳到“脸红”、手开始抖、一次等待7到9小时……但他们说有这“一分钟时间的认可”也值得了。</div>
            </div>
            <div class="people6" @click="() => { peopleClick(5) }">
                <div class="title1 line1">引导员 <div class="play-icon"></div>
                </div>
                <div class="title1 line2">杭州第19届亚运会开幕式</div>
                <div class="title2">一群之前没有经过形体训练，特别“素”的孩子，第一次在她们眼中“很大”的场馆里亮相，绽放的笑容都是最真挚的祝福。</div>
            </div>
            <div class="people7" @click="() => { peopleClick(6) }">
                <div class="title1 line1">旗手 <div class="play-icon"></div>
                </div>
                <div class="title1 line2">杭州第19届亚运会开幕式</div>
                <div class="title2">从进场口到升旗台，每一步都彰显着中国军人的威武。这背后的苦练和巧练，只为了“国家的荣耀、人民的期望”。</div>
            </div>
        </div>
    </div>
</template>
    
<script setup lang="ts">
import { showToast } from "vant";
import { ref, watch, onMounted, onUnmounted, nextTick } from "vue";
import { useRouter } from "vue-router";
import lottie from 'lottie-web';
import indexjson from './data.json'
import { useStore } from "vuex";
import json2 from './data2.json'
import json3 from './data3.json'

const soundConfig = ['https://ohudong.cztv.com/1/266130/sound/shatan.mp3','https://ohudong.cztv.com/1/266130/sound/balei.mp3',
         'https://ohudong.cztv.com/1/266130/sound/weiya.mp3',
         'https://ohudong.cztv.com/1/266130/sound/bailu.mp3',
          'https://ohudong.cztv.com/1/266130/sound/pingfan.mp3',
          'https://ohudong.cztv.com/1/266130/sound/yindao.mp3',
          'https://ohudong.cztv.com/1/266130/sound/qishou.mp3'

]

const scrollRef = ref(null)
const soundRef = ref(null)
const store = useStore();
const canScroll = ref(false)

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
let showTip = ref<boolean>(true);

let isIndexAniFinish = ref<boolean>(false);


// watch(props, (newProps) => {
//     showPopup.value = newProps.show;
// });

let animation, animation2, animation3;

const toSecongPage = () => {
    // store.commit("setNowPage",'SecondPage')

}

const beginAni = () => {
    soundRef.value.play()


    showTip.value = false

    animation.play()
    console.log(animation2)
    console.log(animation)

    animation2.play()
}

const peopleClick = (num) => {
    const viodo = document.getElementById('sound')
    // if(!viodo){
    //     var audio = document.createElement('audio');
    //     // 设置音频源
    //     audio.src = soundConfig[num];

    //     // 设置其他属性
    //     audio.autoplay = true; // 自动播放
    //     audio.id = 'sound'

    //     // 将 audio 元素添加到 body 中
    //     document.body.appendChild(audio);
    //     audio.play();
    // }
    

    router.push({
        name: "video",
        query: {
            actIndex: num
        }
    });
}

onMounted(() => {
    const isTextUrl = import.meta.env.VITE_RESOURCE_URL;
    animation = lottie.loadAnimation({
        container: document.getElementById('canvas1'),
        renderer: 'svg',
        loop: false,
        autoplay: false,
        animationData: indexjson,
        assetsPath: isTextUrl + 'images/',
    });

    animation2 = lottie.loadAnimation({
        container: document.getElementById('canvas2'),
        renderer: 'svg',
        loop: false,
        autoplay: false,
        animationData: json2,
        assetsPath: isTextUrl + 'images2/',
    });

    animation2.setSpeed(2);

    animation3 = lottie.loadAnimation({
        container: document.getElementById('canvas3'),
        renderer: 'svg',
        loop: false,
        autoplay: false,
        animationData: json3,
    });

    console.log(animation3, 'animation3')

    animation.addEventListener('complete', () => {
        animation.goToAndPlay(4, true)
    });

    animation2.addEventListener('complete', () => {
        animation2.goToAndPlay(38, true)
        isIndexAniFinish.value = true
        if (!canScroll.value) {
            // scrollRef.value.scrollTop = 200
            scrollToDistance(380)
        }
        canScroll.value = true
    });
})


const scrollToDistance = (distance) => {
    const container = scrollRef.value;
    const start = container.scrollTop;
    const change = distance - start;
    const duration = 500; // 持续时间（毫秒）

    let currentTime = 0;
    const increment = 20; // 每次滚动的时间间隔（毫秒）

    const animateScroll = () => {
        currentTime += increment;
        const easing = easeInOutQuad(currentTime, start, change, duration);
        container.scrollTop = easing;
        if (currentTime < duration) {
            setTimeout(animateScroll, increment);
        }
    };

    animateScroll();
}
const easeInOutQuad = (t, b, c, d) => {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
}

onUnmounted(() => {
    animation3.destroy()
})

const handleScroll = (event) => {
    const targetElement = canRef.value;
    const rect = targetElement.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    // console.log(rect.bottom - rect.top)
    let height = rect.bottom - rect.top
    // console.log(rect.top, rect.bottom,windowHeight)

    let now = rect.bottom - windowHeight
    // console.log(height,now)
    // && rect.bottom > 0

    if (height > now && isIndexAniFinish.value) {
        let promess = Math.floor((height - now) / height * 100)
        let time = Math.floor(108 * promess / 100)
        // console.log( time )
        animation3.goToAndStop(time - 12, true)
    }

    if (rect.top < windowHeight) {
        // console.log('目标元素已进入视口');
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
    overflow-x: hidden;
}

.no-scroll {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
}

.first-page {
    position: relative;
    background: url(../../../assets/3.png) no-repeat;
    background-size: 750px 1447px;
    width: 750px;
    height: 1447px;
}

.tip {
    background: url(../../../assets/tip.png) no-repeat;
    background-size: 198px 125px;
    width: 198px;
    height: 125px;
    position: absolute;
    top: 888px;
    left: 458px;
}

.second-page {
    background: url(../../../assets/bg2.png) no-repeat;
    background-size: 750px 2448px;
    width: 750px;
    position: relative;
    // height: 2448px;
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
}

#canvas1 {
    position: absolute;
    pointer-events: none;
    top: 374px;
    width: 750px;

}

#canvas2 {
    position: absolute;
    top: 1010px;
    left: 42px;
    width: 750px;

}

.click-box {
    position: absolute;
    top: 464px;
    // left: 580px;
    width: 90%;
    left: 5%;
    height: 550px;
}

.title1 {
    font-size: 30px;
    font-family: Source Han Sans CN-Bold, Source Han Sans CN;
    font-weight: bold;
    line-height: 30px;
    background: linear-gradient(180deg, #9815FF 0%, #569DD2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.title2 {
    font-size: 24px;
    font-family: Source Han Sans CN-Regular, Source Han Sans CN;
    font-weight: 400;
    color: #464646;
    line-height: 30px;
}

.line2 {
    font-size: 24px;
    margin-bottom: 15px;
    width: 120%;
}

.line1 {
    display: flex;
    margin-bottom: 15px;

    .play-icon {
        background: url(../../../assets/play-icon.png) no-repeat;
        background-size: 27px 30px;
        width: 27px;
        height: 30px;
        margin-left: 20px;
    }
}

.people1 {
    text-align: left;
    width: 272px;
    position: absolute;
    top: 60px;
    left: 50px;
}

.people2 {
    text-align: left;
    width: 272px;
    position: absolute;
    top: 450px;
    right: 40px;
}

.people3 {
    text-align: left;
    width: 272px;
    position: absolute;
    top: 780px;
    left: 40px;
}

.people4 {
    text-align: left;
    width: 272px;
    position: absolute;
    top: 1120px;
    right: 40px;
}

.people5 {
    text-align: left;
    width: 272px;
    position: absolute;
    top: 1460px;
    left: 40px;
}

.people6 {
    text-align: left;
    width: 252px;
    position: absolute;
    top: 1790px;
    right: 15px;
}

.people7 {
    text-align: left;
    width: 252px;
    position: absolute;
    top: 2130px;
    left: 40px;
}

.flower1 {
    background: url(../../../assets/flower1.png) no-repeat;
    background-size: 68px 69px;
    width: 68px;
    height: 69px;
    position: absolute;
    top: 324px;
    left: 82px;
}

.flower2 {
    background: url(../../../assets/flower4.png) no-repeat;
    background-size: 51px 51px;
    width: 51px;
    height: 51px;
    position: absolute;
    top: 715px;
    right: 48px;
}

.flower3 {
    background: url(../../../assets/flower3.png) no-repeat;
    background-size: 70px 71px;
    width: 70px;
    height: 71px;
    position: absolute;
    top: 1117px;
    left: 57px;
}

.flower4 {
    background: url(../../../assets/flower1.png) no-repeat;
    background-size: 68px 69px;
    width: 68px;
    height: 69px;
    position: absolute;
    top: 2056px;
    left: 55px;
}

.flower5 {
    background: url(../../../assets/flower5.png) no-repeat;
    background-size: 51px 51px;
    width: 51px;
    height: 51px;
    position: absolute;
    top: 1750px;
    right: 60px;
}

@-webkit-keyframes rotation {
    from {
        -webkit-transform: rotate(0deg);
    }

    to {
        -webkit-transform: rotate(360deg);
    }
}

.an {
    -webkit-transform: rotate(360deg);
    animation: rotation 3s linear infinite;
    -moz-animation: rotation 3s linear infinite;
    -webkit-animation: rotation 3s linear infinite;
    -o-animation: rotation 3s linear infinite;
}
</style>
