<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
    <audio id="audio" autoplay :src="audio.source"
           ref="audioRef"></audio>
  </div>
</template>

<script>
	import { request } from './utils/request';
	import { mapState, mapMutations } from 'vuex';
	// varbug.top/music/death.mp3

	export default {
		data() {
			return {
				playList: []
			};
		},
		created() {
			this.getPlayList();
		},
		computed: {
			...mapState(['audio']),
			...mapState({
				audio_data: state => state.audio.source
			})
		},
		watch: {
			audio_data(val) {
				console.log(val);
				this.audioInit();
			}
		},
		methods: {
			...mapMutations({
				setAudioSource: 'setAudioSource'
			}),
			audioInit() {
				let _audio = this.$el.querySelector('#audio');
				console.log(_audio);
			},
			getPlayList() {
				request('get', '/recommend', { page: 1 }).then(res => {
					this.playList = res.data.slice();
				});
			}
		}
	};
</script>

<style lang="less">
  #nav {
    padding: 30px;
    a {
      font-weight: bold;
      color: #2c3e50;
      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
</style>
