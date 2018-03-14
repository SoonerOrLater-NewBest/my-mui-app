

$(function(){
	var bfscrolltop = document.body.scrollTop;//获取软键盘唤起前浏览器滚动部分的高度
    $(".shuru input[type='text']").focus(function(){//在这里‘input.inputframe’是我的底部输入栏的输入框，当它获取焦点时触发事件
        interval = setInterval(function(){//设置一个计时器，时间设置与软键盘弹出所需时间相近
        document.body.scrollTop = document.body.scrollHeight;//获取焦点后将浏览器内所有内容高度赋给浏览器滚动部分高度
        },100)
    }).blur(function(){//设定输入框失去焦点时的事件
        clearInterval(interval);//清除计时器
        document.body.scrollTop = bfscrolltop;
    });
	
//	$(".shuru input[type='submit']").click(function(){
//		var zhi=$(".shuru input[type='text']").val();
//		if(zhi==''){
//			alert('请输入您的评论');
//		}else{
//			
//		}
//	})
	$(".shuru input[type='text']").on('input',function(){

		if($(this).val()==""){
			$(".shuru input[type='submit']").attr("disabled",true);
		}else{
			$(".shuru input[type='submit']").attr("disabled",false);
		}
		
	})
})
