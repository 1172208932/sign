<template>
  <div class="box">
    <div class="intor">
      <van-form class="form" @submit="onSubmit">
        <van-cell-group inset>
          <img class="head-img" src="../../assets/head.png" alt="" />
          <van-field class="group" required v-model="username" name="string0" label="姓名" placeholder="请输入真实姓名"
            :rules="[{ required: true, message: '请填写姓名' }]" />
          <van-field required name="radio1" label="性别">
            <template #input>
              <van-radio-group v-model="checked" direction="horizontal">
                <van-radio :name="1">男</van-radio>
                <van-radio :name="0">女</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <van-field v-model="result" is-link required readonly name="date2" label="出生日期" placeholder="点击选择出生日期"
            @click="showPicker = true" />
          <van-field required v-model="mobile" name="string3" label="手机号" placeholder="请输入手机号"
            :rules="[{ validator, required: true, message: '请填写正确的手机号' }]" />
          <van-field required v-model="resultArea" is-link readonly name="region4" label="地域" placeholder="点击选择省市区"
            @click="showArea = true" />
          <van-field required v-model="trade" name="string5" label="流派&行当" placeholder="请输入流派&行当"
            :rules="[{ required: true, message: '请填写流派&行当' }]" />
          <van-field v-model="groupResult" required is-link readonly name="radio6" label="参赛组别" placeholder="点击选择参赛组别"
            @click="showGroup = true" :rules="[{ required: true, message: '请选择参赛组别' }]" />
          <van-field v-model="team" name="string7" label="所属院团" placeholder="职业组必填，不填视为报名不成功" />
          <van-field name="img8" required label="个人照片">
            <template #input>
              <van-uploader v-model="fileList" :max-count="1" :after-read="afterRead" />
            </template>
          </van-field>
          <!-- label-align="top" -->
          <van-field rows="4" type="textarea" required v-model="works" name="text9" label="参赛作品"
            placeholder="唱段名称（该视频会同步到视介官发布）" :rules="[{ required: true, message: '参赛作品' }]" />
          <van-field required name="video10" label="视频上传">
            <template #input>
              <van-uploader v-model="fileVideoList" accept="video/*" :max-count="1" :before-read="handleBeforeRead"
                :after-read="afterReadVideo" />
            </template>
          </van-field>
          <van-field name="videoimage" label="视频封面">
            <template #input>
              <van-uploader v-model="videoImageFileList" :max-count="1" :after-read="afterVideoImgRead" />
              <div class="tip-video">不传视频封面则默认取第一帧展示</div>
            </template>
          </van-field>
          <van-field class="groupBottom" rows="3"  type="textarea"  required v-model="ownHave" name="text11" label="我有你没有" placeholder="分享您和越剧的小故事或者您的参赛亮点"
            :rules="[{ required: true, message: '请填写内容' }]" />
        </van-cell-group>
        <div style="margin: 16px;">
          <van-button class="jump-btn" native-type="submit">
          </van-button>
        </div>
      </van-form>
    </div>
    <van-popup v-model:show="showPicker" position="bottom">
      <van-date-picker :min-date="minDate" @confirm="onConfirm" @cancel="showPicker = false" />
    </van-popup>
    <van-popup v-model:show="showArea" position="bottom">
      <van-area :area-list="areaList" @confirm="onConfirmArea" @cancel="showArea = false" />
    </van-popup>
    <van-popup v-model:show="showGroup" position="bottom">
      <van-picker :columns="columns" @confirm="onConfirmGroup" @cancel="showPicker = false" />
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

import { getossKey, upYunImg, getActiveInfo, postSignUp, randomString } from '@/api/resource'
import { areaList } from '@vant/area-data';
import { throttle } from "@/utils/throttle";

