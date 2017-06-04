//vuex mutations的命名空间
const types = {
    IS_CLICK_CHECKING: 'isClickChecking', //  是否点击tab切换
    SET_COPY_RIGHT: 'setCopyRight', //  设置版权信息
    CHECK_TAB_LINK: 'checkTabLink', //  切换tab
    CHECK_LOADING: 'checkLoading', //  切换ONE loading状态
    STORAGE_ONE_INFO: 'storageOneInfo', //  存储最后浏览的ONE内容
    STORAGE_ONE_PAGE: 'storageOnePage', //  存储ONE翻页页数
    CHECK_ONE_FOOTER: 'checkOneFooter', //  切换ONE footer显示
    STORAGE_MUSIC_LIST: 'storageMusicList', //  存储更新渲染视图后的播放列表
    CHECK_PLAYER_SHOW: 'checkPlayerShow', //  切换全局播放条显示
    NOW_PLAYER_VIDEO: 'nowPlayerVideo', //  存储当前播放的声音信息
    CHECK_PLAYING_STATE: 'checkPlayingState', //  切换播放状态
    SET_TEMP_LIST: 'setTempList', //  存储更新渲染视图前的临时播放列表
    CHECK_MODE: 'checkMode' //  切换播放模式
}

export default types;