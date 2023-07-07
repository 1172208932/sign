
import { useStore } from "vuex";
import { getActiveInfo } from "@/api/resource";

export interface UserState {
    activeInfo: any;
  }
  export interface GameState {
    gameInfo: any;
  }
  export interface HealthImgStage {
    img: any;
  }
  export default {
    state: {
        activeInfo: {},
        gameInfo:{},
        img:''
    },
    mutations: {
      setActiveInfo(state: UserState, data: any) {
          state.activeInfo = data;
      },
      setGameInfo(state: GameState, data: any) {
        state.gameInfo = data;
      },
      setHealthImg(state: HealthImgStage, data: string) {
        state.img = data;
      },
    },
    actions:{
      async getActiveInfo({commit}){
        let res = await getActiveInfo();
        console.log(res)
        if (res) {
          commit("setActiveInfo", res);
        }
      }
    }
  };
  