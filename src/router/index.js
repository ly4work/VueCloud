import Vue from 'vue';
import Router from 'vue-router';
import HeaderBar from '../components/Header-bar.vue';
import NavBar from '../components/Nav-bar.vue';
import MusicView from '../views/Music-view.vue';
import FindView from '../views/Find-view.vue';
import OneView from '../views/One-view.vue';
Vue.use(Router);

const router = new Router({
  mode: 'history', //去掉路由默认的#
  routes: [
    {
      path: '/',
      redirect: '/home'
    }, {
      path: '/home',
      redirect: '/home/music'
    }, {
      path: '/home/music',
      name: 'MusicView',
      component: MusicView
    }, {
      path: '/home/find',
      name: 'FindView',
      component: FindView
    }, {
      path: '/home/one',
      name: 'OneView',
      component: OneView
    }, {
      path: '*',
      redirect: '/'
    }
  ]
})

export default router;
