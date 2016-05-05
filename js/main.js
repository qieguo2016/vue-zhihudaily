"use strict"

/* Header search box's animation
 * question button will disappear and input box will stretch
 */
var search = document.getElementById("zd-top-search-input");
search.addEventListener("focus", function () {
	var top = document.getElementById("zd-top");
	top.className = top.className + " searching";
});
search.addEventListener("focusout", function () {
	var top = document.getElementById("zd-top");
	top.className = "zh-top";
});

