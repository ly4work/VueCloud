<template lang="html">
	<transition name="oneRouter">
		<section class="one-view" @click="makeFooterShow()">
			<div class="content">
				<header :id="viewInfo.id">
					<h3 class="h-time">{{viewInfo.postDate}}</h3>
					<p class="h-volume"  v-show="canShow">{{viewInfo.volume}}</p>
				</header>
			<div class="photo"  v-show="canShow">
				<img id="img" class="blk" :src="viewInfo.imgUrl" alt="" :title="viewInfo.forward">
				<p class="photo-author"> {{viewInfo.picInfo}}</p>
			</div>
				<p class="passage"  v-show="canShow">{{viewInfo.forward}}</p>
				<p class="psg-author"  v-show="canShow">{{viewInfo.wordsInfo}}</p>
			</div>
			<transition name="footerBar">
			<footer class="footer" v-show="this.$store.state.isFooterShow">
				<div class="fixed-box">
					<div class="btn prev-btn" :key="prev" @click="checkPage('prev')">
						上一个
					</div>
					<h4 class="footer-one" >One</h4>
					<div class="btn next-btn" :key="next" @click="checkPage('next')">
						下一个
					</div>
				</div>
			</footer>
			</transition>
		</section>
	</transition>

</template>

<script>
// import previewSrc from './../assets/preview.png';

export default {
	name: 'One',
	beforeCreate() {
		this.$store.commit({
			type: 'checkLoading',
			need: true
		});
		window.scrollTo(0, 0);
	},
	created() {
		this.getOne();
	},
	mounted() {
		//当前视图渲染过一次后记住当前tab索引，刷新时显示该路由
		if (!this.$store.state.isClickChecking) {
			this.$store.commit({
				type: 'checkTabLink',
				index: 2
			})
		}
	},
	data() {
		return {
			canShow: false,
			needPreview: false,
			//   previewSrc: previewSrc,
			desc: '插画 | ',
			prev: '-1',
			next: '1',
			viewInfo: {
				id: '',
				title: '',
				forward: '',
				imgUrl: '',
				postDate: '',
				index: '',
				picInfo: '',
				wordsInfo: '',
				volume: '',
			},
			canCheckPage: true,
			isFooterShow: false,
		}
	},
	methods: {
		getOne(page = this.$store.state.onePage) {
			if (page == this.$store.state.oneViewInfo.index) {
				//如果已经存储过，切换tab回到一个时，直接显示存储的信息
				this.viewInfo = this.$store.state.oneViewInfo;
				this.commitCheckState(true, true, false);
			} else {
				this.axios.get('/api/one/' + page)
					.then(res => res.data.data.content_list[0])
					.then(one => {
						this.viewInfo.postDate = one.post_date.split(' ')[0].replace(/\-/ig, ' / ');
						this.viewInfo.forward = one.forward;
						this.viewInfo.volume = one.volume;
						this.viewInfo.picInfo = this.desc + one.pic_info;
						this.viewInfo.wordsInfo = one.words_info;
						this.viewInfo.imgUrl = one.img_url;
						this.viewInfo.title = one.title;
						this.viewInfo.id = one.id;
						this.viewInfo.index = page;
						//将该条ONE信息存储
						this.$store.dispatch({
							type: 'storageOneInfo',
							...this.viewInfo
						})
						//将用户浏览的ONE页数存储
						this.$store.dispatch({
							type: 'storageOnePage',
							page: page
						});

						let imgBox = document.querySelector('#img');
						if (imgBox) {
							imgBox.onload = function () {
								this.commitCheckState(true, true, false);
							}.bind(this);
						}
						this.$store.dispatch({
							type: 'checkOneFooter',
							bool: false
						})
						// this.isFooterShow = false;

					}).catch(err => {
						if (imgBox) {
							imgBox.onload = function () {
								this.commitCheckState(true, true, false);
							}.bind(this);
						}
						this.isFooterShow = false;
					})
			}
		},
		checkPage(direct) {
			if (!this.canCheckPage) {
				return false;
			} else {
				this.commitCheckState(false, false, true);
				let pageDir = this.$store.state.onePage;
				if (direct == 'next') {
					pageDir++;
					if (pageDir >= 10) {
						pageDir = 0;
					}
				} else {
					pageDir--;
					if (pageDir <= -1) {
						pageDir = 9;
					}
				}
				this.getOne(pageDir);
			}
		},
		commitCheckState(bl1, bl2, bl3) {
			this.canShow = bl1;
			this.canCheckPage = bl2;
			this.$store.commit({
				type: 'checkLoading',
				need: bl3
			})
		},
		makeFooterShow() {
			this.$store.dispatch({
				type: 'checkOneFooter',
				bool: true
			})
			// this.isFooterShow = true;
		}
	},
}
</script>

<style lang="scss">
@import '../style/base/common.scss';

.oneRouter-enter-active {
	transition: all 0.5s ease;
}

.oneRouter-leave-active {
	transition: all 0 ease-out;
}

.oneRouter-enter,
.oneRouter-leave-active {
	// transform: translateX(450px);
	opacity: 0;
}

.footerBar-enter-active {
	transition: all 0.5s ease-in-out;
}

.footerBar-leave-active {
	transition: all 0.5s ease-in-out;
}

.footerBar-enter,
.footerBar-leave-active {
	// transform: translateY(5rem);
	opacity: 0;
}

.one-view {
	@include width_center;
	.content {
		width: 100%;
		padding-bottom: 10rem;
		header {
			@include heiti;
			letter-spacing: 2px;
			.h-time {
				@include font-lh-col(1.6rem, 2.8rem, 2.8rem);
				padding-top: 0.3rem;
			}
			.h-volume {
				@include font-lh-col(0.8rem, 1.8rem, 1.8rem, #808080);
			}
		}
		.photo {
			img {
				display: block;
				@include width_center;
			}
			.photo-author {
				@include font-lh-col(0.8rem, 1.8rem, 1.8rem, #808080);
			}
			.preview-box {
				width: 100%;
				@include font-lh-col(3rem, 23rem, 23rem, #333);
				border: 1px solid #000;
			}
		}
		.passage {
			font-size: 1.3rem;
			text-align: left;
			margin: 2rem 0 1.2rem;
			padding: 0 2rem;
		}
		.psg-author {
			font-size: 0.8rem;
			color: #808080;
		}
	}
	.footer {
		position: fixed;
		height: 5rem;
		margin-top: 2rem;
		.fixed-box {
			position: fixed;
			background: #fff;
			@include box-shadow(0px, -1px, 8px, #ccc);
			@include font-lh-col(1.5rem, 5rem, 5rem);
			width: 100%;
			bottom: 0;
			left: 0;
			letter-spacing: 2px;
			.footer-one {
				@include width_center;
				position: absolute;
				padding: 0 7rem;
				line-height: 5.2rem;
			}
			.btn {
				position: absolute;
				height: 5rem;
				top: 0;
				color: #808080;
				z-index: 999;
			}
			.prev-btn {
				left: 2rem;
			}
			.next-btn {
				right: 2rem;
			}
		}
	}
}
</style>
