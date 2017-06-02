<template>
    <div id="app">
        <!-- app主界面 -->
        <transition name="main">
            <div class="page">
                <div class="header-box">
                    <div class="header-fixed">
                        <Header-bar></Header-bar>
                        <Nav-bar></Nav-bar>
                    </div>
                </div>
                <!-- tab切换router展示内容 -->
                <router-view></router-view>
            </div>
        </transition>
        <Loading></Loading>
        <Player-bar v-show="this.$store.state.isShowPlayerBar"></Player-bar>
    </div>
</template>

<script>
import store from './store/store.js';
import HeaderBar from './components/Header-bar.vue';
import NavBar from './components/Nav-bar.vue';
import MusicView from './views/Music-view.vue';
import FindView from './views/Find-view.vue';
import OneView from './views/One-view.vue';
import Loading from './components/loading.vue';
import PlayerBar from './components//Player-bar';
export default {
    name: 'app',
    components: {
        HeaderBar,
        NavBar,
        MusicView,
        FindView,
        OneView,
        Loading,
        PlayerBar
    },
    data() {
        return {
            data: store.state.checkTabLink
        }
    },
    methods: {

    },
    mounted() {
    }
}
</script>

<style lang="scss">
@import './style/font-cloud1/iconfont1.css';
@import './style/font-cloud2/iconfont.css';
@import './style/base/base.scss';
@import './style/rem/rem.css';
@import './style/base/common.scss';

#app {
    position: relative;
    .header-box {
        position: relative;
        width: 100%;
        height: 7.8rem;
        z-index: 9999;
        .header-fixed {
            position: fixed;
            width: 100%; // height: 7.8rem;
        }
    }
}
</style>
