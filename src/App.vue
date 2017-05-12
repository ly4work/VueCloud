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
export default {
  name: 'app',
  components: {
      HeaderBar,
      NavBar,
      MusicView,
      FindView,
      OneView,
      Loading,
  },
  mounted(){

  }
}
</script>

<style lang="scss">
@import './style/font-cloud/iconfont.css';
@import './style/base/base.scss';
@import './style/rem/rem.css';
@import './style/base/common.scss';

#app {
    position: relative;
    .header-box {
        position: relative;
        width: 100%;
        height: 7.8rem;
        .header-fixed {
            position: fixed;
            width: 100%;
            // height: 7.8rem;
        }
    }
}

</style>
