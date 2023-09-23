
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

export interface VideoStage {
  videoIndex: any;
}
export default {
  state: {
    activeInfo: {},
    gameInfo: {},
    img: '',
    nowPage:'first',
    videoIndex:0
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
    setVideoIndex(state: VideoStage, data: string) {
      state.videoIndex = data;
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
