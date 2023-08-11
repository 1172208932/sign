<template>
  <div class="box">
    <div class="intor">
      <van-form class="form" @submit="onSubmit">
        <van-cell-group inset>
          <img class="head-img" src="../../assets/head.png" alt="" />
          <van-field class="group" required v-model="username" name="string0" label="姓名" placeholder="请输入真实姓名"
            :rules="[{ required: true, message: '请填写姓名' }]" />
          <van-field required v-model="mobile" name="string1" label="手机号" placeholder="请输入手机号"
            :rules="[{ validator, required: true, message: '请填写正确的手机号' }]" />
          <van-field class="groupBottom" required v-model="trade" name="string2" label="身份证号" placeholder="请输入身份证号"
            :rules="[{ validator: validatorId, required: true, message: '请填写正确的身份证号' }]" />
          <SelectField :name="'radio13'" label="比赛场地" :columns="placeColumn" @config="configPlace"></SelectField>
          <SelectField ref="seleteTimeRef" :name="'radio12'" label="活动时间" :columns="timeColumns"></SelectField>
          <div style="margin: 16px;">
            <van-button class="jump-btn" native-type="submit">
            </van-button>
          </div>
        </van-cell-group>
      </van-form>
    </div>
    <success-pop v-model:show="showPop" :radiolist="radioList" :sid="sid" @closePop="backPopCall"></success-pop>

    <van-popup v-model:show="showPicker" position="bottom">
      <van-date-picker :min-date="minDate" @confirm="onConfirm" @cancel="showPicker = false" />
    </van-popup>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  SetupContext,
  ref,
} from "vue";
import { showToast } from 'vant';
import SuccessPop from "@/components/successPop.vue";
import { getRadioList } from "@/utils/index"

