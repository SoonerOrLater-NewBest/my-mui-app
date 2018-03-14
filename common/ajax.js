


//**************************************引入依赖JS**********************************************
var new_element=document.createElement("script");
new_element.setAttribute("type","text/javascript");
new_element.setAttribute("src","../../common/md5.js");// 在这里引入了a.js
document.body.appendChild(new_element);




//**************************************设置data安全性**********************************************
	var httpUrl = "http://gns.yaohua1314.cn/appapi/main.ashx?";
	var app_key = "9e304d4e8df1b74cfa009913198428ab";
	var v = "v1.0";
	var sign_method = "md5";
	var signConstant = "4f4f8dd219bbdde0ae6bbe02be217c3a";
	session_key = localStorage.getItem('session_key');
	
	//获取当前时间戳
	function getTimestamp(){
		return (Date.parse(new Date())/1000).toString();
	}
	//获取sign签名 
	function getSign(keyOptions){
		var sign = signConstant;
		var isFirst = false;
		for (var  key in keyOptions) {
			if (!isFirst) {
				sign = sign +key+'='+keyOptions[key];
				isFirst = true;
			}else {
				sign = sign + '&';
				sign = sign +key+'='+ keyOptions[key];
			}
		}
		sign = sign + signConstant;
		return sign;
	}
	//获取发送数据的
	 function getdata(options,apiName){
		var timestamp = getTimestamp();
		var sign = getSign(options);
		var data = {
			app_key:app_key,
			method:apiName,
			timestamp:timestamp,
			v:'v1.0',
			sign_method:'md5',
			session_key:session_key,
			sign:sign,
		};
		
		for (var key in options) {
			data[key] = options[key];
		}
		return data;
	}
	 
	function logData(data){
		console.log(data);
		console.log(data.list);		
	}
	 
