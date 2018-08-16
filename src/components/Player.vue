<template>
  <div class="player-wrapper">
    <!--<div v-show="false" class="normal">
      <div class="header-bar">
        <i class="icon-down" @click="miniPlay"></i>
      </div>
      <div class="cover-wrap active">
        <div class="cover-box">
          <img src="https://y.gtimg.cn/music/photo_new/T002R300x300M000002iLNys07scIu.jpg?max_age=2592000">
        </div>
      </div>
      <div class="progress-wrap">
        <div class="current-time">00:00</div>
        <div class="progress">
          <div class="progress-bg"></div>
          <div class="current-progress" ref="progressRef"></div>
        </div>
        <div class="total-time">04:00</div>
      </div>
      <div class="handle-btn-wrap">
        <div class="previous-btn"><i class="i-btn prev"></i></div>
        <div class="play-btn"><i class="i-btn play" @click="togglePlaying"></i></div>
        <div class="next-btn"><i class="i-btn next"></i></div>
      </div>
    </div>-->
    <div class="mini">
      <div class="cover-song">
        <div class="cover">
          <img :src="audio.coverUrl">
        </div>
        <div class="song-info">
          <div class="name">{{audio.name}}</div>
          <div class="singer">连丝雅</div>
        </div>
      </div>
      <div class="song-handler">
        <div class="handler-btn">
          <i v-if="!audio.playing" @click.stop.prevent="_play" class="icon-handle play"></i>
          <i v-if="audio.playing" @click.stop.prevent="_pause" class="icon-handle pause"></i>
        </div>
      </div>
    </div>
    <audio id="audio" :src="audio.source" ref="audioRef"></audio>
  </div>
</template>

<script>
	import { mapState, mapMutations } from 'vuex';

	export default {
		props: {
			playList: {
				type: Array,
				default: () => {
					return [];
				}
			}
		},
		data() {
			return {
				currentTime: 0,
				percent: 0
			};
		},
		computed: {
			...mapState(['audio', 'playing'])
		},
		mounted() {
			// this.$refs.audioRef.play();
			console.log(this.playList);
		},
		watch: {
			playing(newVal) {
				newVal ? this.$refs.audioRef.play() : this.$refs.audioRef.pause();
			}
		},
		methods: {
			...mapMutations(['setCurrentAudio', 'setAudioSource', 'play', 'pause']),
			miniPlay() {
				this.$emit('togglePlayer');
			},
			togglePlaying() {
				this.playing = !this.playing;
			},
			timeupdate(e) {
				this.currentTime = e.target.currentTime;
				this.percent = this.currentTime / this.$refs.audioRef.duration;
				this.$refs.progressRef.style.left = this.currentTime / this.$refs.audioRef.duration * 100 + '%';
			},
			_play() {
				let song = this.playList[0].sound;
				this.setAudioSource(song);
				this.$refs.audioRef.play();
			},
			_pause() {
				this.pause();
				this.$refs.audioRef.pause();
      }
		}
	};
</script>

<style scoped lang="less">
  .player-wrapper {
    /*padding: 20px 20px 20px 20px;*/
    /*background: #666;*/
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
  }

  .normal {
    .header-bar {
      height: 36px;
      .icon-down {
        display: block;
        width: 48px;
        height: 36px;
        background: url("../assets/icon_down.png") no-repeat;
        background-size: cover;
      }
    }

    .cover-wrap {
      padding: 42px 0;
      .cover-box {
        text-align: center;
        img {
          width: 80vw;
          border-radius: 50%;
        }
      }
      &.active {
        img {
          animation: rorating 12s linear infinite;
        }
      }
    }

    .progress-wrap {
      width: 100%;
      display: flex;
      align-items: center;
      .progress {
        margin: 0 10px;
        flex: 1;
        position: relative;
      }
      .progress-bg {
        height: 4px;
        border-radius: 4px;
        background: #FFFFFF;
      }
      .current-progress {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        border-radius: 4px;
        background: #000000;
        &::before {
          display: block;
          content: "";
          width: 10px;
          height: 10px;
          border-radius: 50%;
          position: absolute;
          left: 0;
          top: -3px;
          background: #FFFFFF;
        }
      }
    }

    .handle-btn-wrap {
      margin-top: 28px;
      display: flex;
      justify-content: center;
      .previous-btn {
      }
      .next-btn {
      }
      .play-btn {
        margin: 0 20px;
      }
      .i-btn {
        display: block;
        width: 44px;
        height: 44px;
        background-size: 100%;
        background-repeat: no-repeat;
        &.play {
          background-image: url("../assets/icon_play.png");
        }
        &.pause {
          background-image: url("../assets/icon_pause.png");
        }
        &.prev {
          background-image: url("../assets/icon_previous.png");
        }
        &.next {
          background-image: url("../assets/icon_next.png");
        }
      }
    }
  }

  .mini {
    padding: 0 12px;
    height: 72px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #111;
    box-sizing: border-box;
    .cover-song {
      display: flex;
      .cover {
        margin-right: 10px;
        width: 48px;
        height: 48px;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          animation: rotating 12s linear infinite;
        }
      }
      .song-info {
        padding: 2px 0;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .name {
          line-height: 24px;
          font-size: 18px;
        }
        .singer {
          font-size: 14px;
          color: #b3b3b3;
        }
      }
    }
    .song-handler {
      flex: 0 0 48px;
      margin-right: 12px;
      .handler-btn {
        width: 48px;
        height: 48px;
        overflow: hidden;
        border: 2px solid #fdd947;
        border-radius: 50%;
        box-sizing: border-box;
        .icon-handle {
          display: block;
          width: 100%;
          height: 100%;
          background-image: url(../assets/audio-control.png);
          background-repeat: no-repeat;
        }
        .icon-handle.play {
          background-position: -44px 0;
        }
        .icon-handle.pause {
          background-position: 0 0;
        }
      }
    }
  }

  @keyframes rotating {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