import { getossKey, upYunImg, getActiveInfo, postSignUp, randomString } from '@/api/resource'
import { areaList } from '@vant/area-data';
import { throttle } from "@/utils/throttle";
import { findArrValue } from "./config"
import SelectField from "./components/SelectField.vue"
let isFirst = false
export default defineComponent({
  name: "gameIndex",
  components: {
    SuccessPop,
    SelectField
  },
  setup(props, { emit }: SetupContext) {
    const mobile = ref('')      //手机号
    const fileList = ref([]);
    const fileVideoList = ref([]);
    const videoImageFileList = ref([]);
    const checked = ref(0);   // 性别
    const username = ref(''); //姓名
    const ownHave = ref(''); //我有你没有
    const trade = ref('');  //  流派&行当
    const team = ref('');  // 所属院团
    const works = ref('');  // 参赛作品
    const sid = ref('')
    const router = useRouter();
    let imgUrl, videoUrl, videoImgUrl;
    const result = ref('');
    const showPicker = ref(false);
    const resultArea = ref('');
    const groupResult = ref('');
    const radioList = ref<any[]>([])
    const placeColumn = ref<any[]>([])
    const timeColumns = ref<any[]>([])
    const seleteTimeRef = ref(null);
    let allTimeColumns: any[] = []

    let showPop = ref<boolean>(false);
    const backPopCall = () => {
      showPop.value = false;
      router.replace({
        name: "index",
      });
    }

    const configPlace = (selectedOptions) => {
      //@ts-ignore
      // seleteTimeRef.value.clearText()
      // if (selectedOptions[0]?.text == '余杭区西溪印象城B座B1层') {
      //   timeColumns.value = allTimeColumns.slice(2, 4)
      // } else {
      //   timeColumns.value = allTimeColumns.slice(0, 2)
      // }
    }


    const onConfirm = ({ selectedValues }) => {
      result.value = selectedValues.join('/');
      showPicker.value = false;
    };

    const init = async () => {
      let res = await getActiveInfo()
      console.log(res, 'res')
      allTimeColumns = filterColumn(res.extra.param[12].data)
      timeColumns.value = allTimeColumns
      // .slice(0, 2)
      placeColumn.value = filterColumn(res.extra.param[13].data).filter(item => {
        return item.text != '飞动篮球公园' && item.text != '硬核-古墩印象城馆'
      })
    };

    const filterColumn = (arr) => {
      let newArr: any[] = []
      arr.forEach((element, index) => {
        newArr.push({
          text: element,
          value: index
        })
      });
      return newArr
    }

    const afterRead = async (file) => {
      // 此时可以自行将文件上传至服务器
      console.log(file);
      file.status = 'uploading';
      file.message = '上传中...';

      let res = await getossKey()
      console.log(res, 'res')
      if (res.code == 200) {
        let { policy, dir, signature, accessid } = res.data;
        let randomStr = randomString(8)
        let randomTime = Date.parse(new Date() + '') / 1000
        let result = await upYunImg({
          policy,
          key: dir + randomTime + randomStr,
          OSSAccessKeyId: accessid,
          signature,
          file: file.file
        })
        file.status = 'done';
        imgUrl = 'https://o.cztvcloud.com/' + dir + randomTime + randomStr
        console.log(imgUrl, 'https://o.cztvcloud.com/350/202307/06/1688631065/1688631065000')
      }
    };

    const afterVideoImgRead = async (file) => {
      // 此时可以自行将文件上传至服务器
      console.log(file);
      file.status = 'uploading';
      file.message = '上传中...';

      let res = await getossKey()
      console.log(res, 'res')
      if (res.code == 200) {
        let { policy, dir, signature, accessid } = res.data;
        let randomStr = randomString(8)
        let randomTime = Date.parse(new Date() + '') / 1000
        let result = await upYunImg({
          policy,
          key: dir + randomTime + randomStr,
          OSSAccessKeyId: accessid,
          signature,
          file: file.file
        })
        file.status = 'done';
        console.log(result, 'result')
        videoImgUrl = 'https://o.cztvcloud.com/' + dir + randomTime + randomStr
        console.log(imgUrl, 'https://o.cztvcloud.com/350/202307/06/1688631065/1688631065000')
      }
    };

    const handleBeforeRead = (file) => {
      if (file.size > 500 * 1024 * 1024) {
        showToast('视频不能大于500M')
        return false;
      }
      const allowedTypes = ['video/mp4', 'video/mpeg', 'video/quicktime'];
      const fileType = file.type;

      // if(file.file.size > 500 * 1024 * 1024){
      //   showToast('视频不能大于500M')
      //   return false;
      // }

      if (!allowedTypes.includes(fileType)) {
        // 文件类型不符合要求，可以进行相应的提示或处理
        showToast('请上传mp4格式的视频')
        return false;
      }
      return true;
    }

    const afterReadVideo = async (file) => {
      // 此时可以自行将文件上传至服务器
      file.status = 'uploading';
      file.message = '上传中...';

      let res = await getossKey()
      console.log(res, 'res')
      if (res.code == 200) {
        let { policy, dir, signature, accessid } = res.data;
        let randomStr = randomString(8)
        let randomTime = Date.parse(new Date() + '') / 1000
        let result = await upYunImg({
          policy,
          key: dir + randomTime + randomStr,
          OSSAccessKeyId: accessid,
          signature,
          file: file.file
        })

        file.status = 'done';
        videoUrl = 'https://o.cztvcloud.com/' + dir + randomTime + randomStr
        console.log(videoUrl, 'https://o.cztvcloud.com/350/202307/06/1688631065/1688631065000')

      }
    };
    const validator = (val) => /^1[3456789][0-9]{9}$/.test(val);

    const validatorId = (val) => /^[1-9]\d{5}(19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/.test(val);

    const onSubmit = throttle(async (values) => {
      // router.replace({
      //   name: "index",
      // });
      // return

      // console.log(values, 'vales')

      values.radio12 = findArrValue(allTimeColumns, values.radio12);
      values.radio13 = findArrValue(placeColumn.value, values.radio13);


      let res = await postSignUp({
        enroll_id: '150',
        extra: values
      })
      //res.status_code 
      if (res?.id) {
        radioList.value = getRadioList(res)
        sid.value = res.id + ''
        showPop.value = true
        // router.replace({
        //   name: "index",
        // });
        // showToast('报名成功')
      } else {
        showToast('报名失败，请稍后重试！')
      }
    }, 2000);

    onMounted(async () => {
      init()
    });

    return {
      groupResult,
      timeColumns,
      fileVideoList,
      username,
      checked,
      result,
      resultArea,
      areaList,
      showPicker,
      mobile,
      trade,
      team,
      sid,
      works,
      fileList,
      minDate: new Date(1950, 0, 1),
      videoImageFileList,
      ownHave,
      showPop,
      placeColumn,
      radioList,
      seleteTimeRef,
      init,
      configPlace,
      backPopCall,
      afterRead,
      validator,
      validatorId,
      onConfirm,
      onSubmit,
      afterReadVideo,
      handleBeforeRead,
      afterVideoImgRead,
    };
  },
});
</script>

<style lang="scss">
@import "./style/common";
</style>
