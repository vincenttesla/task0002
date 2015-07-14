var suggestData = ['text1','text234','text132432','text000','lrd1','lrd222','lll','led'];
var suggestArea = $(".suggest");
var suggestInput = $("#suggestInput");
var suggestUl = $(".prompt ul");
var suggestDiv = $(".prompt");
var liArr = $(".suggestul").getElementsByTagName("li");
// 键盘输入事件
function keyDownEvent(e){
	e = e || window.event;
	var keycode = e.which ? e.which : e.keyCode;
	var hoverdeLi = $(".lihover");
	if (keycode == 13 || keycode == 108){
		// 当按下enter
		if(hoverdeLi){
			suggestInput.value = hoverdeLi.getElementsByTagName("span")[0].innerHTML + hoverdeLi.getElementsByTagName("span")[1].innerHTML;
			suggestDiv.style.display = "none";
		}
	}else if(keycode == 38){
		// 当按下上方向键
		if (hoverdeLi) {
               var preLi = hoverdeLi.previousSibling;
               if (preLi) {
                   removeClass(hoverdeLi, "lihover");
                   addClass(preLi, "lihover");
               }
           } else {
               addClass($("li"), "lihover");
           }
	}else if(keycode == 40){
		// 当按下下方向键
		if (hoverdeLi) {
            var nextLi = hoverdeLi.nextSibling;
            if (nextLi) {
                removeClass(hoverdeLi, "lihover");
                addClass(nextLi, "lihover");
            } 
        } else {
            addClass($("li"), "lihover");
        }
	}else if((keycode <= 57 && keycode >= 48) || (keycode >= 65 && keycode <= 105) || keycode == 8){
		var suggestInfo = "";
		var suggestStrArr = new Array();
		var suggestInputValue = suggestInput.value;
		var suggestRegExp = new RegExp("^"+suggestInputValue);
		if(suggestInputValue != ""){
			for(key in suggestData){
				if(suggestData[key].search(suggestRegExp) == 0)
					// suggestStrArr.push(suggestData[key].slice(suggestInputValue.length));
					suggestStrArr.push(suggestData[key]);
			}
			suggestStrArr = uniqArray(suggestStrArr);
			for(key in suggestStrArr){
				suggestInfo += "<li><span class='keyword'>"+suggestInputValue+"</span><span>"+suggestStrArr[key].slice(suggestInputValue.length)+"</span></li>";
			}
		}
		suggestDiv.style.display = suggestInfo == "" ? "none" : "block";
		suggestUl.innerHTML = suggestInfo;
	}
	$.delegate(".suggestul","li","click",clickEvent);
}
// 鼠标点击事件
function clickEvent(){
	suggestInput.value = this.getElementsByTagName("span")[0].innerHTML + this.getElementsByTagName("span")[1].innerHTML;
	suggestDiv.style.display = "none";
}
$.on(".suggest","keyup",keyDownEvent);