//**************************************ajax获取数据**********************************************
(function(w){
	//获取sessionKey
	w.ajax_get_SessionKey = function(){
		mui.ajax('http://192.168.1.114:16976/test/appserver/sessionkey',{
			dataType:'json',//服务器返回json格式数据
			type:'get',//HTTP请求类型
			timeout:10000,//超时时间设置为10秒；
			success:function(data){
				logData(data);
				localStorage.setItem('session_key',data.session_key);
				//关闭启动页面
				closeStartScreent();
			},
			error:function(xhr,type,errorThrown){
				
			}
		});
	};
	
	//用户注册
	w.ajax_register = function(options){
		var data = getdata(options,'com.huihoo.user.register');
		mui.ajax(httpUrl,{
			data:data,
			dataType:'json',//服务器返回json格式数据
			type:'post',//HTTP请求类型
			timeout:10000,//超时时间设置为10秒；
			success:function(data){
				logData(data);
				registerSeccess(data);
			},
			error:function(xhr,type,errorThrown){
				
			}
		});
	}
	
	//用户登陆
	w.ajax_login = function(options){
		var data = getdata(options,"action=user_login");
		mui.ajax(httpUrl+"action=user_login",{
			data:data,
			dataType:'json',//服务器返回json格式数据
			type:'post',//HTTP请求类型
			timeout:10000,//超时时间设置为10秒；
			success:function(data){
				logData(data);
				data.account = options.txtUserName;
				loginSuccess(data);
			},
			error:function(xhr,type,errorThrown){
				
			}
		});
	}
//	快捷登录
	w.ajax_login_quick = function(options){
		var data = getdata(options,"action=useauth_up");
		mui.ajax(httpUrl+"action=useauth_up",{
			data:data,
			dataType:'json',//服务器返回json格式数据
			type:'post',//HTTP请求类型
			timeout:10000,//超时时间设置为10秒；
			success:function(data){
				logData(data);
				loginSuccessQuick(data);
			},
			error:function(xhr,type,errorThrown){
				mui.toast('授权请求失败');
			}
		});
	}
	
	
	//修改密码
	w.ajax_change_pwd = function(options){
		var data = getdata(options,'com.huihoo.user.change_pwd');
		mui.ajax(httpUrl,{
			data:data,
			dataType:'json',//服务器返回json格式数据
			type:'post',//HTTP请求类型
			timeout:10000,///超时时间设置为10秒；
			success:function(data){
				logData(data);
				changePwdSuccess(data);
			},
			error:function(xhr,type,errorThrown){
				
			}
		});
	}
	
	//退出登录
	w.ajax_logout = function(options){
		var data = getdata(options,'com.huihoo.user.loginout');
		mui.ajax(httpUrl,{
			data:data,
			dataType:'json',//服务器返回json格式数据
			type:'get',//HTTP请求类型
			timeout:10000,//超时时间设置为10秒；
			success:function(data){
				logData(data);
				logoutSuccess(data);
			},
			error:function(xhr,type,errorThrown){
				
			}
		});
	}
	
	//获取首页图标分类
	w.ajax_get_indexIcon = function(options) {
		var data = getdata(options,'action=getchanel_list');
		mui.ajax(httpUrl+"action=getchanel_list",{
			data:data,
			dataType:'json',//服务器返回json格式数据
			type:'get',//HTTP请求类型
			timeout:10000,//超时时间设置为10秒；
			success:function(data){				
				logData(data);
				setTimeout(function(){
					indexIconSuccess(data);
				},500);
			},
			error:function(xhr,type,errorThrown){
				
			}
		});
	}
	//获取文章列表
	w.ajax_getArticleList = function(options) {
		var data = getdata(options,'action=getchanel_article_list');
		mui.ajax(httpUrl+"action=getchanel_article_list",{
			data:data,
			dataType:'json',//服务器返回json格式数据
			type:'get',//HTTP请求类型
			timeout:10000,//超时时间设置为10秒；
			success:function(data){				
				logData(data);
				setTimeout(function(){
					articleListSuccess(data);
				},500);
			},
			error:function(xhr,type,errorThrown){
				
			}
		});
	}
	//获取寺院图片
	w.ajax_waterfalls = function(options) {
		var data = getdata(options,'action=view_slide');
		mui.ajax(httpUrl+"action=view_slide",{
			data:data,
			dataType:'json',//服务器返回json格式数据
			type:'get',//HTTP请求类型
			timeout:10000,//超时时间设置为10秒；
			success:function(data){				
				logData(data);
				setTimeout(function(){
					waterfallsSuccess(data);
				},500);
			},
			error:function(xhr,type,errorThrown){
				
			}
		});
	}
	//获取音频
	w.ajax_getAudio = function(options) {
		var data = getdata(options,'action=lyin_list');
		mui.ajax(httpUrl+"action=lyin_list",{
			data:data,
			dataType:'json',//服务器返回json格式数据
			type:'get',//HTTP请求类型
			timeout:10000,//超时时间设置为10秒；
			success:function(data){				
				logData(data);
				setTimeout(function(){
					audioSuccess(data);
				},500);
			},
			error:function(xhr,type,errorThrown){
				
			}
		});
	}
	//获取留言
	w.ajax_feedback_list = function(options) {
		var data = getdata(options,'action=feedback_list');
		mui.ajax(httpUrl+"action=feedback_list",{
			data:data,
			dataType:'json',//服务器返回json格式数据
			type:'get',//HTTP请求类型
			timeout:10000,//超时时间设置为10秒；
			success:function(data){				
				logData(data);
				setTimeout(function(){
					FeedbacklistSuccess(data);
				},500);
			},
			error:function(xhr,type,errorThrown){
				
			}
		});
	}
		//获取留言
	w.ajax_post_content = function(options) {
		var data = getdata(options,'action=feedback_add');
		mui.ajax(httpUrl+"action=feedback_add",{
			data:data,
			dataType:'json',//服务器返回json格式数据
			type:'post',//HTTP请求类型
			timeout:10000,//超时时间设置为10秒；
			success:function(data){				
				logData(data);
				setTimeout(function(){
					PostFeedbackSuccess(data);
				},500);
			},
			error:function(xhr,type,errorThrown){
				
			alert("22");
			}
		});
	}
	
	//提交评论
	w.ajax_post_xqcontent = function(options) {
		var data = getdata(options,'action=comment_add');
		mui.ajax(httpUrl+"action=comment_add",{
			data:data,
			dataType:'json',//服务器返回json格式数据
			type:'post',//HTTP请求类型
			timeout:10000,//超时时间设置为10秒；
			success:function(data){				
				logData(data);
				setTimeout(function(){
					PostXqcontentSuccess(data);
				},500);
			},
			error:function(xhr,type,errorThrown){
				
			alert("22");
			}
		});
	}
	
		//提交评论
	w.ajax_userinfo = function(options) {
		var data = getdata(options,'action=get_user_info');
		mui.ajax(httpUrl+"action=get_user_info",{
			data:data,
			dataType:'json',//服务器返回json格式数据
			type:'post',//HTTP请求类型
			timeout:10000,//超时时间设置为10秒；
			success:function(data){				
				logData(data);
				setTimeout(function(){
					UserinfoSuccess(data);
				},500);
			},
			error:function(xhr,type,errorThrown){
				
			alert("请求失败");
			}
		});
	}
	
	//修改信息
	w.ajax_post_useredit = function(options) {
		var data = getdata(options,'action=edit_user_info');
		mui.ajax(httpUrl+"action=edit_user_info",{
			data:data,
			dataType:'json',//服务器返回json格式数据
			type:'post',//HTTP请求类型
			timeout:10000,//超时时间设置为10秒；
			success:function(data){				
				logData(data);
				setTimeout(function(){
					EditUserinfoSuccess(data);
				},500);
			},
			error:function(xhr,type,errorThrown){
				
			alert("修改请求失败");
			}
		});
	}
				
	//获取分类第一级
	w.ajax_get_first_category = function(options) {
		startLoad();
		var data = getdata(options,'com.huihoo.category.first_category');
		mui.ajax(httpUrl,{
			data:data,
			dataType:'json',//服务器返回json格式数据
			type:'get',//HTTP请求类型
			timeout:10000,//超时时间设置为10秒；
			success:function(data){
				
				logData(data);
				setTimeout(function(){
					endLoad();
					categoryStairSuccess(data);
				},500);
			},
			error:function(xhr,type,errorThrown){
				
			}
		});
	}
	
	//获取分类第二级
	w.ajax_get_sub_category = function(options){
		startLoad();
		var data = getdata(options,'com.huihoo.category.sub_category');
		mui.ajax(httpUrl,{
			data:data,
			dataType:'json',//服务器返回json格式数据
			type:'get',//HTTP请求类型
			timeout:10000,//超时时间设置为10秒；
			success:function(data){
				logData(data);
				setTimeout(function(){
					endLoad();
					categoryMoversSuccess(options.parent_category_id,data);
				},500);
				
			},
			error:function(xhr,type,errorThrown){
				
			}
		});
	}
	
	//获取分类产品
	w.ajax_get_product_list = function(options){
		startLoad();
		var data = getdata(options,'com.huihoo.product.product_list');
		mui.ajax(httpUrl,{
			data:data,
			dataType:'json',//服务器返回json格式数据
			type:'get',//HTTP请求类型
			timeout:10000,//超时时间设置为10秒；
			success:function(data){
				logData(data);
				setTimeout(function(){
					endLoad();
					productlistSuccess(data);
				},500);
				
				
			},
			error:function(xhr,type,errorThrown){
				
			}
		});
	}
	
	//查询用户喜欢的商品
	w.ajax_get_likelist = function(options){
		startLoad();
		var data = getdata(options,'com.huihoo.user.collect_list');
		mui.ajax(httpUrl,{
			data:data,
			dataType:'json',//服务器返回json格式数据
			type:'get',//HTTP请求类型
			timeout:10000,//超时时间设置为10秒；
			success:function(data){
				logData(data);
				setTimeout(function(){
					endLoad();
					likelistSuccess(data);
				},500);
				
				
			},
			error:function(xhr,type,errorThrown){
				
			}
		});
	}
	
	//删除喜欢的商品
	w.ajax_delete_likeItem = function(options){
		startLoad();
		var data = getdata(options,'com.huihoo.user.delete_collect');
		mui.ajax(httpUrl,{
			data:data,
			dataType:'json',//服务器返回json格式数据
			type:'get',//HTTP请求类型
			timeout:10000,//超时时间设置为10秒；
			success:function(data){
				logData(data);
				data.id = options.product_id;
				setTimeout(function(){
					endLoad();
					deleteItemSuccess(data);
				},500);
				
			},
			error:function(xhr,type,errorThrown){
				
			}
		});
		
	}
	
	//商品详情
	w.ajax_get_product_detail = function(options){
		startLoad();
		var data = getdata(options,'com.huihoo.product.product_detail');
		mui.ajax("http://192.168.1.106:32417/test/appserver/product_detail",{
			data:data,
			dataType:'json',//服务器返回json格式数据
			type:'get',//HTTP请求类型
			timeout:10000,//超时时间设置为10秒；
			success:function(data){
				logData(data);
				data.id = options.product_id;
				setTimeout(function(){
					endLoad();
					productDetailSuccess([data]);
				},500);
				
				
			},
			error:function(xhr,type,errorThrown){
				
			}
		});
	}
	
	//获取首页跑马灯
	w.ajax_get_Marquee = function(options){
		var data = getdata(options,'com.huihoo.content.paomadeng');
		mui.ajax("http://192.168.1.106:32417/test/appserver/paomadeng",{
			data:data,
		    dataType:'json',
			type:'post',//HTTP请求类型
			timeout:10000,
			success:function(data){
				
				logData(data);
				setTimeout(function(){
					endLoad();
					getMarqueeSuccess(data);
				},500);
				
			},
			error:function(xhr,type,errorThrown){
				alert("777")
			 console.log(xhr);
			 console.log(type);
			 console.log(errorThrown);
			}
		});
	}
	//获取推荐商品
	w.ajax_get_Recommend = function(options){
		startLoad();
		var data = getdata(options,'com.huihoo.product.get_hot_products');
		mui.ajax("http://192.168.1.106:32417/test/appserver/get_hot_products",{
			data:data,
			dataType:'json',
			type:'get',
			timeout:10000,
			success:function(data){

				logData(data);
				setTimeout(function(){
					endLoad();
					getRecommendSuccess(data);
				},500);
				
				
			},
			error:function(xhr,type,errorThrown){
				alert("777")
			}
		});
	}
	
	
})(window);

