mui.init();

mui.plusReady(function(){
var self = plus.webview.currentWebview();
//if(!localStorage.getItem('username')){
//		if(plus.webview.getWebviewById('login')){
//			plus.webview.getWebviewById('login').show();
//			return;
//		}
//		var loginW = plus.webview.create('../login/login.html','login',{
//			bottom:'0px',top:'0px',popGesture:'none'
//		});	
//			self.append(loginW);
//			loginW.show();
//	}else{
//			getUserInfo();
//		}
})
//加载刷新个人信息
function getUserInfo(){
	if(!localStorage.getItem('getUserInfo')){
		//获取个人信息
		var userid=localStorage.getItem('userid');
		$.ajax({
			type: "get",
			async: false,
			data: {
				id: userid
			},
			url: api_url + "Api/get_user_info",
			dataType: "json",
			success: function(data) {					
				var status = data.status;
				if(status == 4001) {
					mui.toast('没有更多信息');
					return false;
				}
				var str = JSON.stringify(data.msg);
				localStorage.setItem('getUserInfo',str);
			}
		});
	}
	var str=localStorage.getItem('getUserInfo')
	var	userInfo=JSON.parse(str);
	plus.webview.getWebviewById('question').evalJS("getUserId()");


}

mui('body').on('tap', 'a', function(e) {
	if (!localStorage.getItem('user')) {
		plus.webview.getWebviewById('../login/login.html').show("slide-in-bottom");
		return;
	}
	
		var id = this.getAttribute('id');
		var title_name = this.getAttribute('title');
		var mine_pages_url="../"+id+"/"+id+".html";		
		titleNView.titleText = title_name;
		mui.openWindow({
			url:mine_pages_url,
			id:mine_pages_url,
			styles:{
				titleNView:titleNView
			}
		})
})

