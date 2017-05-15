<template lang="html">
	<transition name="musicRouter">
		<section class="music-view">
			<div class="my-music">
				<ul class="music-list">
					<li class="song-item" v-for="(song, index) of myMusicList" :id="song.docid">
            <img 
              class="song-img"
              :src="song.imgUrl" 
              :alt="song.csong" 
              :title="song.csong"
              
              />
            <span 
              class="singer"
            >{{(+index+1) + '. ' + song.csinger + '-' + song.csong}}
            </span>
            <span class="delete-btn">

            </span>
          </li>
				</ul>
        				<ul class="music-list">
					<li class="song-item" v-for="(song, index) of myMusicList" :id="song.docid">
            <img 
              class="song-img"
              :src="song.imgUrl" 
              :alt="song.csong" 
              :title="song.csong"
              
              />
            <span 
              class="singer"
            >{{(+index+1) + '. ' + song.csinger + '-' + song.csong}}
            </span>
            <span class="delete-btn">

            </span>
          </li>
				</ul>
			</div>
		</section>
	</transition>
</template>

<script>

export default {
  name: 'Music',
  data() {
    return {
      myMusicList: [
        //存储本地播放列表格式
        {
          audioUrl: '',
          csinger: '',
          csong: '',
          docid: '',
          imgUrl: '',
          pubtime: ''
        }
      ]
    }
  },
  beforeCreate() {
    this.$store.commit({
      type: 'checkLoading',
      need: true
    });
    window.scrollTo(0, 0);
    //调取我的播放列表
    this.axios.get('/api/music-list')
      .then(res => {
        if (res.data.ret == 0) {
          this.myMusicList = res.data.musicList;
          console.log(this.myMusicList);
        }
      }).catch(err => {
        console.log(err);
      })
  },
  mounted() {
    //当前视图渲染过一次后记住当前tab索引，刷新时显示该路由
    //如果为点击切换，则不需commit状态
    if (!this.$store.state.isClickChecking) {
      this.$store.commit({
        type: 'checkTabLink',
        index: 0
      })
    }

    this.$store.commit({
      type: 'checkLoading',
      need: false
    })
  },

}
</script>

<style lang="scss">
@import '../style/base/common';


.musicRouter-enter-active {
  transition: all 0.5s ease;
}

.musicRouter-leave-active {
  transition: all 0 ease-out;
}

.musicRouter-enter,
.musicRouter-leave-active {
  // transform: translateX(450px);
  opacity: 0;
}

.music-view {
  width: 100%;
  .my-music {
    .music-list {
      width: 100%;
      .song-item {
        width: 100%;
        height: 6rem;
        vertical-align: middle;
        position: relative;
        border-bottom: 0.5px solid #ddd;
        .song-img {
          display: inline-block;
          width: 3.8rem;
          height: 3.8rem;
          margin: 1.1rem 0 0 1.1rem;
          @include br(0.3rem);
        }
        .singer {
          position: absolute;
          top: 0;
          left: 6.0rem;
          display: block;
          height: 6rem;
          line-height: 6rem;
          font-size: 1.4rem;
          font-family: '宋体';
          color: #333;
          text-overflow: ellipsis;
        }
      }
    }
  }
}
</style>
