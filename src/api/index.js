/**
 * Created by zhouyongjia on 2016/10/15 0015.
 */

import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource);

/*fetchData () {
 this.$http.get('http://192.168.1.106:3000/test')
 .then((response) => {
 console.log('response es6', response.body);
 this.message = JSON.stringify(response.body);
 }, (err) => {
 console.error('err', err);
 });
 }*/

function fetchPostById(id) {
  return new Promise((resolve, reject) => {
    Vue.http.get(`http://localhost:3000/post/${id}`).then(resolve, reject);
  })
}

function fetchPostsByIds(ids) {
  return Promise.all(ids.map(id => fetchPostById(id)))
}

function fetchPostsBySort(sort, pageIndex, pageSize) {
  let page = '';
  if (typeof pageIndex !== 'undefined') {
    page = `&pageIndex=${pageIndex}`;
  }
  if (typeof  pageSize !== 'undefined') {
    page += `&pageSize=${pageSize}`;
  }
  return new Promise((resolve, reject) => {
    Vue.http.get(`http://localhost:3000/post?sort=${sort}${page}`)
       .then(res => {
         resolve(res.body);
       }, reject);
  })
}

export {fetchPostById, fetchPostsByIds, fetchPostsBySort}