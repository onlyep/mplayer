<template>
  <div class="home">
    <div class="music-list">
      <div class="item active">
        <div class="play-state"><i class="icon play"></i></div>
        <div class="item-info">
          <span class="title">起风了</span>
          <span class="desc">买辣椒也用券-起风了（cover）</span>
        </div>
      </div>
      <div class="item" v-for="(item, index) in playList" :key="index">
        <div class="play-state"><i class="icon play"></i></div>
        <div class="item-info">
          <span class="title">{{item.sound.name}}</span>
          <span class="desc">买辣椒也用券-起风了（cover）</span>
        </div>
      </div>
    </div>
    <player v-show="isShowPlayer" class="player"/>
    <mini-player v-show="!isShowPlayer" @click.native="togglePlayer" class="mini-player" />
  </div>
</template>

<script>
  // @ is an alias to /src
  import Player from '@/components/Player.vue';
  import MiniPlayer from '@/components/MiniPlayer.vue';
  import { request } from '../utils/request';

  export default {
    name: 'home',
    components: {
      Player,
      MiniPlayer
    },
    data() {
      return {
				playList: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        isShowPlayer: false
      };
    },
    created() {
			this.getPlayList();
    },
    methods: {
			getPlayList() {
				request('get', '/recommend', { page: 1 }).then(res => {
					this.playList = res.data.slice();
					console.log(this.playList);
				});
			},
      togglePlayer() {
        this.isShowPlayer = !this.isShowPlayer;
      }
    }
  };
</script>

<style scoped lang="less">
  .player {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #323232
  }
  .mini-player{
    position: fixed;
    bottom: 0;
  }

  .music-list {
    padding: 0 18px;
    .item {
      padding: 12px 0;
      height: 36px;
      display: flex;
      border-bottom: 1px solid #323232;
      &.active {
        .play-state {
          display: block;
        }
        .item-info {
          .title {
            color: #fdd947;
          }
        }
      }
      .play-state {
        display: none;
        padding: 6px 0;
        width: 30px;
        .icon {
          display: block;
          width: 24px;
          height: 24px;
          background: url("../assets/laba.png");
          background-size: cover;
        }
      }
      .item-info {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .title {
          font-size: 16px;
          color: #ffffff;
        }
        .desc {
          font-size: 12px;
          color: #b3b3b3;
        }
      }
    }
  }
</style>
