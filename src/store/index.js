/**
 * Created by zhouyongjia on 2016/10/15 0015.
 */

import Vue from 'vue';
import Vuex from 'vuex';
// import { fetchItem, fetchItems, fetchIdsByType, fetchUser } from '../api/index'

import {fetchPostById, fetchPostsByIds, fetchPostsBySort} from '../api/index';

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    activeType: null,
    itemsPerPage: 10,
    // posts: {/* [id: string]: Post */},
    // users: {/* [id: string]: User */},
    posts: [],
    // users: [],
    lists: {
      tech: [],
      life: [],
      project: []
    },
  },

  actions: {

    // ensure data for rendering given list type
    // FETCH_LIST_DATA: ({commit, dispatch, state}, {sort}) => {
    //   return fetchIdsBySort(sort, 1, 10)
    //     .then(post => {
    //       commit('SET_LIST', {sort, ids});
    //       console.log('state', state);
    //     })
    //     .then(dispatch('ENSURE_ACTIVE_ITEMS'));
    // },

    FETCH_ITEMS: ({commit, state}, {sort}) => {
      return fetchPostsBySort(sort).then(res => {
          console.log('posts', res.results);
          commit('SET_ITEMS', {posts: res.results});
        })
    },

    // ensure all active items are fetched
    // ENSURE_ACTIVE_ITEMS: ({dispatch, getters}) => {
    //   return dispatch('FETCH_ITEMS', {
    //     ids: getters.activeIds
    //   })
    // },

    // FETCH_USER: ({ commit, state }, { id }) => {
    // return state.users[id]
    // ? Promise.resolve(state.users[id])
    // : fetchUser(id).then(user => commit('SET_USER', { user }))
    // }
  },

  mutations: {
    SET_LIST: (state, {sort, ids}) => {
      state.lists[sort] = ids
    },
    SET_ITEMS: (state, {posts}) => {

      posts.forEach(post => {
        if (post) {
          // Vue.set(state.posts, post._id, post)
          state.posts.push(post);
          console.log('state', state);
        }
      })
    },
    SET_USER: (state, {user}) => {
      Vue.set(state.users, user._id, user)
    }
  },

  getters: {
    // ids of the items that should be currently displayed based on
    // current list type and current pagination
    // activeIds (state) {
    //  const { activeType, itemsPerPage, lists } = state
    //  const page = Number(state.route.params.page) || 1
    //  if (activeType) {
    //  const start = (page - 1) * itemsPerPage
    //  const end = page * itemsPerPage
    //  return lists[activeType].slice(start, end)
    //  } else {
    //  return []
    //  }
    //  },
    //
    //  // items that should be currently displayed.
    //  // this Array may not be fully fetched.
    // activeItems (state, getters) {
    //   return getters.activeIds.map(id => state.items[id]).filter(_ => _)
    // }
  }
})

export default store
