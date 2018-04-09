
//动态设置根元素尺寸
// (function (doc, win) {
//     var docEl = doc.documentElement,
//         resizeEvt = 'onorientationchange' in window ? 'onorientationchange' : 'resize',
//         recalc = function () {
//             var clientWidth = docEl.clientWidth;
//             if (!clientWidth) return;
//             if(clientWidth>=750){
//                 docEl.style.fontSize = '100px';
//             }else{
//                 docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
//             }
//         };

//     if (!doc.addEventListener) return;
//     win.addEventListener(resizeEvt, recalc, false);
//     doc.addEventListener('DOMContentLoaded', recalc, false);
// })(document, window);
;(function(designWidth, maxWidth) {
	var doc = document,
	win = window,
	docEl = doc.documentElement,
	remStyle = document.createElement("style"),
	tid;

	function refreshRem() {
		var width = docEl.getBoundingClientRect().width;
		maxWidth = maxWidth || 540;
		width>maxWidth && (width=maxWidth);
		var rem = width * 100 / designWidth;
		remStyle.innerHTML = 'html{font-size:' + rem + 'px;}';
	}

	if (docEl.firstElementChild) {
		docEl.firstElementChild.appendChild(remStyle);
	} else {
		var wrap = doc.createElement("div");
		wrap.appendChild(remStyle);
		doc.write(wrap.innerHTML);
		wrap = null;
	}
	//要等 viewport 设置好后才能执行 refreshRem，不然 refreshRem 会执行2次；
	refreshRem();

	win.addEventListener("resize", function() {
		clearTimeout(tid); //防止执行两次
		tid = setTimeout(refreshRem, 300);
	}, false);

	win.addEventListener("pageshow", function(e) {
		if (e.persisted) { // 浏览器后退的时候重新计算
			clearTimeout(tid);
			tid = setTimeout(refreshRem, 300);
		}
	}, false);

//	if (doc.readyState === "complete") {
//		doc.body.style.fontSize = "16px";
//	} else {
//		doc.addEventListener("DOMContentLoaded", function(e) {
//			doc.body.style.fontSize = "16px";
//		}, false);
//	}
})(750, 750);

//子页面原生头样式
var titleNView = { //原生导航配置
	backgroundColor: '#ff4500 ', //导航栏背景色
	titleText: '', //导航栏标题
	titleColor: '#ffffff', //文字颜色
	type: 'transparent', //透明渐变样式
	autoBackButton: true, //自动绘制返回箭头
//	splitLine: {
//		color: '#cccccc'
//	},
	progress:{color:'#0000ff'}
}
var titleNView1 = {
	backgroundColor: '#ff4500',
	titleText: '', 
	titleColor: '#ffffff', 
	type: 'default',
	autoBackButton: true, 
	progress:{color:'#0000ff'}
}
function Ntoast(icon,msg){
	icon = icon||"success";
	msg = msg||"操作成功"
				plus.nativeUI.toast('<img src="../../images/'+icon+'.png" width="90px" height="90px"></img><br/><font style="font-size:14px">'+msg+'</font>', {type:'richtext',duration:'short',verticalAlign:'center',richTextStyle:{align:'center'}});
			}

/**
 * 打开新闻详情
 * 
 * @param {String} guid 新闻ID
 * @param {String} title  新闻标题
 */
function open_detail(guid, title,author,time,cover,content) {
	//若详情页尚未预加载完成，则延时等待再执行
	if(!webview_detail) {
		setTimeout(function() {
			open_detail(guid);
		}, 100);
	}
	//触发子窗口变更新闻详情
	mui.fire(webview_detail, 'get_detail', {
		guid: guid,
		title:title,
		author:author,
		time:time,
		cover:cover,
		content:content
	});

	//更改详情页原生导航条信息
	titleNView.titleText = title;
	webview_detail.setStyle({
		"titleNView": titleNView
	});
	setTimeout(function () {
		webview_detail.show("slide-in-right", 300);
	},150);
}

