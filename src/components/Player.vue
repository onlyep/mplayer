<template>
  <div class="player-wrapper">
    <audio src="//varbug.top/music/death.mp3"
           ref="audioRef"
           @timeupdate="timeupdate"></audio>
    <div class="progress-wrap">
      <div class="progress-bg"></div>
      <div class="current-progress" ref="progressRef"></div>
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
      console.log(this.$refs.progressRef);
    },
    watch: {
      playing(newVal) {
        newVal ? this.$refs.audioRef.play() : this.$refs.audioRef.pause();
      }
    },
    methods: {
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
    padding: 36px 20px 20px 20px;
    background: #666;
  }

  .progress-wrap {
    width: 100%;
    position: relative;
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
    .previous-btn, .next-btn {
      flex: 1;
      display: flex;
    }
    .previous-btn {
      flex-direction: row-reverse;
    }
    .next-btn {
    }
    .play-btn {
      flex: 0 0 100px;
      display: flex;
      color: yellow;
      justify-content: center;
    }
    .i-btn {
      display: block;
      width: 0;
      height: 0;
      border: 30px solid;
      &.prev {
        border-color: transparent yellow transparent transparent;
      }
      &.next {
        border-color: transparent transparent transparent yellow;
      }
    }
  }
</style>
