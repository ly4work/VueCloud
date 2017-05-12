<template lang="html">
	<div class="music-view">
		这是music-view区
		<!-- <router-view></router-view> -->
	</div>
</template>

<script>
export default {
	name: 'Music',
	data() {
		return {

		}
	},
	beforeCreate() {
		this.$store.commit({
			type: 'checkLoading',
			need: true
		})
	},
	mounted() {
		//当前视图渲染过一次后记住当前tab索引，刷新时显示该路由
		this.$store.commit({
			type: 'checkTabLink',
			index: 0
		})
		this.$store.commit({
			type: 'checkLoading',
			need: false
		})
	}
}
</script>

<style lang="scss">

</style>
