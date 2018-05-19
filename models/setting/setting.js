mui.init();
mui.plusReady(function(){
	mui('body').on('tap', '.mui-popover-action li>a', function() {
			var a = this,
				parent;
			//根据点击按钮，反推当前是哪个actionsheet
			for (parent = a.parentNode; parent != document.body; parent = parent.parentNode) {
				if (parent.classList.contains('mui-popover-action')) {
					break;
				}
			}
			//关闭actionsheet
			mui('#' + parent.id).popover('toggle');
//			alert("你刚点击了\"" + a.innerHTML + "\"按钮");
			if(a.id==="login-out"){
				//清除本地数据
				localStorage.clear();
                plus.runtime.restart();
			}
	});
	mui('body').on('tap','#share',function(){		
		var msg={title:'国宁寺app',content:'弘扬佛法，普度众生',href:'http://gns.yaohua1314.cn/share.html'};
		msg.thumbs=['http://gns.yaohua1314.cn:80/upload/201805/18/201805181420488879.jpg'];		
		plusShare(msg);
	});
})