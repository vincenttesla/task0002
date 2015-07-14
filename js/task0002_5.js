var container1 = $("#container1");
var container2 = $("#container2");
var blockHeight = $(".block").clientHeight;
var dragInterval = null;

function init(){
	initPosition(container1);
	initPosition(container2);
	$.delegate("#container1","div","mousedown",mouseDownOneBlock);
	$.delegate("#container2","div","mousedown",mouseDownOneBlock);
}

function initPosition(container){
	for(var i = 0; i < container.children.length; i++){
		container.children[i].style.top = (1 + blockHeight) * i + "px";
	}
}

function mouseDownOneBlock (e) {
	var evnt = e || window.event;
	var target = evnt.target || evnt.srcElement;
	if (target.className.toLowerCase() != "block") {
		return;
	};

	var mouseX = evnt.clientX;
	var mouseY = evnt.clientY;

	var targetLeft = target.parentNode.offsetLeft;
	var targetTop = target.offsetTop;

	target.style.border = "1px solid #333";
	target.style.opacity = 0.5;
	
	var parent = target.parentNode;
	var firstMove = true;
// 鼠标移动
	document.onmousemove = function(e){
		if (firstMove) {
			parent.removeChild(target);
			$(".wraper").appendChild(target);
		};
		firstMove = false;
		var ev = e || window.event;

		target.style.left = targetLeft + ev.clientX - mouseX + "px";
		target.style.top = targetTop + ev.clientY - mouseY + "px";

		initPosition(parent);
	}
	document.onmouseup = function(e){
		document.onmousemove = null;
		document.onmouseup = null;
		target.style.border = "none";
		target.style.borderBottom = "1px solid #000";
		target.style.opacity = 1;

		var ev = e || window.event;
		target.parentNode.removeChild(target);
		if(judgeInBlock(ev.clientX,ev.clientY,container1)){
			container1.appendChild(target);
			target.style.left = 0 + "px";
			initPosition(container1);
		} else if(judgeInBlock(ev.clientX,ev.clientY,container2)){
			container2.appendChild(target);
			target.style.left = 0 + "px";
			initPosition(container2);
		} else{
			parent.appendChild(target);
			target.style.left = 0 + "px";
			initPosition(parent);
		}
 	}
 	return false;
}

function judgeInBlock(x, y, container){
	var x0 = getPosition(container).x;
	var x1 = x0 + container.offsetWidth;
	var y0 = getPosition(container).y;
	var y1 = y0 + container.offsetHeight;
	return x > x0 && x < x1 && y > y0 && y < y1;
}
init();