//**************************************公共方法**********************************************

	//添加数据加载时候的动画
	 var dataload = null;
	 var body = document.getElementsByTagName('body')[0];
	 //开始加载
	 function startLoad(){
	 	if (!dataload) {
	 		dataload = document.createElement('div');
	 		dataload.style.position = 'absolute';
	 		dataload.style.width = '100%';
	 		dataload.style.height = '100vh';
	 		dataload.style.paddingTop = '10vh';
	 		dataload.style.textAlign = 'center';
			dataload.style.top = '0px';
			dataload.style.left = '0px';
			dataload.style.backgroundColor = 'rgba(0,0,0,0.8)';				 		
	 		dataload.style.zIndex = 1000000;
	 		body.appendChild(dataload);
	 		
	 		var span = document.createElement('span');
	 		span.innerHTML = '<a>\
				<span ><img src="../../images/jump.gif" style="max-width:6em; height:auto;"/></span>\
			</a>\
			<br />\
			<span>加载中...</span>';
			span.style.fontSize = '0.8em';
			span.style.textAlign = 'center';
			span.style.color = '#ffffff';
	 		dataload.appendChild(span);
	 		
	 	}else {
	 		dataload.style.display = 'block';
	 	}
	 }
	 //结束加载
	 function endLoad(){
	 	dataload.style.display = 'none';
	 }

//打印对象方法
function writeObj(obj){ 
 var description = ""; 
 for(var i in obj){ 
 var property=obj[i]; 
 description+=i+" = "+property+"\n"; 
 } 
 alert(description); 
}

