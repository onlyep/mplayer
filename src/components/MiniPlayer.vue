<template>
  <div class="mini-player-wrap">
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
        <i v-if="!audio.playing" class="icon-handle play"></i>
        <i v-if="audio.playing" class="icon-handle pause"></i>
      </div>
    </div>
  </div>
</template>

<script>
	import { mapState, mapMutations } from 'vuex';

	export default {
		data() {
			return {};
		},
		computed: {
			...mapState(['audio'])
		},
		methods: {
			...mapMutations({
				play: 'play'
			})
		}
	};
</script>

<style lang="less" scoped>
  .mini-player-wrap {
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
          background-image: url(./audio-control.png);
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
