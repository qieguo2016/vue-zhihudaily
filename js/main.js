"use strict"

/* ********    Header    ********
 * question button will disappear and input box will stretch
 */
var topSearch = document.getElementById('zd-top-search-input');
var askQuestion = document.getElementById('zd-top-ask-question');
var pageMask = document.getElementById('zd-mask');
topSearch.addEventListener('focus', function (e) {
	var top = document.getElementById('zd-top');
	top.classList.add('searching');
	//top.className = 'zh-top searching';
});
topSearch.addEventListener('blur', function (e) {
	var top = document.getElementById('zd-top');
	top.classList.remove('searching');
	//top.className = 'zh-top';
});
askQuestion.addEventListener('click', function (e) {
	var status = pageMask.style.display;
	if (status == 'none' ) {
		pageMask.style.removeProperty('display');
		document.body.style = 'overflow: hidden;';
	}
	e.stopPropagation();
});
pageMask.addEventListener('click', function (e) {
	var value = e.target.name || e.target.dataset.name;
	switch (value){
		case 'cancel':
			pageMask.style.display = 'none';
			document.body.style = 'overflow: visible;';
			break;
		default:
			break;
	}
	//e.preventDefault();
	e.stopPropagation();
});
/* ********    Header end   ********/


/* ********    Navigator    ********
 * 
 */
var navMenu = document.getElementsByClassName('zh-nav-menu')[0];
var navUser = document.getElementsByClassName('zh-nav-user')[0];
var navMsg = document.getElementById('zd-nav-msg');
var navMsgSort = navMsg.getElementsByClassName('zh-nav-msg-sort')[0];
var navMsgList = navMsg.getElementsByClassName('zh-nav-msg-list')[0];
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
	e.stopPropagation();
});
navMsgSort.addEventListener('click', function (e) {
	var target = (e.target.tagName == 'I') ? e.target : e.target.children[0];
	var child = this.getElementsByClassName('nav-msg-sort');
	for (var index = 0; index < child.length; index++) {
		child[index].className = 'nav-msg-sort';
	}
	target.parentElement.className = 'nav-msg-sort current';
	switch (target.parentElement.name){
		case 'questions':
			navMsgList.innerHTML = '<div class="zh-nav-msg-ctn"><a href=""  class="blue-link" name="author">周宁奕</a> 回答了 <a href=""  class="blue-link" name="question">能利用爬虫技术做到哪些很酷很有趣很有用的事情？</a></div>\
				<div class="zh-nav-msg-ctn"><ahref=""  class="blue-link" name="author">周宁奕</a> 回复了你在 <a href=""  class="blue-link" name="question">能利用爬虫技术做到哪些很酷很有趣很有用的事情？</a> 中 <a href="" class="blue-link" name="author">周宁奕</a> 的回答下的评论</div>\
				<div class="zh-nav-msg-ctn"><a href="" class="blue-link" name="author">haochuan</a> 在 <a href="" class="blue-link" name="field">_haochuan的RandomNotes</a> 中发布了 <a href="" class="blue-link" name="article">当我们说软件工程师的时候我们在说什么</a></div>\
				<div class="zh-nav-msg-ctn"><a href="" class="blue-link" name="author">康石石</a> 回答了 <a href="" class="blue-link" name="question">有哪些好的网站，让人第一眼看了就怦然心动，流连忘返？</a></div>\
				<div class="zh-nav-msg-ctn"><a href="" class="blue-link" name="author">康石石</a> 回复了你在 <a href="" class="blue-link" name="question">有哪些好的网站，让人第一眼看了就怦然心动，流连忘返？</a> 中 <a href="" class="blue-link" name="author">康石石</a> 的回答下的评论</div>\
				<div class="zh-nav-msg-ctn"><a href="" class="blue-link" name="author">张科洋</a> 回答了 <a href="" class="blue-link" name="question">关于 JavaScript 的好书有哪些？</a></div>';
			break;
		case 'users':
			navMsgList.innerHTML = '<div class="zh-nav-msg-empty">有人关注你时会显示在这里</div>';
			break;
		case 'thanks':
			navMsgList.innerHTML = '<div class="zh-nav-msg-ctn">获得 1 次感谢：<a href=""  class="blue-link" name="question">如何写产品交互文档，一份好的交互文档应该包括哪些方面内容？</a> 来自 <a href="" class="blue-link" name="author">张科洋</a></div>';
			break;
		default:
			break;
	}
	
	
	
//	e.preventDefault();
	e.stopPropagation();
});

/* ********    Navigator end   ********/

