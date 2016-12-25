import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

import TechView from '../views/TechView.vue';
import LifeView from '../views/LifeView.vue';

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({y: 0}),
  routes: [
    {path: '/tech/:page(\\d+)?', component: TechView},
    {path: '/life/:page(\\d+)?', component: LifeView},
    {path: '/post/:id(\\d+)', component: LifeView},
    // { path: '/user/:id', component: UserView },
    {path: '*', redirect: '/tech'}
  ]
})
