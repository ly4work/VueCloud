<template lang="html">
    <div :class="{loading: $store.state.needLoading}">
        <i class="icon"></i>
    </div>
</template>

<script>
export default {
    name: 'loading',
    data() {
        return {

        }
    }
}
</script>

<style lang="scss">
.loading {
    position: fixed;
    left: 0;
    right: 0;
    text-align: center;
    top: 50%;
    transform: translateY(-50%);
    -webkit-transform: translateY(-50%);
    .icon {
        display: inline-block;
        width: 2.5rem;
        height: 2.5rem;
        background: url('../assets/ripple.gif');
        background-size: 2.5rem;
    }
}
</style>
