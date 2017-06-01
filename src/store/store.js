import Vue from 'vue';

import Vuex from 'vuex';
Vue.use(Vuex);

import types from './types.js';

const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
    state: {
        copyright: 'Cloud created by nardo.li@2017 ',
        tabIndex: 0,
        tabsRouter: [
            'MusicView',
            'FindView',
            'OneView'
        ],
        needLoading: false,
        oneViewInfo: {},
        onePage: 0,
        isFooterShow: true,
        isClickChecking: false,
        audioList: [

        ],
        tempList: [

        ],
        isShowPlayerBar: true,
        nowPlayer: {
            audioUrl: '',
            csinger: '',
            csong: '',
            docid: '',
            imgUrl: '',
            pubtime: '',
            singerid: ''
        },
        isPlaying: false
    },
    mutations: {
        //检查是否为点击tab更换路由
        [types.IS_CLICK_CHECKING](state, info) {
            state.isClickChecking = info.isClickChecking
        },
        //更换全局下一首歌曲在播放列表中的index
        [types.CHECK_NEXT_INDEX](state, info) {
            state.next_song_index = info.index;
        },
        //重新渲染我的音乐页前的临时列表
        [types.SET_TEMP_LIST](state, info) {
            state.tempList = info.list;
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
        },
        //切换播放条显示
        [types.CHECK_PLAYER_SHOW](state, info) {
            state.isShowPlayerBar = info.isShowPlayerBar;
        },
        //更新当前播放声音信息
        [types.NOW_PLAYER_VIDEO](state, info) {
            state.nowPlayer = info.nowPlayer;
        },
        //切换播放state
        [types.CHECK_PLAYING_STATE](state, info) {
            state.isPlaying = info.isPlaying;
            let isToPlay = state.isPlaying ? 'play' : 'pause'
                //  play pause是同步过程，所以需要放入事件队列
                //  如果不是由上一个下一个按钮切换而来，则直接判断播放状态
            if (!info.isNext) {
                setTimeout(() => {
                    info.videoBox[isToPlay]()
                }, 0)
            } else {
                //  如果是由按钮切换而来，则待重新加载完资源后直接播放
                info.videoBox.oncanplay = function() {
                    info.videoBox.play()
                }
            }
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
        },
        [types.NOW_PLAYER_VIDEO]({ commit }, info) {
            commit('nowPlayerVideo', info);
        },
        [types.CHECK_PLAYING_STATE]({ commit }, info) {
            commit('checkPlayingState', info)
        }
    }

})

export default store;