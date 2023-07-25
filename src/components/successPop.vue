<template>
    <van-popup overlay-class="graypop" v-model:show="showPopup" :close-on-click-overlay="false">
        <div class="overBg">
            <img src="../assets/success_title.png" class="title-spop" alt="" />
            <div class="card-sbox">
                <img src="../assets/success-index.png" class="title-sindex" alt="" />
                <div class="index-sbg">
                    <div class="success-t1">Z视介迎亚运大联投“一球制胜”活动</div>

                    <div class="t-box">
                        <div v-if="props.radiolist?.length" class="success-t2">{{ props.radiolist[0].name }}：{{
                            props.radiolist[0].value }}</div>
                        <div v-if="props.radiolist?.length" class="success-t2">{{ props.radiolist[1].name }}：{{
                            props.radiolist[1].value }}</div>
                        <div v-if="props.sid" class="success-t3">报名ID：{{ props.sid }}</div>
                    </div>

                    <img src="https://ohudong.cztv.com/1/266056/static/code.png" class="title-simg" alt="" />
                </div>

            </div>
            <!-- <div class="back-btn"  @click="$emit('closePop')">继续阅读</div> -->
            <div class="text-stip">可截图保存至手机相册</div>
        </div>
        <img src="../assets/close.png" class="close" @click="$emit('closePop')" alt="" />

    </van-popup>
</template>
    
<script setup lang="ts">
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

const props = defineProps<{
    show: boolean
    sid: string
    radiolist: any[]
}>()


let showPopup = ref<boolean>(false);

watch(props, (newProps) => {
    showPopup.value = newProps.show;
});

function close() {
    router.replace({
        name: "homepage",
    });
}
</script>
    
<style  lang="scss" >
.van-popup {
    background: none !important;
}

.graypop {
    background-color: rgba(0, 0, 0, .9);
}

.index-sbg {
    margin: -4px 36px 0px 36px;
    position: relative;

    .success-t1 {
        position: absolute;
        left: 0;
        top: 0;
        width: 534px;
        height: 30px;
        font-size: 30px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #1E1F24;
        line-height: 42px;
        text-align: left;
    }

    .t-box {
        position: absolute;
        left: 0;
        top: 70px;

        .success-t2 {
            // margin-top: 14px;
            width: 394px;
            font-size: 22px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #848691;
            line-height: 34px;
            text-align: left;
        }

        .success-t3 {
            margin-top: 14px;
            // width: 162px;
            height: 22px;
            font-size: 22px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #1E1F24;
            line-height: 22px;
            text-align: left;
        }
    }

    .title-simg {
        position: absolute;
        right: 0;
        top: 70px;
        width: 116px;
        height: 116px;
        background: #D8D8D8;
    }
}

.close {
    width: 72px;
    height: 72px;
    margin-top: 80px;
}

.title-sindex {
    margin: 36px;
    width: 534px;
    height: 534px;
    border-radius: 22px;
    border: 2px solid rgba(0, 0, 0, 0.05)
}

.title-spop {
    width: 496px;
    height: 188px;
}

.card-sbox {
    margin-top: 12px;
    width: 606px;
    height: 852px;
    background-color: #ffffff;
    border-radius: 36px;
}

.text-stip {
    margin-top: 40px;
    font-size: 22px;
    font-weight: 400;
    color: #FFFFFF;
    line-height: 22px;
}
</style>
    