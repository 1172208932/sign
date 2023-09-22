
import { useStore } from "vuex";
import { getActiveInfo } from "@/api/resource";

export interface UserState {
  activeInfo: any;
}
export interface GameState {
  gameInfo: any;
}
export interface PageStage {
  nowPage: any;
}
export default {
  state: {
    activeInfo: {},
    gameInfo: {},
    img: '',
    nowPage:'first'
  },
  mutations: {
    setActiveInfo(state: UserState, data: any) {
      state.activeInfo = data;
    },
    setGameInfo(state: GameState, data: any) {
      state.gameInfo = data;
    },
    setNowPage(state: PageStage, data: string) {
      state.nowPage = data;
    },
  },
  actions: {
    async getActiveInfo({ commit }) {
      let res = await getActiveInfo();
      console.log(res)
      if (res) {
        commit("setActiveInfo", res);
      }
    }
  }
};
