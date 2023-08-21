import jsonp from 'jsonp';
import NbRequest from "./index";
import CryptoJS from "crypto-js";

interface BaseResponse<T = any> {
  code: number;
  data: T;
  msg: string;
}
const ehudongUrl = import.meta.env.VITE_E_URL as string;
const dhudongUrl = import.meta.env.VITE_D_URL as string;
const snsUrl = import.meta.env.VITE_API_URL as string; // 后台域名
const cloufUrl = 'https://s.cztvcloud.com/'
const yunUrl = 'https://yun-cztv-new.oss-cn-hangzhou.aliyuncs.com'
const zcatUrl = import.meta.env.VITE_ZCAT_URL as string; 

const APIPath = {
  getossKey: `${cloufUrl}zsj/cztvfile/osspolicy`,
  getInfo: `${snsUrl}api/v3/videos-activity/info`,
  getActiveInfo: `${zcatUrl}api/votes/105`,
  postSignUp: `${zcatUrl}api/enrollLists`,
  getRecords: `${zcatUrl}api/enrollLists/getRecords`,
  getIndexInfo: `${snsUrl}api/v3/videos-activity/signList`, // 获取页面信息
  getHomeInfo: `${dhudongUrl}media/latest`, // 获取页面信息
  // https://dhudong.cztv.com/media/latest?category_id=107&channel_id=1&sort=0&size=10&page=1 
};

export const postMobile = (mobile) => {
  return new Promise((resolve, reject) => {
  })
}


export const getRecords = <T = any>(): Promise<any> => {
  const user_session = window.sessionStorage.getItem('token') || "";
    const timestamp = Math.round(new Date().getTime()/1000);
    const nonce = randomString(8);
    const signature = CryptoJS.SHA1(CryptoJS.enc.Utf8.parse(user_session + nonce + timestamp), true).toString();
  return new Promise((resolve, reject) => {
    NbRequest.get(APIPath.getRecords, { 
      enroll_id:150
    },{
      userSession:user_session,
      timestamp,
      nonce,
      signature
    })
      .then((res) => {
        resolve(res);
    })
      .catch((err) => {
        reject(err);
    });
  });
};
export const getActiveInfo = <T = any>(): Promise<any> => {
  return new Promise((resolve, reject) => {
    NbRequest.get(APIPath.getActiveInfo, { },{})
      .then((res) => {
        resolve(res);
    })
      .catch((err) => {
        reject(err);
    });
  });
};
// export const getossKey = <T = any>(): Promise<any> => {
//   return new Promise((resolve, reject) => {
//     NbRequest.get(APIPath.getossKey, { },{})
//       .then((res) => {
//         resolve(res);
//     })
//       .catch((err) => {
//         reject(err);
//     });
//   });
// };

export const getossKey = (): Promise<any>=> {
  return new Promise((resolve, reject) => {
    jsonp(APIPath.getossKey, {}, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

export const upYunImg = <T = any>(data): Promise<any> => {
  return new Promise((resolve, reject) => {
    NbRequest.post(yunUrl, data,{},false,'formData')
      .then((res) => {
        resolve(res);
    })
      .catch((err) => {
        reject(err);
    });
  });
};
export const randomString = function (number) {
  const e = number || 32;
  const t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678";
  const a = t.length;
  let n = "";
  for (let i = 0; i < e; i++) {
    n += t.charAt(Math.floor(Math.random() * a));
  }
  return n
}

export const postSignUp = <T = any>(data): Promise<any> => {
  return new Promise((resolve, reject) => {
    const user_session = window.sessionStorage.getItem('token') || "";
    const timestamp = Math.round(new Date().getTime()/1000);
    const nonce = randomString(8);
    const signature = CryptoJS.SHA1(CryptoJS.enc.Utf8.parse(user_session + nonce + timestamp), true).toString();
    NbRequest.post(APIPath.postSignUp, data,{
      userSession:user_session,
      timestamp,
      nonce,
      signature
    })
      .then((res) => {
        resolve(res);
    })
      .catch((err) => {
        reject(err);
    });
  });
};



export const getInfo = <T = any>(activityId): Promise<BaseResponse<T>> => {
  return new Promise((resolve, reject) => {
    NbRequest.get(APIPath.getInfo, { activityId },{})
      .then((res) => {
        resolve(res.data);
    })
      .catch((err) => {
        reject(err);
    });
  });
};

export const getIndexInfo = <T = any>(param): Promise<BaseResponse<T>> => {
  return new Promise((resolve, reject) => {
    NbRequest.get(APIPath.getIndexInfo, param ,{})
      .then((res) => {
        resolve(res.data);
    })
      .catch((err) => {
        reject(err);
    });
  });
};


export const getHomeInfo = <T = any>(param): Promise<BaseResponse<T>> => {
  return new Promise((resolve, reject) => {
    NbRequest.get(APIPath.getHomeInfo, param ,{},false,'json','json',30000,{baseURL:'/api'})
      .then((res) => {
        resolve(res.data);
    })
      .catch((err) => {
        reject(err);
    });
  });
};
