<template>
    <div class="popboxS">
        <div class="success-ani" id="success-ani-dom" ref="childRef"></div>
        <van-popup overlay-class="graypop" v-model:show="showPopup" @click-close-icon="onClickCloseIcon"
            :close-on-click-overlay="false">
            <div class="overbg-success">
                <div class="t1">点亮{{cityName}}</div>
                <div class="t2">获得一枚火炬徽章</div>
                <div class="t3">已为您的城市增加热力值</div>
                <div class="img-icon"></div>
                <div class="sure-btn" @click="$emit('closePop')"></div>
                <!-- <img v-else src="../assets/know-btn.png" class="close" @click="$emit('closePop')" alt="" /> -->
            </div>
        </van-popup>
    </div>
</template>
    
<script setup lang="ts">
import { showToast } from "vant";
import { ref, watch, onMounted, nextTick } from "vue";
import { useRouter } from "vue-router";
import lottie from 'lottie-web'
import ani from "./ani.json"
const router = useRouter();

const props = defineProps<{
    cityName:string,
    show: boolean

}>()
const emit = defineEmits(['closePop'])

let showPopup = ref<boolean>(false);

watch(props, (newProps) => {
    showPopup.value = newProps.show;
    if (showPopup.value == true) {
        nextTick(() => {
            animation.goToAndPlay(0)
        })
    }
});

let animation

onMounted(() => {
    animation = lottie.loadAnimation({
        container: document.querySelector('#success-ani-dom'),
        renderer: 'svg',
        loop: false,
        autoplay: false,
        animationData: ani,
    })
})

function onClickCloseIcon() {
    emit('closePop')
}


</script>
    
<style  lang="scss" >
.overbg-success {
    background: url(../assets/dialog-bg2.png) no-repeat;
    background-size: 572px 607px;
    width: 572px;
    height: 607px;
    overflow: hidden;

    .t1 {
        margin-top: 50px;
        // margin-left: 166px;
        text-align: center;
        width: 100%;
        height: 72px;
        font-size: 60px;
        font-family: FZY4K--GBK1-0, FZY4K--GBK1;
        font-weight: normal;
        color: #E1335C;
        line-height: 72px;
    }

    .t2 {
        margin: 36px auto 0 auto;
        width: 433px;
        height: 32px;
        font-size: 32px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #231344;
        line-height: 32px;
    }

    .t3 {
        margin: 15px auto 0 auto;
        width: 100%;
        text-align: center;
        height: 30px;
        font-size: 28px;
        font-family: PingFang-SC-Medium, PingFang-SC;
        font-weight: 500;
        color: #231344;
        line-height: 30px;

    }

    .img-icon {
        background: url(../assets/icon.png) no-repeat;
        background-size: 176px 178px;
        width: 176px;
        height: 178px;
        margin: 22px auto 0 auto;
    }

    .sure-btn {
        margin: 10px auto 0 auto;
        width: 232px;
        height: 85px;
        background: url(../assets/new-button2.png) no-repeat;
        background-size: 232px 85px;
        font-size: 32px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #FFFFFF;
        line-height: 74px;
        text-align: center;
    }
}

.success-ani {
    z-index: 3000;
    position: fixed;
    left: 0px;
    top: -300px;
    width: 750px;
    height: 1624px;
    pointer-events: none;
}

.icon-box {
    position: absolute;
    top: 550px;
    display: flex;
    left: 70px;
    width: 550px;

    .item {
        margin-left: 10px;
    }
}

.close-icon {
    background: url(../assets/lock.png) no-repeat;
    background-size: 95px 95px;
    width: 95px;
    height: 95px;
    color: #FFFFFF;
    padding-top: 55px;
}

.open-icon {
    background: url(../assets/lockun.png) no-repeat;
    background-size: 95px 95px;
    width: 95px;
    height: 95px;
    color: #FFFFFF;
    padding-top: 55px;
}

.popboxS {
    .van-popup {
        background: none !important;
    }
}

.graypop {

    // background-color: rgba(0, 0, 0, .9);

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
