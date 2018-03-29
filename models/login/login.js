		mui.init();

		var auths = {};
		var loginWebview;

		mui.plusReady(function() {
			loginWebview = plus.webview.currentWebview();
			// 获取登录认证通道
/*			plus.oauth.getServices(function(services) {
				var content = document.getElementById('dcontent');

				var txt = "登录认证通道信息：";
				for(var i in services) {
					var service = services[i];
					auths[service.id] = service;
					txt += "id:" + service.id + ", ";
					txt += "description:" + service.description + ", ";
					var de = document.createElement('li');
					de.setAttribute('onclick', 'login(this.id)');
					de.id = service.id;
					de.innerText = service.description + "登录";
					var ico = "git";
					if(service.id == 'sinaweibo') {
						ico = "weibo";

					} else if(service.id == 'qq') {
						ico = "qq";
					} else if(service.id == 'weixin') {
						ico = "weixin";
					}

					de.innerHTML = '<a class="' + service.id + '" target="_blank" ><i class=" fa fa-' + ico + ' fa-1.5x " color="white"></i></a>'
					oauth.appendChild(de);
				}

			}, function(e) {
				outLine("获取登录认证失败：" + e.message);
			});
*/

		});



		// 登陆的点击事件

		document.getElementById('login').addEventListener('tap', function() {
			var username = myform.username.value;
			var psd = myform.password.value;
			//非空校验
			if(!username || !psd) {
				mui.toast('用户名或密码不能为空');
				return false;
			}
			//登陆联网处理todo之后将页面close

			ajax_login({
				txtUserName: username,
				txtPassword: psd
			});
			

		});


		//注册事件
		
		document.getElementById('toregister').addEventListener('tap', function() {
			titleNView.titleText = '注册';
			mui.openWindow({
				url: 'register.html',
				id: 'register.html',
				styles: {
					top: '0px',
					bottom: '0px',
					popGesture: 'hide',
					titleNView: titleNView
				}
			})
		})



        //账号密码登录成功回调
		function loginSuccess(data) {
			//将用户信息和account分开存放是有好处的
			if('y' === data.status) {
				
				var data = JSON.parse(data.list);
				localStorage.setItem('id', data.id);
				//openid
				localStorage.setItem('openid', data.openid);
				//nick_name
				localStorage.setItem('nick_name', data.nick_name);
				//avatar
				localStorage.setItem('avatar', data.avatar);
				//mobile
				localStorage.setItem('mobile', data.mobile);
				//address
				localStorage.setItem('address', data.address);
				loginWebview.addEventListener('hide', function() {
					var minewebview = plus.webview.getWebviewById('../mine/mine.html');
					var indexwebview = plus.webview.getLaunchWebview();
	
					mui.fire(indexwebview, 'loginSuccess', {});
					mui.fire(minewebview, 'loginSuccess', {});
	
					loginWebview.close();
				}, false);
				
	            mui.toast('账号登录成功');
				mui.back();

			}
		}
/*
		//微信快捷登录成功回调
		function loginSuccessQuick(data) {
			//将用户信息和account分开存放是有好处的
			if('y' === data.status) {
				var info = JSON.parse(data.list);
				//id
				localStorage.setItem('id', info["0"].id);
				//openid
				localStorage.setItem('openid', info["0"].openid);
				//nick_name
				localStorage.setItem('nick_name',info["0"].user_name);
				//avatar
				localStorage.setItem('avatar', info["0"].avatar);
				//mobile
				localStorage.setItem('mobile', info["0"].mobile);
				//address
				localStorage.setItem('address', info["0"].address);
                
				
				loginWebview.addEventListener('hide', function() {
					var minewebview = plus.webview.getWebviewById('../mine/mine.html');
	
					mui.fire(minewebview, 'loginSuccess', {});
	
					loginWebview.close();
				}, false);	
				mui.toast('快捷登录成功');
				mui.back();
			}
			
			else
			{
				 mui.toast('快捷登录失败');
				
			}
		}






		function login(id) {
			var auth = auths[id];
			auth.typeid = id;
			if(auth) {
				var w = null;
				if(plus.os.name == "Android") {
					w = plus.nativeUI.showWaiting();
				}
				document.addEventListener("pause", function() {
					setTimeout(function() {
						w && w.close();
						w = null;
					}, 2000);
				}, false);
				auth.login(function() {
					w && w.close();
					w = null;
					userinfo(auth);
				}, function(e) {
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
			type_id = a.typeid;
			a.getUserInfo(function() {
				console.log(JSON.stringify(a.userInfo));
				var nickname = a.userInfo.nickname || a.userInfo.name || a.userInfo.miliaoNick;
				var openid = a.userInfo.openid || generateUUID();

				ajax_login_quick({
					openid: openid,
					nick_name: nickname,
					avatar: a.userInfo.headimgurl,
					type: type_id,
					address: a.userInfo.city
				})
			}, function(e) {
				
				plus.nativeUI.alert("获取用户信息失败！", e.code, "登录");
			});
		}
*/
