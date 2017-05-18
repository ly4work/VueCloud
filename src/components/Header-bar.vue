<template lang="html">
    <header class="header">
        <span class="h-btn iconfont icon-wode"></span>
        <h3 class="h-title">VCloud</h3>
        <span class="h-btn iconfont icon-sousuo p-right"></span>
    </header>
</template>

<script>
export default {
    name: 'Header-bar',
    data() {
        return {

        }
    }
}
</script>

<style lang="scss">
@import '../style/base/common.scss';
.header {
    flex: 1;
    width: 100%;
    background-color: $skin-red;
    height: 3.8rem;
    position: relative; // border-bottom: 1px solid #fff;
    .h-title {
        @include font-lh-col(1.5rem, 3.8rem, 3.8rem);
        width: 100%;
        text-align: center;
        font-weight: lighter;
        color: #fff;
        padding: 0 3.8rem;
    }
    .h-btn {
        width: 2.4rem;
        height: 2.4rem;
        color: #fff;
        font-size: 2.4rem;
        position: absolute;
        top: 0;
        padding: 0.7rem;
    }
    .p-right {
        right: 0;
    }
}
</style>
