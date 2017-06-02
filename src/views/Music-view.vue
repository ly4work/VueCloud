<template lang="html">
    <transition name="musicRouter">
        <section class="music-view">
            <div class="my-music">
                <ul class="music-list">
                    <li class="song-item" v-for="(song, index) of myMusicList" :id="song.docid" @click.stop="toPlay(song)" :data-index="index">
                        <span class="iconfont c-love" @click.stop="toggleLike(index)" :title="song.singerid" :class="song.singerid != -1 ? 'icon-like' : 'icon-hate'"></span>
                        <img class="song-img" :src="song.imgUrl" :alt="song.csong" :title="song.csong" />
                        <span class="singer">{{(+index+1) + '. ' + song.csinger + '-' + song.csong}}
                        </span>
                        <div class="player-gif" v-show="song.docid === $store.state.nowPlayer.docid">
                            <img class="playing" :src="$store.state.isPlaying ? checkVideoGif(0) : checkVideoGif(1)">
                        </div>
                    </li>
                </ul>
                <div class="">
                    <p>没有更多啦~</p>
                </div>
            </div>
        </section>
    </transition>
</template>

<script>
// import store from '../store/store';
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
            ],
            player: {
                audioUrl: '',
                csinger: '',
                csong: '',
                docid: '',
                imgUrl: '',
                pubtime: ''
            },
            gifStateImg: [
                {
                    src: require('../assets/loading.gif'),
                },
                {
                    src: require('../assets/loading-pause2.jpg')
                }
            ],
            isPlaying: this.$store.state.isPlaying
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
        if (this.localStor('musiclist').length > 0) {
            this.myMusicList = this.localStor('musiclist');
        } else {
            this.axios.get('/api/music-list')
                .then(res => {
                    if (res.data.ret == 0) {
                        this.myMusicList = res.data.musicList;
                        this.localStor('musiclist', this.myMusicList);
                    }
                }).catch(err => {
                    console.log(err);
                })
        }
        this.$store.commit({
            type: 'storageMusicList',
            musicList: this.myMusicList
        })
        //直到下次渲染前，都不改变当前的myMusicList列表和临时列表tempList,只改变store
        this.$store.commit({
            type: 'setTempList',
            list: this.myMusicList
        })
        //调取上一次的播放记录
        if (this.localStor('lastSong')) {
            this.player = this.localStor('lastSong');
        } else {
            this.player = {
                audioUrl: "http://ws.stream.qqmusic.qq.com/403778.m4a?fromtag=46",
                csinger: "周杰伦",
                csong: "不能说的秘密",
                docid: 1749067899870812400,
                imgUrl: "http://imgcache.qq.com/music/photo/album_300/11/300_albumpic_32611_0.jpg",
                pubtime: 1194883200,
                singerid: "123456"
            };
        }
        this.$store.dispatch({
            type: 'nowPlayerVideo',
            nowPlayer: this.player
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
                for (let i = 0; i < len; i++) {
                    //匹配成功，喜欢 -> 不喜欢， 删除当前点击声音在本地库中的数据
                    if (this.localStor('musiclist')[i].docid != this.myMusicList[index].docid) {
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
        },
        //播放声音时的动态gif图状态
        checkVideoGif(i) {
            return this.gifStateImg[i].src;
        },
        //点击声音播放
        toPlay(opts) {
            //点击同一条
            if (opts.docid == this.player.docid) {
                this.isPlaying = !this.isPlaying;
            }
            //切换声音
            else {
                this.player = opts;
                this.$store.dispatch({
                    type: 'nowPlayerVideo',
                    nowPlayer: this.player
                })
                this.isPlaying = true;
                this.localStor('lastSong', this.player);
            }
            this.$store.dispatch({
                type: 'checkPlayingState',
                isPlaying: this.isPlaying,
                isNext: opts.docid === this.player.docid ? false : true,
                videoBox: document.querySelector('#player-video')
            })
        }
    }
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
    opacity: 0;
}

.music-view {
    width: 100%;
    margin-bottom: 80px;
    .my-music {
        .music-list {
            width: 100%;
            .song-item {
                width: 100%;
                height: 5.4rem;
                vertical-align: middle;
                position: relative;
                border-bottom: 0.5px solid #ddd;
                display: flex;
                .iconfont.c-love {
                    width: 3rem;
                    padding: 1.2rem 0.3rem;
                    text-align: center;
                    @include font-lh-col(1.8rem, 3rem, 3rem, #e85e5e);
                    transition: 0.5s ease-in-out;
                }
                .song-img {
                    width: 3.8rem;
                    height: 3.8rem;
                    margin: 0.8rem 1.5rem 0 0.5rem;
                    @include br(0.3rem);
                }
                .singer {
                    @include font-lh-col(1.4rem, 5.4rem, 5.4rem, #333); // flex: 6;
                    display: inline-block;
                    width: 18rem;
                    font-family: '宋体';
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                .player-gif {
                    width: 2.6rem;
                    height: 2.6rem;
                    margin: 1.4rem 0 0 1rem;
                    position: absolute;
                    right: 1rem;
                    top: 0;
                    .playing {
                        display: block;
                        text-align: center;
                        width: 100%;
                        @include font-lh-col(1.3rem, 2.6rem, 2.6rem, #666);
                        transition: 0.5s ease-in-out;
                    }
                }
            }
        }
    }
}
</style>
