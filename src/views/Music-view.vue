<template lang="html">
	<transition name="musicRouter">
		<section class="music-view">
			<div class="my-music">
				<ul class="music-list">
					<li class="song-item" v-for="(song, index) of myMusicList" :id="song.docid">
            <span 
              class="iconfont c-love" 
              @click="toggleLike(index)" 
              :title="song.singerid"
              :class="song.singerid != -1 ? 'icon-like' : 'icon-hate'"
            ></span>
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
        <div class="">
          <p></p>
        </div>
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
      ],
      // listLength: initListLength(),
      loadTxt: [
        '没有更多了~',
        '下拉加载更多'
      ]
    }
  },
  beforeCreate() {
    this.$store.commit({
      type: 'checkLoading',
      need: true
    });
    window.scrollTo(0, 0);
  },
  created() {
    //调取我的播放列表
    if (this.localStor('musiclist')) {
      this.myMusicList = this.localStor('musiclist');
    } else {
      this.axios.get('/api/music-list')
        .then(res => {
          if (res.data.ret == 0) {
            this.myMusicList = res.data.musicList;
            this.localStor('musiclist', this.myMusicList);
            this.$store.commit({
              'type': 'storageMusicList',
              'musicList': this.myMusicList
            })
          }
        }).catch(err => {
          console.log(err);
        })
    }
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
  computed: {
    // initListLength() {
    //   return this.myMusicList.length;
    // }
  },
  methods: {
    //本地存储localStorage
    localStor(item, Obj) {
      if (arguments.length == 1) {
        return JSON.parse(localStorage.getItem(item));
      } else if (arguments.length == 2 && (typeof Obj == 'object' || Obj instanceof Array)) {
        localStorage.setItem(item, JSON.stringify(Obj));
      } else {
        throw new Error('arguments invalid.');
      }
    },
    toggleLike(index) {
      //切换喜欢状态，但下次刷新前不更新当前this.musicList
      let newStoreList = []; //克隆本地库列表
      let dbMusic = JSON.stringify(this.localStor('musiclist'));
      //本地库与当前点击的声音匹配
      if (dbMusic.indexOf((this.myMusicList[index].docid + '')) > -1) {
        this.myMusicList[index].singerid = -1;
        let len = this.localStor('musiclist').length;
        for(let i = 0; i < len; i++){
          //匹配成功，喜欢 -> 不喜欢， 删除当前点击声音在本地库中的数据
          if(this.localStor('musiclist')[i].docid != this.myMusicList[index].docid){
            newStoreList.push(this.localStor('musiclist')[i]);
          }
        }
      } else {
        newStoreList = newStoreList.concat(this.localStor('musiclist'));
        this.myMusicList[index].singerid = 0;
        //匹配不成功，不喜欢 -> 不喜欢， 添加当前声音在本地库
        newStoreList.unshift(this.myMusicList[index]);
      }
      //每次变更单条声音的喜欢状态都需要更新store和localStorage
      this.localStor('musiclist', newStoreList);
      this.$store.dispatch({
        'type': 'storageMusicList',
        'musicList': newStoreList
      })
    }
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
        display: flex;
        .iconfont.c-love {
          width: 3rem;
          padding: 1.5rem 0.3rem;
          text-align: center;
          @include font-lh-col(1.8rem, 3rem, 3rem, #e85e5e);
          transition: 0.5s ease-in-out;
          opacity: 1;
        }
        .song-img {
          width: 3.8rem;
          height: 3.8rem;
          margin: 1.1rem 1.5rem 0 0.5rem;
          @include br(0.3rem);
        }
        .singer {
          @include font-lh-col(1.4rem, 6rem, 6rem, #333); // flex: 6;
          display: inline-block;
          width: 16rem;
          font-family: '宋体';
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
}
</style>
