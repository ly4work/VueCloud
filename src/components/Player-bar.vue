<template>
    <transition name="player">
        <div class="playerBar">
            <div class="songinfo">
                <audio :src="$store.state.nowPlayer.audioUrl" id="player-video" class="player-video" webkit-playsinline="true" playsinline="true" preload></audio>
                <img :src="$store.state.nowPlayer.imgUrl" alt="" class="songphoto" :class="$store.state.isPlaying ? 'rotate' : ''">
            </div>
            <p class="play-name">{{$store.state.nowPlayer.csinger + ' - ' + $store.state.nowPlayer.csong}}</p>
    
            <div class="play-util">
                <span class="play-mode iconfont" :class="playMode === true ? 'icon-orderplay' : 'icon-randomplay'" @click="checkMode"></span>
                <span class="prev btn iconfont icon-prev" @click="checkSong($store.state.nowPlayer, 'prev')">
                </span>
                <span class="iconfont btn-player" @click="checkPlayState" :class="$store.state.isPlaying ? 'icon-pause' : 'icon-play'"></span>
                <span class="next btn iconfont icon-next" @click="checkSong($store.state.nowPlayer, 'next')">
                </span>
            </div>
        </div>
    </transition>
</template>
<script>
export default {
    name: 'Player-bar',
    data() {
        return {
            playMode: true        //true: order , false: random
        }
    },
    created() {
        if (this.localStor('playmode') != null) {
            this.playMode = this.localStor('playmode').localMode;
        } else if (this.$store.state.playMode) {
            this.playMode = this.$store.state.playMode;
        }else {
            this.playMode = true;
        }
    },
    mounted() {
        let _self = this;
        let aud = document.querySelector('#player-video');
        //播放完后自动播放下一首
        aud.addEventListener('ended', function () {
            //播放结束后拿当前播放的声音去比对store中的 tempList获取index
            _self.checkSong(_self.$store.state.nowPlayer, 'next')
        })
    },
    methods: {
        checkPlayState() {
            this.$store.commit({
                type: 'checkPlayingState',
                isPlaying: !this.$store.state.isPlaying,
                isNext: false,
                videoBox: document.querySelector('#player-video')
            })
        },
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
        //下一首
        checkSong(curSong, dir) {
            let _tempList = this.$store.state.tempList,
                _tempListLen = _tempList.length,
                //存放临时播放列表每首歌对应的docid
                _tempIndexArray = [];
            for (let i = 0; i < _tempListLen; i++) {
                _tempIndexArray[i] = _tempList[i].docid
            }
            //匹配当前播放的索引
            let curIndex = _tempIndexArray.indexOf(curSong.docid);

            //下一首
            if (dir === 'next') {
                //到最后一首
                if (curIndex === _tempListLen - 1) {
                    curIndex = -1;
                }
                ++curIndex;
            } else {
                //到第一首
                if (curIndex === 0) {
                    curIndex = _tempListLen;
                }
                --curIndex;
            }

            //设置下一首的索引
            let nextPlayerSong = this.$store.state.tempList[curIndex];
            this.$store.dispatch({
                type: 'checkPlayingState',
                isPlaying: true,
                isNext: true,   //减少 play() request请求累积
                videoBox: document.querySelector('#player-video')
            })
            this.$store.dispatch({
                type: 'nowPlayerVideo',
                nowPlayer: nextPlayerSong
            })
            //通过上一首下一首切换的一定要存储到lastSong local中
            this.localStor('lastSong', nextPlayerSong)
        },
        //切换播放模式
        checkMode() {
            this.playMode = !this.playMode;
            this.localStor('playmode', {
                localMode: this.playMode
            });
            this.$store.commit({
                type: 'checkMode',
                mode: this.playMode
            })
        }
    }

}
</script>
<style lang="scss">
@import '../style/base/common';
.playerBar {
    width: 100%;
    height: 6rem;
    background: -webkit-linear-gradient(top, #f9f9f9, #f3f3f3);
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    @include box-shadow(0px, -1px, 8px, #ccc);
    .songinfo {
        position: relative;
        margin-top: 0.5rem;
        margin-left: 1rem;
        width: 5rem;
        height: 5rem;
        padding: 0.5rem;
        border-radius: 5rem;
        border: 2px solid #dad8d7;
        background: #9e9999;
        .player-video {
            position: absolute;
            width: 0;
            height: 0;
            visibility: hidden;
        }
        .songphoto {
            display: block;
            width: 100%;
            height: 100%;
            border-radius: 5rem;
        }
    }
    .play-name {
        margin-left: 0.6rem;
        width: 10rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        @include font-lh-col(1.2rem, 6rem, 6rem, #333)
    }

    .play-util {
        position: absolute;
        width: 10rem;
        height: 6rem;
        right: 1rem;
        text-align: center;
        .play-mode {
            position: absolute; // width: 5rem;
            left: -4rem;
            top: 0;
            @include font-lh-col(2rem, 6rem, 5.6rem, $skin-red)
        }
        .btn {
            display: block;
            position: absolute;
            top: 0;
            @include font-lh-col(3.0rem, 6rem, 6rem, $skin-red)
        }
        .prev {
            left: 0;
        }
        .next {
            right: 0;
            line-height: 5.9rem;
        }
        .btn-player {
            display: inline-block;
            width: 30%;
            @include font-lh-col(3.0rem, 6rem, 6rem, $skin-red)
        }
    }
}

.rotate {
    animation: 15s rotate linear infinite forwards;
}

.player-state {
    display: block;
    width: 40%;
    margin: 15px 0 0 15px;
}



@keyframes rotate {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>

