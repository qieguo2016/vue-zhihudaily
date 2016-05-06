"use strict"

/* ********    Header    ********
 * question button will disappear and input box will stretch
 */
var topSearch = document.getElementById('zd-top-search-input');
topSearch.addEventListener('focus', function () {
	var top = document.getElementById('zd-top');
	top.className = top.className + ' searching';
});
topSearch.addEventListener('focusout', function () {
	var top = document.getElementById('zd-top');
	top.className = 'zh-top';
});

/* ********    Header end   ********/

/* ********    Navigator    ********
 * 
 */
var navMenu = document.getElementsByClassName('zh-nav-menu')[0];
var navUser = document.getElementsByClassName('zh-nav-user')[0];
var navMsg = document.getElementById('zd-nav-msg');
var navMsgSort = navMsg.getElementsByClassName('zh-nav-msg-sort')[0];
navMenu.addEventListener('click', function (e) {
	var target = e.target;
	var child = this.getElementsByClassName('zh-nav-menu-li');
	for (var index = 0; index < child.length; index++) {
		child[index].className = 'zh-nav-menu-li';
	}
	target.parentElement.className = 'zh-nav-menu-li current';
	switch (target.parentElement.id){
		case 'zd-nav-menu-msg':
			navUser.className = 'zh-nav-user';
			navMsg.className = (navMsg.className == 'zh-nav-msg') ? 'zh-nav-msg show' : 'zh-nav-msg';
			break;
		case 'zd-nav-menu-user':
			navMsg.className = 'zh-nav-msg';
			navUser.className = (navUser.className == 'zh-nav-user') ? 'zh-nav-user show' : 'zh-nav-user';
			break;
		default:
			break;
	}
//	e.preventDefault();
//	e.stopPropagation();
});
navMsgSort.addEventListener('click', function (e) {
	var target = (e.target.tagName == 'I') ? e.target : e.target.childNodes[0];
	var child = this.getElementsByClassName('nav-msg-sort');
	for (var index = 0; index < child.length; index++) {
		child[index].className = 'nav-msg-sort';
	}
	target.parentElement.className = 'nav-msg-sort current';
//	e.preventDefault();
//	e.stopPropagation();
});

/* ********    Navigator end   ********/

