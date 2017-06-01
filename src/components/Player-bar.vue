<template>
    <transition name="player">
        <div class="playerBar">
            <div class="songinfo">
                <video :src="$store.state.nowPlayer.audioUrl" id="player-video" class="player-video"></video>
                <img :src="$store.state.nowPlayer.imgUrl" alt="" class="songphoto" :class="$store.state.isPlaying ? 'rotate' : ''">
            </div>
            <p class="play-name">{{$store.state.nowPlayer.csinger + ' - ' + $store.state.nowPlayer.csong}}</p>
            <div class="player-icon" @click="checkPlayState">
                <span class="iconfont btn-player" :class="$store.state.isPlaying ? 'icon-pause' : 'icon-play'"></span>
            </div>
        </div>
    </transition>
</template>
<script>
    export default {
        name: 'Player-bar',
        data(){
            return {

            }
        },
        methods: {
            checkPlayState(){
                this.$store.commit({
                    type: 'checkPlayingState',
                    isPlaying: !this.$store.state.isPlaying
                })
                console.log(this.$store.state.isPlaying)
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
        height: 6rem;
        line-height: 6rem;
        font-size: 1.2rem;
        margin-left: 0.6rem;
    }
    .player-icon {
        position: absolute;
        top: 1.1rem;
        width: 3.8rem;
        height: 3.8rem;
        right: 2.1rem;
        border-radius: 5rem;
        border: 2px solid $skin-red;
        .btn-player {
            margin: -1px 0 0 -1px;
            display: block;
            width: 3.8rem;
            height: 3.8rem;
            line-height: 3.8rem;
            font-size: 1.6rem;
            color: $skin-red;
            text-align: center;
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

