import Vue from 'vue';
import Vuex from 'vuex';
import { request } from './utils/request';

Vue.use(Vuex);

const state = {
  listJson: {}
};

const mutations = {};

const actions = {
  // 获取banner
  async get_banner_data({ dispatch }) {
    let res = await request('get', 'banner');
    dispatch('pushToList', res);
    return res;
  },

  // 数组转换成以id为属性的对象，方便调试 vue-devtools: https://github.com/vuejs/vue-devtools
  pushToList({ state, commit }, res) {
    if (res.data) {
      let list = {};
      res.data.forEach(item => {
        list[item.sound.id] = item;
      });
      list = { ...state.listJson, ...list };
      commit('set_listJson', list);
    }
  }
};

export default new Vuex.Store({
  state,
  mutations,
  actions
});
