import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import List from '../views/List.vue'
import Detail from '../views/Detail.vue'
import config from '../../config'

// const basePath = '/'   // 部署在根目录下直接使用/
const basePath = config.basePath   // '/daily/'

export default new Router({
	mode: 'history',
	scrollBehavior: (to, from, savedPosition) => {
		if (savedPosition) {
			return savedPosition
		}

		let position = {
			x: 0,
			y: 0
		}
		if (to.path === basePath) {
			position.y = +sessionStorage.getItem('scrollTop') || 0
		}
		return position
	},
	routes: [
		{
			path: basePath,
			component: List
		},
		{
			path: basePath + 'detail/:id',
			component: Detail
		}
	]
})
