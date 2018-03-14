mui.init();
var viewgroup=plus.webview.currentWebview().id;
mui.plusReady(function() {
	var group = new webviewGroup(viewgroup, {
		items: [{
			id: "word_child1.html",
			url: "word_child1.html",
			extras: {}
		}, {
			id: "word_child2.html",
			url: "word_child2.html",
			extras: {}
		}, {
			id: "word_child3.html",
			url: "word_child3.html",
			extras: {}
		}, {				
			id: "word_child4.html",
			url: "word_child4.html",
			extras: {}
		}, {
			id: "word_child5.html",
			url: "word_child5.html",
			extras: {}
		}],
		onChange: function(obj) {
			var c = document.querySelector(".mui-control-item.mui-active");
			if(c) {
				c.classList.remove("mui-active");
			}
			document.querySelector(".mui-scroll .mui-control-item:nth-child(" + (parseInt(obj.index) + 1) + ")").classList.add("mui-active");
		}
	});
	mui(".mui-scroll").on("tap", ".mui-control-item", function(e) {
		var wid = this.getAttribute("data-wid");
		group.switchTab(wid);
	});

});
mui.back = function() {
	var _self = plus.webview.currentWebview();
	_self.close("auto");
}