//时间转换
function getDateDiff (dateStr) {
    var publishTime = getDateTimeStamp(dateStr)/1000,
        d_seconds,
        d_minutes,
        d_hours,
        d_days,
        timeNow = parseInt(new Date().getTime()/1000),
        d,
		date = new Date(publishTime*1000),
        Y = date.getFullYear(),
        M = date.getMonth() + 1,
        D = date.getDate(),
        H = date.getHours(),
        m = date.getMinutes(),
        s = date.getSeconds();
        //小于10的在前面补0
        if (M < 10) {
            M = '0' + M;
        }
        if (D < 10) {
            D = '0' + D;
        }
        if (H < 10) {
            H = '0' + H;
        }
        if (m < 10) {
            m = '0' + m;
        }
        if (s < 10) {
            s = '0' + s;
        }

    d = timeNow - publishTime;
    d_days = parseInt(d/86400);
    d_hours = parseInt(d/3600);
    d_minutes = parseInt(d/60);
    d_seconds = parseInt(d);
    if(d_days > 0 && d_days < 3){
        return d_days + '天前';
    }else if(d_days <= 0 && d_hours > 0){
        return d_hours + '小时前';
    }else if(d_hours <= 0 && d_minutes > 0){
        return d_minutes + '分钟前';
    }else if (d_seconds < 60) {
        if (d_seconds <= 0) {
			if(d_seconds==0){
				return '刚刚发表';
			}else{
				return '你穿越了？';
			}
        }else {
            return d_seconds + '秒前';
        }
   }else if (d_days >= 3 && d_days < 30){
        return Y + '-' + M + '-' + D +' '+ H + ':' + m;       
    }else if (d_days >= 30) {
        return Y + '-' + M + '-' + D +' '+ H + ':' + m;
    }
} 
function generateUUID() {
	var d = new Date().getTime();
	var uuid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	  var r = (d + Math.random()*16)%16 | 0;
	  d = Math.floor(d/16);
	  return (c=='x' ? r : (r&0x3|0x8)).toString(16);
	});
	return uuid;
};
//字符串转换为时间戳
function getDateTimeStamp (dateStr) {
    return Date.parse(dateStr.replace(/-/gi,"/"));
}
//淡出
function fadeOut(el,time){  
    if(el.style.opacity === ""){  
        el.style.opacity = 1;  
    }  
    if(el.style.display === "" || el.style.display === 'none'){  
        el.style.display = 'block';  
    }  
  
    var t = setInterval(function(){  
        if(el.style.opacity > 0){  
            el.style.opacity = parseFloat(el.style.opacity)-0.01;  
        }  
        else{  
            clearInterval(t);  
            el.style.display = 'none'  
        }  
    },time/100);  
}  
//重新加载JS刷新页面
var reloadJs = function(id){
    var jsObj = document.getElementById(id);
    var src = jsObj.src;
    delete jsObj;
    //重新加载
    var script = document.createElement('script');
    script.src = src;
    document.body.appendChild(script);
};
(function($, owner) {
	/**
	 * 用户登录
	 **/
	owner.login = function(loginInfo, callback) {
		callback = callback || $.noop;
		loginInfo = loginInfo || {};
		loginInfo.account = loginInfo.account || '';
		loginInfo.password = loginInfo.password || '';
		if (loginInfo.account.length < 5) {
			return callback('账号最短为 5 个字符');
		}
		if (loginInfo.password.length < 6) {
			return callback('密码最短为 6 个字符');
		}
		var users = JSON.parse(localStorage.getItem('$users') || '[]');
		var authed = users.some(function(user) {
			return loginInfo.account == user.account && loginInfo.password == user.password;
		});
		if (authed) {
			return owner.createState(loginInfo.account, callback);
		} else {
			return callback('用户名或密码错误');
		}
	};

	owner.createState = function(name, callback) {
		var state = owner.getState();
		state.account = name;
		state.token = "token123456789";
		owner.setState(state);
		return callback();
	};

	/**
	 * 新用户注册
	 **/
	owner.reg = function(regInfo, callback) {
		callback = callback || $.noop;
		regInfo = regInfo || {};
		regInfo.account = regInfo.account || '';
		regInfo.password = regInfo.password || '';
		if (regInfo.account.length < 5) {
			return callback('用户名最短需要 5 个字符');
		}
		if (regInfo.password.length < 6) {
			return callback('密码最短需要 6 个字符');
		}
		if (!checkEmail(regInfo.email)) {
			return callback('邮箱地址不合法');
		}
		var users = JSON.parse(localStorage.getItem('$users') || '[]');
		users.push(regInfo);
		localStorage.setItem('$users', JSON.stringify(users));
		return callback();
	};

	/**
	 * 获取当前状态
	 **/
	owner.getState = function() {
		var stateText = localStorage.getItem('$state') || "{}";
		return JSON.parse(stateText);
	};

	/**
	 * 设置当前状态
	 **/
	owner.setState = function(state) {
		state = state || {};
		localStorage.setItem('$state', JSON.stringify(state));
		//var settings = owner.getSettings();
		//settings.gestures = '';
		//owner.setSettings(settings);
	};

	var checkEmail = function(email) {
		email = email || '';
		return (email.length > 3 && email.indexOf('@') > -1);
	};

	/**
	 * 找回密码
	 **/
	owner.forgetPassword = function(email, callback) {
		callback = callback || $.noop;
		if (!checkEmail(email)) {
			return callback('邮箱地址不合法');
		}
		return callback(null, '新的随机密码已经发送到您的邮箱，请查收邮件。');
	};

	/**
	 * 获取应用本地配置
	 **/
	owner.setSettings = function(settings) {
		settings = settings || {};
		localStorage.setItem('$settings', JSON.stringify(settings));
	}

	/**
	 * 设置应用本地配置
	 **/
	owner.getSettings = function() {
			var settingsText = localStorage.getItem('$settings') || "{}";
			return JSON.parse(settingsText);
		}
		/**
		 * 获取本地是否安装客户端
		 **/
	owner.isInstalled = function(id) {
		if (id === 'qihoo' && mui.os.plus) {
			return true;
		}
		if (mui.os.android) {
			var main = plus.android.runtimeMainActivity();
			var packageManager = main.getPackageManager();
			var PackageManager = plus.android.importClass(packageManager)
			var packageName = {
				"qq": "com.tencent.mobileqq",
				"weixin": "com.tencent.mm",
				"sinaweibo": "com.sina.weibo"
			}
			try {
				return packageManager.getPackageInfo(packageName[id], PackageManager.GET_ACTIVITIES);
			} catch (e) {}
		} else {
			switch (id) {
				case "qq":
					var TencentOAuth = plus.ios.import("TencentOAuth");
					return TencentOAuth.iphoneQQInstalled();
				case "weixin":
					var WXApi = plus.ios.import("WXApi");
					return WXApi.isWXAppInstalled()
				case "sinaweibo":
					var SinaAPI = plus.ios.import("WeiboSDK");
					return SinaAPI.isWeiboAppInstalled()
				default:
					break;
			}
		}
	}
}(mui, window.app = {}));