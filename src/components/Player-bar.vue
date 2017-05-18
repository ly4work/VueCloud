<template>
    <transition name="player">
        <div class="playerBar">
            <div class="songimg">
                <video src="" id="player-video" class="player-video"></video>
                <img src="" alt="">
                <p class="play-name"></p>
            </div>
            <div class="player-icon">
                <img src="" alt="">
            </div>
        </div>
    </transition>
</template>
<script>
  
</script>
<style lang="css">
.playerBar {
    width: 100%;
    height: 50px;
    background: -webkit-linear-gradient(top, #f9f9f9, #f3f3f3);
    position: fixed;
    bottom: 0;
    left: 0;
}

.songimg {
    position: relative;
    margin-top: 4px;
    margin-left: 10px;
    width: 40px;
    height: 40px;
    border-radius: 20px;
    border: 1px solid #666;
}

.songphoto {
    display: block;
    width: 80%;
    height: 80%;
    border-radius: 50%;
    margin: 4px 0 0 4px;
}

.rotate {
    animation: 15s rotate linear infinite forwards;
}

.player-video {
    position: absolute;
    width: 0;
    height: 0;
    visibility: hidden;
}

.player-icon {
    position: absolute;
    right: 0;
    width: 50px;
    height: 50px;
    bottom: 0;
}

.player-state {
    display: block;
    width: 40%;
    margin: 15px 0 0 15px;
}

.play-name {
    width: 200px;
    position: absolute;
    left: 50px;
    bottom: 10px;
    font-size: 16px;
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

