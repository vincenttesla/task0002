window.onload = function(){
var imgListDiv = $(".img-list");
var startTime = null;
var rotateTime = null;
var nowId = 1;
var nextId = 0;
var imgWidth = $("img").offsetWidth;
var circleArr = $(".circle").getElementsByTagName('a');
var intervaltime = 3000;
// imgListDiv.style.width = imgListDiv.offsetWidth >= imgWidth*circleArr.length ? imgListDiv.offsetWidth : imgWidth*circleArr.length;

for(var i = 0;i < circleArr.length; i++){
	circleArr[i].index = i + 1;
}

function startMove(target){
	clearInterval(startTime);
	startTime = setInterval(function(){
		var speed = (target - imgListDiv.offsetLeft) / 6;
		speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
		imgListDiv.style.left = imgListDiv.offsetLeft+speed+"px";
	},30);
}

function rotate(clickId){
	if(clickId){
		nextId = clickId;
	}else{
		nextId = nowId <= circleArr.length-1 ? nowId + 1 : 1;
	}

	removeClass(circleArr[nowId-1],"active");
	addClass(circleArr[nextId-1],"active");

	startMove("-"+(nextId-1) * imgWidth);
	nowId = nextId;
}

rotateTime = setInterval(rotate,intervaltime);

$.delegate(".circle","a","click",function(){
	clearInterval(rotateTime);
	var clickId = this.index;
	rotate(clickId);
	rotateTime = setInterval(rotate,intervaltime);
});
}