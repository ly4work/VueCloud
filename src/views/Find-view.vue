<template lang="html">
	<div class="find-view">
		这是find-view区
	</div>
</template>

<script>
import store from '../store/store.js';
export default {
	name: 'Find',
	data(){
		return {

		}
	},
	beforeCreate(){
		this.$store.commit({
			type: 'checkLoading',
			need: true
		})
	},
	mounted(){
		//当前视图渲染过一次后记住当前tab索引，刷新时显示该路由
		this.$store.commit({
			type: 'checkTabLink',
			index: 1
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
