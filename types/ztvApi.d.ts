// declare namespace cztvApi {
//   interface cztvApi {
//     debug: boolean;
//     login(resCallback: (res: string) => void): void;
//     setPageInfo(pageInfo: object, resCallback: (res: any) => void): void;
//   }
// }

// declare const cztvApi: cztvApi.cztvApi;

// export = cztvApi;


declare global {
  interface Window {
    cztvApi: any; // 替换 any 为 cztvApi 对象的类型
  }
}
