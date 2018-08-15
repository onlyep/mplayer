import Vue from 'vue';
import Vuex from 'vuex';
import { request } from './utils/request';
import createLogger from 'vuex/dist/logger';

const debug = process.env.NODE_ENV !== 'production';

Vue.use(Vuex);

const state = {
	audio: {
		playing: false,
		name: '',
		source: '',
		coverUrl: ''
	},
	listJson: {},
	currentAudio: '',
	duration: 0,
	percent: 0,
	currentTime: 0
};

const mutations = {
	setCurrentAudio(state, audio) {
		state.currentAudio = audio;
	},
	updateDuration(state, duration) {
		state.duration = duration;
	},
	setAudioSource(state, song) {
		state.audio.playing = true;
		state.audio.source = song.source;
		state.audio.coverUrl = song.pic_500;
		state.audio.name = song.name;
	},
	play(state) {
		state.audio.playing = true;
	},
	pause(state) {
		state.audio.playing = false;
	}
};

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
	actions,
	strict: debug,
	plugins: debug ? [createLogger()] : []
});
