<template>
    <van-popup v-model:show="showPopup" :close-on-click-overlay="false">
        <div class="overBg">
            <div class="phone-box">
                    <van-field placeholder="请输入参赛手机号..." size="large" class="phone-in" v-model="telValue" type="tel" label=""
                        left-icon="phone-o" />
                        <div class="down-btn">确定下载</div>
            </div>
        </div>
        <img src="../assets/close.png" class="close" @click="$emit('closePop')" alt="" />

    </van-popup>
</template>
  
<script setup lang="ts">
import { ref, defineComponent } from "vue";
import EventBus from "@/utils/eventbus";
import 'vant/es/field/style';
const props = defineProps({
    show: Boolean,
});
let showPopup = ref<boolean>(false);
let telValue = ref<string>('')
watch(props, (newProps) => {
    showPopup.value = newProps.show;
});

function close() {
    EventBus.fire("CLOSEPOP")
}
</script>
  
<style scoped>
:root:root {
    --van-field-input-text-color: red;
}

.phone-box {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 100px;
    width: 460px;
}

.phone-in{
    border-bottom: 1px solid black;

}

.down-btn{
		margin-top: 30px;
		width: 100%;
		background-color: #f25c59;
		color: #ffffff;
		font-size: 26px;
		height: 73px;
		line-height: 73px;
        font-weight: bold;
	}

.van-popup {
    background: none !important;
}

.close {
    position: absolute;
    right: 20px;
    top: 20px;
    width: 48px;
    height: 49px;
}

.right_btn {
    width: 220px;
    height: 72px;
    position: absolute;
    top: 700px;
    left: 330px;
}

.glod_icon {
    width: 33px;
    height: 33px;
    position: absolute;
    top: 580px;
    left: 260px;
}

.title {
    width: 100%;
    text-align: center;
    position: absolute;
    top: 500px;
    font-size: 28px;
    font-weight: 700;
    color: #148c85;
}

.glod_num {
    width: 200px;
    text-align: left;
    position: absolute;
    top: 565px;
    left: 305px;
    font-size: 48px;
    font-weight: 700;
    color: #148c85;
}

.left_btn {
    width: 220px;
    height: 72px;
    position: absolute;
    top: 700px;
    left: 60px;
}


.back-btn {
    width: 280px;
    height: 92px;
    top: 670px;
    background: url("../assets/btn_new.png") no-repeat top left / 100% 100%;
    position: absolute;
    color: #ffffff;
    font-size: 40px;
    transform: translateX(-50%);
    left: 50%;
    text-align: center;
    font-weight: bold;
    line-height: 92px;
}

.overBg {
    width: 554px;
    height: 410px;
    position: relative;
}


.begin-t2 {
    width: 100%;
    height: 92px;
    top: 320px;
    position: absolute;
    color: #36604b;
    font-size: 50px;
    transform: translateX(-50%);
    left: 50%;
    text-align: center;
    font-weight: 800;
    line-height: 92px;
}

.begin-t1 {
    width: 100%;
    height: 92px;
    top: 230px;
    position: absolute;
    color: #36604b;
    font-size: 50px;
    transform: translateX(-50%);
    left: 50%;
    text-align: center;
    font-weight: 800;
    line-height: 92px;
}

.innerText {
    position: absolute;
    top: 280px;
    width: 80%;
    left: 50%;
    transform: translateX(-50%);
    font-size: 15px;
    line-height: 40px;
    height: 60%;
    overflow-y: scroll;
}
</style>
  