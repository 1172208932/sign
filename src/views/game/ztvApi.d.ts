declare namespace cztvApi {
  interface cztvApi {
    debug: boolean;
    login(resCallback: (res: string) => void): void;
    setPageInfo(pageInfo: object, resCallback: (res: any) => void): void;
  }
}

declare const cztvApi: cztvApi.cztvApi;

export = cztvApi;