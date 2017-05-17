    import Vue from 'vue';

    import Vuex from 'vuex';
    Vue.use(Vuex);

    import types from './types.js';

    const debug = process.env.NODE_ENV !== 'production'

    const store = new Vuex.Store({
        state: {
            copyright: 'Cloud created by nardo.li@2017 ',
            tabIndex: 0,
            needLoading: false,
            oneViewInfo: {},
            onePage: 0,
            isFooterShow: true,
            isClickChecking: false,
            audioList: [

            ]
        },
        mutations: {
            //检查是否为点击tab更换路由
            [types.IS_CLICK_CHECKING](state, info) {
                state.isClickChecking = info.isClickChecking
            },
            [types.SET_COPY_RIGHT](state) {
                console.log(state.copyright);
            },
            //切换tab导航
            [types.CHECK_TAB_LINK](state, info) {
                state.tabIndex = info.index;
                // console.log(state.tabIndex);
            },
            //切换loading
            [types.CHECK_LOADING](state, info) {
                state.needLoading = info.need;
            },
            //存储当天的one信息
            [types.STORAGE_ONE_INFO](state, info) {
                state.oneViewInfo = info;
            },
            //保存one当前的page
            [types.STORAGE_ONE_PAGE](state, info) {
                state.onePage = info.page;
            },
            //切换一个底部状态
            [types.CHECK_ONE_FOOTER](state, info) {
                if (info.bool) {
                    state.isFooterShow = info.bool;
                } else {
                    setTimeout(function() {
                        state.isFooterShow = info.bool;
                    }, 1000)
                }
            },
            //将本地播放列表存储在store中
            [types.STORAGE_MUSIC_LIST](state, info) {
                state.audioList = info.musicList;
            }
        },
        actions: {
            [types.STORAGE_ONE_INFO]({ commit }, info) {
                commit('storageOneInfo', info);
            },
            [types.STORAGE_ONE_PAGE]({ commit }, info) {
                commit('storageOnePage', info);
            },
            [types.CHECK_ONE_FOOTER]({ commit }, info) {
                commit('checkOneFooter', info);
            },
            [types.STORAGE_MUSIC_LIST]({ commit }, info) {
                commit('storageMusicList', info);
            }
        }

    })

    export default store;