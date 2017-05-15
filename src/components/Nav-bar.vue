<template lang="html">
  <nav class="nav">
  	<ul class="tabs">
		<router-link  class="tab" v-for="(tab, index) of tabs"  :to="tab.routerPath"				:key="index"
		>
			<span
				class="tab-link blk"
				:class="{on: index == $store.state.tabIndex}"
				@click="checkTab(index)"
			>{{tab.name}}</span>
		</router-link>
  	</ul>
  </nav>
</template>

<script>
// import store from '../store/store.js';
export default {
	name: 'Nav-bar',
	data() {
		return {
			tabs: [
				{
					name: '我的',
					routerPath: '/home/music'
				},
				{
					name: '发现',
					routerPath: '/home/find'
				},
				{
					name: '一个',
					routerPath: '/home/one'
				}
			],
			isActive: false,
		}
	},
	methods: {
		checkTab(index) {
			this.$store.commit({
				type: 'checkTabLink',
				index: index
			})
			this.$router.push(this.tabs[index].routerPath)
		}
	},
	mounted() {

	}
}
</script>

<style lang="scss">
@import '../style/base/common.scss';
.tabs {
	display: flex;
	width: 100%;
	@include font-lh-col(1.4rem, 3.8rem, 3.8rem, $skin-red);
	@include box-shadow(0px, 1px, 8px, #ccc);
	.tab {
		flex: 1;
		text-align: center;
		font-weight: normal;
		color: $skin-red;
		background: #fff;
		padding: 0 2rem;
		.tab-link {
			height: 3.8rem;
			@include width_center;
			position: relative;
			&:after {
				content: '';
				position: absolute;
				bottom: 0;
				left: 0;
				z-index: 9999;
				width: 100%;
				height: 2px;
				display: block;
				transition: 0.3s ease-out;
				transform: scaleX(0);
			}
		}
		.on::after {
			background: $skin-red;
			transform: scaleX(1);
		}
	}
}
</style>
