		mui.init();
		
		var auths = {};
		var loginWebview;
		
		mui.plusReady(function () {
			loginWebview = plus.webview.currentWebview();
			// 获取登录认证通道
			plus.oauth.getServices(function (services) {
				var content = document.getElementById('dcontent');
		
				var txt = "登录认证通道信息：";
				for (var i in services) {
					var service = services[i];
					//alert(writeObj(service));
					//console.log(service.id+": "+service.authResult+", "+service.userInfo);
					auths[service.id] = service;
					txt += "id:" + service.id + ", ";
					txt += "description:" + service.description + ", ";
					var de = document.createElement('li');
					//			de.setAttribute('class',''+service.description+'');
					de.setAttribute('onclick', 'login(this.id)');
					de.id = service.id;
					de.innerText = service.description + "登录";
					var ico = "git";
					if (service.id == 'sinaweibo') {
						ico = "weibo";
		
					} else if (service.id == 'qq') {
						ico = "qq";
					} else if (service.id == 'weixin') {
						ico = "weixin";
					}
		
					de.innerHTML = '<a class="' + service.id + '" target="_blank" ><i class=" fa fa-' + ico + ' fa-1.5x " color="white"></i></a>'
					oauth.appendChild(de);
				}
		
			}, function (e) {
				outLine("获取登录认证失败：" + e.message);
			});			
		
		});
		
		
		// 登陆的点击事件
		
		

		document.getElementById('login').addEventListener('tap', function () {
			var username = myform.username.value;
			var psd = myform.password.value;
			//非空校验
			if (!username || !psd) {
				mui.toast('用户名或密码不能为空');
				return false;
			}
			//登陆联网处理todo之后将页面close
			
			ajax_login({
				txtUserName: username,
				txtPassword: psd
			});
			loginWebview.addEventListener('hide', function () {

				//					var list = plus.webview.all();
				//					mui.each(list,function(index,item){
				//						console.log(item.id);
				//					});		
				var meritswebview = plus.webview.getWebviewById('../pay/pay1.html');
				var minewebview = plus.webview.getWebviewById('../mine/mine.html');
				var indexwebview = plus.webview.getLaunchWebview();

				mui.fire(indexwebview, 'loginSuccess', {});
				mui.fire(minewebview, 'loginSuccess', {});
				mui.fire(meritswebview, 'loginSuccess', {});

				loginWebview.close();
			}, false);
							
		});
      	


//注册点击事件
document.getElementById('toregister').addEventListener('tap', function () {
	titleNView.titleText = '注册';
	mui.openWindow({
		url: 'register.html',
		id: 'register.html',
		styles: {
			top: '0px',
			bottom: '0px',
			popGesture: 'none',
			titleNView: titleNView
		}
	})
})

function loginSuccess(data) {
	//将用户信息和account分开存放是有好处的
	if ('y' === data.status) {
		var user = {
			nick_name: data.nick_name,
			avatar: data.avatar,
			mobile: data.mobile,
			address: data.address
		}
		//将两个数据存放起来，第一个是等出之后删除，第二个只要登录之后就会记录保存
		localStorage.setItem('user', JSON.stringify(user));
		localStorage.setItem('account', data.account);
		mui.back();
		mui.toast('登录成功');
	}
}

function login(id) {

	var auth = auths[id];
	if (auth) {
		var w = null;
		if (plus.os.name == "Android") {
			w = plus.nativeUI.showWaiting();
		}
		document.addEventListener("pause", function () {
			setTimeout(function () {
				w && w.close();
				w = null;
			}, 2000);
		}, false);
		auth.login(function () {
			w && w.close();
			w = null;

			//alert(JSON.stringify(auth.authResult));
			userinfo(auth);
		}, function (e) {
			w && w.close();
			w = null;
			console.log("登录认证失败：");
			console.log("[" + e.code + "]：" + e.message);
			plus.nativeUI.alert("详情错误信息请参考授权登录(OAuth)规范文档：http://www.html5plus.org/#specification#/specification/OAuth.html", null, "登录失败[" + e.code + "]：" + e.message);
		});
	} else {
		console.log("无效的登录认证通道！");
		plus.nativeUI.alert("无效的登录认证通道！", null, "登录");
	}
}

		// 获取用户信息
		function userinfo(a) {
		
			a.getUserInfo(function () {
		
				//console.log(JSON.stringify(a.userInfo));
				var nickname = a.userInfo.nickname || a.userInfo.name || a.userInfo.miliaoNick;
				
				var user = {
					nick_name: nickname
					,
					avatar: a.userInfo.headimgurl,
					mobile: "空",
					address: a.userInfo.city
				}
				localStorage.setItem('user', JSON.stringify(user));
				localStorage.setItem('account', a.userInfo.openid);
				plus.nativeUI.alert("欢迎“" + a.userInfo.nickname + "”登录！");
				mui.back();
			}, function (e) {
				//outLine("获取用户信息失败：");
				//outLine("["+e.code+"]："+e.message);
				plus.nativeUI.alert("获取用户信息失败！", null, "登录");
			});
		}