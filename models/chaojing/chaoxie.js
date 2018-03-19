var autoRun = null;
    	var time = 0;
    	var numAll = 0;
    	function changeText() {
    		clearText();

    		var txt = getObj('txtInput').value;
    		txt = txt.replace(/\r\n/g, '\n');
    		var divTxt = getObj('divText').innerHTML;
    		divTxt = divTxt.replace(/  /g, ' ');
    		divTxt = divTxt.replace(/   /g, ' ');
    		divTxt = divTxt.replace(/\r/g, '');
    		divTxt = divTxt.replace(/\n/g, '');
    		divTxt = divTxt.replace(/&nbsp;/g, ' ');
    		divTxt = divTxt.replace(/<BR>/g, '\n');
    		divTxt = divTxt.replace(/<br>/g, '\n');
    		var top = 10;
    		var left = 0;
    		var error = 0;
    		var lost = 0;
    		var spanObj = null;
    		for (var i = 0; i < divTxt.length; i++) {
    			if (i >= txt.length + lost) {
    				break;
    			}

    			var color = 'green';
    			if (txt.charAt(i - lost) != divTxt.charAt(i)) {
    				error++;
    				color = 'red';
    			}
    			if (spanObj && spanObj.color != color) {
    				addSpan(spanObj);
    				spanObj = null;
				}

    			if (divTxt.charAt(i) == '\n' || divTxt.charAt(i) == '\r') {
    				if (divTxt.charAt(i) == '\n') {
    					top += 40;
    					left = 0;
    					addSpan(spanObj);
    					spanObj = null;
    				}
    				continue;
    			}

    			var charWidth = divTxt.charCodeAt(i) > 255 ? 16 : 9;
    			if (!spanObj) {
    				spanObj = new Object();
    				spanObj.top = top;
    				spanObj.left = left;
    				spanObj.color = color;
    				spanObj.height = 18;
    				spanObj.width = charWidth;
    			}
    			else {
    				spanObj.width += charWidth;
				}

    			left += charWidth;
    			if (left > ($('#divText').width() - charWidth)) {
    				top += 40;
    				left = 0;
    				addSpan(spanObj);
    				spanObj = null;
    				if (divTxt.charAt(i + 1) == ' ' || divTxt.charAt(i + 1) == '\n') {
    					i++;
    					lost++;
					}
    			}
    		}
    		if (spanObj) {
    			addSpan(spanObj);
    			spanObj = null;
			}
    		getObj('spanError').innerHTML = error;
    		getObj('spanNum').innerHTML = txt.length;
    		getObj('spanRate').innerHTML = Math.round(100 - (error / txt.length) * 100) + '%';
    		getObj('spanSpeed').innerHTML = Math.round(txt.length / time * 60) + '字/分';
    	}

    	function addSpan(spanObj) {
    		if (!spanObj) {
    			return;
			}
    		var span = document.createElement('span');
    		span.style.position = 'absolute';
    		span.style.width = spanObj.width + 'px';
    		span.style.height = spanObj.height + 'px';
    		span.style.top = spanObj.top + 'px';
    		span.style.left = spanObj.left + 'px';
    		span.style.zIndex = 1;
    		span.style.backgroundColor = spanObj.color;
    		getObj('divMain').appendChild(span);
		}

    	function selectText(content) {
    		var txt = content;
    		txt = txt.replace(/\r/g, '');
    		txt = txt.replace(/–/g, '-');
    		txt = txt.replace(/\n/g, '<br>');			
    		var divText = getObj('divText');
    		txt = txt.replace(/  /g, ' ');
    		txt = txt.replace(/   /g, ' ');
    		divText.innerHTML = txt;
    		numAll = txt.length;
    		getObj('spanAllNum').innerHTML = txt.length;
    		getObj('btnStart').value = '开 始';
    		clearText();
    		getObj('spanError').innerHTML = '0';
    		getObj('spanTime').innerHTML = '0';
    		getObj('spanRate').innerHTML = '0';
    		getObj('spanSpeed').innerHTML = '0';
    		getObj('spanNum').innerHTML = '0';
    		getObj('txtInput').value = '';
    		getObj('txtInput').disabled = true;
    		if (autoRun) {
    			window.clearInterval(autoRun);
    		}
    	}

    	function clearText() {
    		var divMain = getObj('divMain');
    		var spans = divMain.getElementsByTagName('span');
    		while (spans.length > 0) {
    			divMain.removeChild(spans[0]);
    		}
    	}

    	function btnStartClick() {
    		if (autoRun) {
    			window.clearInterval(autoRun);
    		}
    		var btnStart = getObj('btnStart');
    		var txtInput = getObj('txtInput');
    		var divText = getObj('divText');
    		if (btnStart.value == '开 始') {
    			clearText();
    			txtInput.style.height = Math.max(500, divText.offsetHeight) + 'px';
    			txtInput.value = '';
    			txtInput.disabled = false;
    			txtInput.focus();
    			getObj('spanError').innerHTML = '0';
    			getObj('spanTime').innerHTML = '0';
    			getObj('spanRate').innerHTML = '0';
    			getObj('spanSpeed').innerHTML = '0';
    			getObj('spanNum').innerHTML = '0';
    			numAll = 0;
    			numError = 0;
    			numInput = 0;
    			btnStart.value = '结 束';
    			time = 0;
    			autoRun = window.setInterval(timer, 1000);
    		}
    		else {
    			btnStart.value = '开 始';
    		}
    	}

    	function timer() {
    		time++;
    		var str = '';
    		var fen = Math.floor(time / 60);
    		if (fen > 0) {
    			str += fen + '分';
    		}
    		getObj('spanTime').innerHTML = str + (time - fen * 60) + '秒';
    		var txt = getObj('txtInput').value;
    		txt = txt.replace(/\r\n/g, '\n');
    		getObj('spanSpeed').innerHTML = Math.round(txt.length / time * 60) + '字/分';
    	}

    	function getObj(id) {
    		return document.getElementById(id);
    	}