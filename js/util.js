function isNumber(num){
	return typeof(num)=="number";
}
function isboolean(boo){
	return typeof(boo)=="boolean";
}
function isString(str){
	return typeof(str)=="string";
}
function isFunction(fn){
	return typeof(fn)=="function";
}
function isUndefined(und){
	return typeof(und)=="undefined";
}
function isObject(obj){
	return typeof(obj)=="object";
}
function isNull(nul){
	return Object.prototype.toString.call(nul)=="[object Null]";
}
function isArray(arr){
	return arr instanceof Array;
}
function isDate(dat){
	return dat instanceof Date;
}

// 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
// 被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等
function cloneObject(src){
	var result;
	if(isArray(src)){
		result = src.slice(0);
	}else if(isNull(src)){
		result = null;
	}else{
		result={};
		for(key in src){
			var copy = src[key]
			if(isObject(copy)){
				result[key] = cloneObject(copy);
			}else{
				result[key] = src[key];
			}
		}
	}
	return result;
}

//快排
function quickSort(array){
	function sort(prev,numsize){
		var i = prev;
		var j = numsize-1;
		var flag = array[prev];
		if(numsize>prev+1){
			while(i<j){
				for(;i<j;j--){
					if(array[j]<flag){
						array[i++] = array[j];
						break;
 					}
				}
				for(;i<j;i++){
					if(array[i]>flag){
						array[j--] = array[i];
						break;
					}
				}
			}
			array[i] = flag;
			sort(0,i);
			sort(i+1,numsize);
		}
	}
	sort(0,array.length);
	return array;
}

// 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
function uniqArray(arr){
	var newarray = [];
	for(var i in arr){
		if(arr[i] != ''&&newarray.indexOf(arr[i])<0)
			newarray.push(arr[i]);
	}
	return newarray;
}

// function uniqArray(arr){
// 	var qarr = quickSort(arr);
// 	var uarr = [];
// 	for(var i = 0;i<qarr.length;i++){
// 		j = i+1;
// 		if(qarr[i] != qarr[j]){
// 			uarr.push(qarr[i]);
// 		}
// 	}
// 	return uarr;
// } 

function simpleTrim(str){
	var ststr = str;
	while(true){
		if(ststr.indexOf(" ")==0||ststr.indexOf("\t")==0){
			ststr = ststr.slice(0);
		}else{
			break;
		}
		if(ststr.indexOf(" ")==ststr.length-1||ststr.indexOf("\t")==ststr.length-1){
			ststr = ststr.slice(length-1);
		}else{
			break;
		}
	}
	return ststr;
}

// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
// 尝试使用一行简洁的正则表达式完成该题目
function trim(str){
	return str.replace(/(^\s+)|(\s+$)/g,"");
}

// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
function each(arr,output){
	for(var i in arr){
		output(i,arr[i]);
	}
}

// 获取一个对象里面第一层元素的数量，返回一个整数
function getObjectLength(obj){
	var length = 0;
	for(var key in obj){
		if(obj.hasOwnProperty(key))
			length++;
	}
	return length;
}

// 判断是否为邮箱地址
function isEmail(emailStr){
	var re = /(\w+)@(\w+)(\.)(\w+)/g;
	return re.test(emailStr);
}

// 判断是否为手机号
function isMobilePhone(phone){
	var re = /\d{11}/g;
	return re.test(phone);
}
// DOM
function addClass(element,newClassName){
	element.className += "" + newClassName; 
}

function removeClass(element,oldClassName){
	element.className = element.className.replace(oldClassName,'');
}

function isSiblingNode(element,siblingNode){
	return element.parentNode == siblingNode.parentNode;
}

function getPosition(element){
	var viewX = element.getBoundingClientRect().left + Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
	var viewY = element.getBoundingClientRect().top + Math.max(document.documentElement.scrollTop, document.body.scrollTop);
	return {
		x: viewX,
		y: viewY
	}
}

// 实现一个简单的Query
function $(selector){
	return document.querySelector(selector);
}

function addEvent(element, event, listener){
	if(element.addEventListener){
		element.addEventListener(event,listener,false);
	}else if(element.attachEvent){
		event = "on" + event;
		element.attachEvent(event,listener);
	}else{
		element["on" + event] = listener;
	}
}

function removeEvent(element, event, listener){
	if(element.removeEventListener){
		element.removeEventListener(event,listener,false);
	}else if(element.detachEvent){
		event = "on" + event;
		element.detachEvent(event,listener)
	}else{
		element["on" + event] = null; 
	}
}

function addClickEvent(element, listener){
	addEvent(element,"click",listener);
}

function addEnterEvent(element, listener){
	var evnt = evnt || window.event;
	if(evnt.keycode === 13)
		addEvent(element,"keydown",listener);
}

function delegateEvent(element, tag, eventname, listener){
	addEvent(element,eventname,function(event){
		var target = event.target || event.srcElement;
		if(target.tagName.toLowerCase() == tag.toLowerCase()){
			listener.call(target,event);
		}
	})
}

$.on = function(selector,event,listener){
	addEvent($(selector),event,listener);
}

$.un = function(selector,event,listener){
	removeEvent($(selector),event,listener);
}

$.click = function(selector,listener){
	addClickEvent($(selector),listener);
}

$.enter = function(selector,listener){
	addEnterEvent($(selector),listener);
}

$.delegate = function(selector,tag,event,listener){
	delegateEvent($(selector),tag,event,listener);
}

// function isIE(){
// 	var ua = window.navigator.userAgent.toLowerCase();
// 	var isie = ua.match(/msie ([\d.]+)/gi);
// }

// 判断是否为IE浏览器，返回-1或者版本号
function isIE() {
    var s = navigator.userAgent.toLowerCase();
    console.log(s);
    //ie10的信息：
    //mozilla/5.0 (compatible; msie 10.0; windows nt 6.2; trident/6.0)
    //ie11的信息：
    //mozilla/5.0 (windows nt 6.1; trident/7.0; slcc2; .net clr 2.0.50727; .net clr 3.5.30729; .net clr 3.0.30729; media center pc 6.0; .net4.0c; .net4.0e; infopath.2; rv:11.0) like gecko
    var ie = s.match(/rv:([\d.]+)/) || s.match(/msie ([\d.]+)/);
    if (ie) {
        return ie[1];
    } else {
        return -1;
    }
}

function ajax(url, options){
	//处理type
	var method = options.type || 'GET';
	//处理data
	var datas;
	if(isObject(options.data)){
		var str = "";
		for(var c in options.data){
			str = str + c +"="+ options.data[c] + '&';
		}
		datas = str;
	}
	//获取XMLHttpRequest对象
	var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
	//发送请求
	xhr.open(method,url);
	if (method == 'GET') {
		xhr.send(null);
	}else{
		xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
		xhr.send(datas);
	}

	//readyState
	xhr.onreadystatechange = function(){
		if (xhr.readyState === 4) {
			if(xhr.status === 200){
				if(options.onsucess){
					options.onsucess(xht.responseText,xht.responseXML);
				}
			}else if (options.onfail) {
				options.onfail();
			};
		};
	}

}