let isFirst = false
export default defineComponent({
  name: "gameIndex",
  components: {
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
    const router = useRouter();
    let imgUrl, videoUrl, videoImgUrl;
    const result = ref('');
    const showPicker = ref(false);
    const resultArea = ref('');
    const showArea = ref(false);
    const groupResult = ref('');
    const showGroup = ref(false);
    const columns = [
      { text: '职业组', value: 0 },
      { text: '非职业组', value: 1 },
    ];

    const onConfirmArea = ({ selectedOptions }) => {
      showArea.value = false;
      resultArea.value = selectedOptions.map((item) => item.text).join('/');
    };

    const onConfirm = ({ selectedValues }) => {
      result.value = selectedValues.join('/');
      showPicker.value = false;
    };

    const onConfirmGroup = ({ selectedOptions }) => {
      groupResult.value = selectedOptions[0]?.text;
      showGroup.value = false;
    };

    const init = async () => {

      let res = await getActiveInfo()
      console.log(res, 'res')
    };

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
        let result = await upYunImg({
          policy,
          key: dir + Date.parse(new Date() + '') / 1000 + randomStr,
          OSSAccessKeyId: accessid,
          signature,
          file: file.file
        })

        file.status = 'done';

        console.log(result, 'result')

        imgUrl = 'https://o.cztvcloud.com/' + dir + Date.parse(new Date() + '') / 1000 + randomStr
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
        let result = await upYunImg({
          policy,
          key: dir + Date.parse(new Date() + '') / 1000 + randomStr,
          OSSAccessKeyId: accessid,
          signature,
          file: file.file
        })

        file.status = 'done';

        console.log(result, 'result')

        videoImgUrl = 'https://o.cztvcloud.com/' + dir + Date.parse(new Date() + '') / 1000 + randomStr
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

        let result = await upYunImg({
          policy,
          key: dir + Date.parse(new Date() + '') / 1000 + randomStr,
          OSSAccessKeyId: accessid,
          signature,
          file: file.file
        })


        file.status = 'done';
        videoUrl = 'https://o.cztvcloud.com/' + dir + Date.parse(new Date() + '') / 1000 + randomStr
        console.log(videoUrl, 'https://o.cztvcloud.com/350/202307/06/1688631065/1688631065000')

      }
    };
    const validator = (val) => /^1[3456789][0-9]{9}$/.test(val);

    const onSubmit = throttle(async (values) => {
      console.log('submit', fileList.value, imgUrl);
      //   let fileList = ref([]);
      // const fileVideoList = ref([]);
      if (!imgUrl || fileList.value.length == 0) {
        showToast('请上传图片')
        return
      }
      if (!videoUrl || fileVideoList.value.length == 0) {
        showToast('请上传视频')
        return
      }
      if (groupResult.value == '职业组' && !team.value) {
        showToast('请上填写所属院团')
        return
      }

      values.radio6 = values.radio6 == '职业组' ? 0 : 1;
      delete values.videoimage;
      values.img8 = imgUrl
      values.video10 = {
        cover: videoImgUrl || '',
        video: videoUrl
      }
      let res = await postSignUp({
        enroll_id: '133',
        extra: values
      })
      if (res) {
        router.replace({
          name: "index",
        });
        showToast('报名成功')

      } else {
        showToast('请稍后重试！')
      }
    }, 2000);

    onMounted(async () => {
      init()
    });

    return {
      groupResult,
      showGroup,
      columns,
      fileVideoList,
      username,
      checked,
      result,
      resultArea,
      areaList,
      showArea,
      showPicker,
      mobile,
      trade,
      team,
      works,
      fileList,
      minDate: new Date(1970, 0, 1),
      videoImageFileList,
      ownHave,
      init,
      afterRead,
      validator,
      onConfirmArea,
      onConfirm,
      onSubmit,
      afterReadVideo,
      handleBeforeRead,
      onConfirmGroup,
      afterVideoImgRead,
    };
  },
});
</script>

<style lang="scss">
@import "./style/common";
</style>
