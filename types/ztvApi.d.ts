// declare namespace cztvApi {
//   interface cztvApi {
//     debug: boolean;
//     login(resCallback: (res: string) => void): void;
//     setPageInfo(pageInfo: object, resCallback: (res: any) => void): void;
//   }
// }

// declare const cztvApi: cztvApi.cztvApi;

// export = cztvApi;


declare namespace cztvApi {

  function login (resCallback: (res: any) => void): void;
  function userInfo (resCallback: (res: any) => void): void;
  function changeShareInfo (res:any): void;
  function showShareButton (res:any): void;
}