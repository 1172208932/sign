<template>
    <div class="popboxS">
        <van-popup overlay-class="graypop" v-model:show="showPopup" @click-close-icon="onClickCloseIcon"
            :close-on-click-overlay="false">
            <div class="overbg-sure">
                <div class="title">只能为一个城市点亮亚运火炬，请确认是否点亮，为其增加热力值。</div>
                <div class="close-btn">再想想</div>
                <div class="sure-btn">确认点亮</div>
                <!-- <img v-else src="../assets/know-btn.png" class="close" @click="$emit('closePop')" alt="" /> -->
            </div>
        </van-popup>
    </div>
</template>
    
<script setup lang="ts">
import { showToast } from "vant";
import { ref, watch, onMounted, nextTick } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

const props = defineProps<{

    show: boolean

}>()
const emit = defineEmits(['closePop'])

let showPopup = ref<boolean>(false);

watch(props, (newProps) => {
    showPopup.value = newProps.show;
});

let animation

onMounted(() => {
})

function onClickCloseIcon() {
    emit('closePop')
}


</script>
    
<style  lang="scss" >
.overbg-sure {
    background: url(../assets/dialog-bg1.png) no-repeat;
    background-size: 572px 390px;
    width: 572px;
    height: 390px;
    overflow: hidden;

    .title {
        margin-top: 71px;
        margin-left: 70px;
        width: 433px;
        height: 135px;
        font-size: 32px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #303030;
        line-height: 45px;
    }

    .close-btn {
        position: absolute;
        top: 284px;
        left: 39px;
        width: 232px;
        height: 74px;
        background: linear-gradient(180deg, #EBE9EA 0%, #AA9A9D 100%);
        border-radius: 37px;
        font-size: 32px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #FFFFFF;
        line-height: 74px;
        text-align: center;
    }

    .sure-btn {
        position: absolute;
        top: 284px;
        right: 39px;
        width: 232px;
        height: 74px;
        background: linear-gradient(180deg, #FE709E 0%, #FC3D65 100%);
        border-radius: 37px;
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

    background-color: rgba(0, 0, 0, .9);

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
