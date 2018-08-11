<template>
  <div class="player-wrapper">
    <div class="header-bar">
      <i class="icon-down" @click="miniPlay"></i>
    </div>
    <div class="cover-wrap active">
      <div class="cover-box">
        <img src="https://y.gtimg.cn/music/photo_new/T002R300x300M000002iLNys07scIu.jpg?max_age=2592000" alt="">
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
  </div>
</template>

<script>
  export default {
    data() {
      return {
        playing: false,
        currentTime: 0,
        percent: 0
      };
    },
    mounted() {
      // this.$refs.audioRef.play();
    },
    watch: {
      playing(newVal) {
        newVal ? this.$refs.audioRef.play() : this.$refs.audioRef.pause();
      }
    },
    methods: {
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
      }
    }
  };
</script>

<style scoped lang="less">
  .player-wrapper {
    padding: 20px 20px 20px 20px;
    background: #666;
  }
  .header-bar{
    height: 36px;
    .icon-down{
      display: block;
      width: 48px;
      height: 36px;
      background: url("./icon_down.png") no-repeat;
      background-size: cover;
    }
  }
  .cover-wrap{
    padding: 42px 0;
    .cover-box{
      text-align: center;
      img{
        width: 80vw;
        border-radius: 50%;
      }
    }
    &.active{
      img{
        animation: rorating 12s linear infinite;
      }
    }
  }
  @keyframes rorating {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .progress-wrap {
    width: 100%;
    display: flex;
    align-items: center;
    .progress{
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
      &::before{
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
      &.play{
        background-image: url("./icon_play.png");
      }
      &.pause{
        background-image: url("./icon_pause.png");
      }
      &.prev {
        background-image: url("./icon_previous.png");
      }
      &.next {
        background-image: url("./icon_next.png");
      }
    }
  }
</style>
