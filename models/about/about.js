mui.init();		
							
document.addEventListener('get_detail', function(event) {
				var id = event.detail.id;
				if(!id) {
					return;
				}				
				//向服务端请求文章详情内容
				//根据id向服务器请求新闻详情
			$.ajax({
				type: "get",				
				url: api_url + "Api/get_case_id?t_id="+id,
				dataType: "json",
				success: function(data) {
				var status = data.status;
			if(status == 4001) {
				mui.toast('没有更多信息');
				return false;
			}
			if(data.info.author==''){data.info.author='佚名'}
			var addtime = getDateDiff(data.info.addtime);
					var html =							
							'<div class="about-body">' +
							'<h2>' + data.info.title+ '</h2>' +
							'<p class="mui-ellipsis"><span>' + data.info.author + '</span>发表于<span class="new_date">' + addtime + '</span></p>' +
							'<div>'+data.info.content+'</div>'+
							'</div>';
					var html1='<div class="about-img">'+
								'<img src="'+data.info.main_img_url+'"></div>'
					$('.about-banner').append(html1);
					$('.about').append(html);
				}
			});
		});
		mui.back = function() {
				plus.webview.currentWebview().hide("auto", 300);
				//动画结束后，恢复默认值
				setTimeout(function() {
					window.scrollTo(0, 0);
					$('.about-banner').empty();
					$('.about').empty();		
				}, 300);
			}