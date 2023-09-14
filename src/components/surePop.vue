<template>
    <div class="popboxS">
        <van-popup overlay-class="graypop" v-model:show="showPopup" @click-close-icon="onClickCloseIcon"
            :close-on-click-overlay="false">
            <div class="overbg-sure">
                <div class="title">点亮{{cityName}}，为其增加热力值</div>
                <div class="close-btn" @click="$emit('closePop')"></div>
                <div class="sure-btn" @click="sureBtnClick"></div>
                <!-- <img v-else src="../assets/know-btn.png" class="close" @click="$emit('closePop')" alt="" /> -->
            </div>
        </van-popup>
    </div>
</template>
    
<script setup lang="ts">
import { showToast } from "vant";
import { ref, watch, onMounted, nextTick } from "vue";
import { useRouter } from "vue-router";
import { postSignUp } from '@/api/resource'

const router = useRouter();

const props = defineProps<{
    cityName:string,
    selectCityId: number,
    show: boolean
}>()
const emit = defineEmits(['closePop', 'closeAndOpenNext'])

let showPopup = ref<boolean>(false);

watch(props, (newProps) => {
    showPopup.value = newProps.show;
});

let animation

onMounted(() => {
})

async function sureBtnClick() {
    wm && wm.getToken('d38b59d1634344de990a5e75c4fdfad5', async (token) => {
        // 提交点赞业务请求            
        let res = await postSignUp({
            num: '1',
            vote_item_id: props.selectCityId,
            vote_id: 174,
            token,
        })

        if (res?.status_code == 200) {
            emit('closeAndOpenNext')
        } else {
            showToast(res?.message || '投票失败，请稍后重试！')
        }
    });


}

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
        margin-top: 124px;
        margin-left: 47px;
        width: 463px;
        height: 135px;
        font-size: 30px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #231344;
        line-height: 45px;
    }

    .close-btn {
        position: absolute;
        top: 234px;
        left: 39px;
        width: 233px;
        height: 85px;
        background: url(../assets/new-button1.png) no-repeat;
        background-size: 233px 85px;
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
        top: 234px;
        right: 39px;
        width: 233px;
        height: 85px;
        background: url(../assets/new-button3.png) no-repeat;
        background-size: 233px 85px;
        border-radius: 37px;
        font-size: 32px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #FFFFFF;
        line-height: 74px;
        text-align: center;
    }
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
