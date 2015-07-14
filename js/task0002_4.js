var suggestData = ['text1','text234','text132432','text000','lrd1','lrd222','lll','led'];
var suggestIndex = 0;

function main(){
	var textValue = $("#suggestInput").value;
	var suggestDiv = $(".prompt");
	var suggestUl = $(".prompt ul");
	var suggestInfo = "";
	var suggestStrArr = new Array();
	var suggestRegExp = new RegExp("^"+textValue);
	var liArr = $(".suggestul").getElementsByTagName("li");
	if(textValue != ""){
	for(key in suggestData){
		if(suggestData[key].search(suggestRegExp) == 0)
			suggestStrArr.push(suggestData[key].slice(textValue.length));
	}
	for(key in suggestStrArr){
		suggestInfo += "<li><span class='keyword'>"+textValue+"</span><span>"+suggestStrArr[key]+"</span></li>";
	}
	}
	suggestDiv.style.display = suggestInfo == "" ? "none" : "block";
	suggestUl.innerHTML = suggestInfo;
	if(textValue != ""){
		for(key in liArr){
			liArr[key].index = key;
		}
		var keycode = event.keyCode;
			if(keycode == 38){
				if(suggestIndex > 1){
					suggestIndex--;
					removeClass(liArr[suggestIndex],"lihover");
					addClass(liArr[suggestIndex-1],"lihover");
				}
			}else if(keycode == 40){
				if(suggestIndex < liArr.length){
					suggestIndex++;
					addClass(liArr[suggestIndex-1],"lihover");
					if(suggestIndex > 1 && suggestIndex < 4){
					removeClass(liArr[suggestIndex-2],"lihover");
					}
				}
				}else if(keycode == 13 && suggestIndex != 0){
					var clickId = suggestIndex;
					$("#suggestInput").value = textValue + suggestStrArr[clickId];
					suggestDiv.style.display = "none";
			}
			$.delegate(".suggestul","li","click",function(){
				var clickId = this.index;
				$("#suggestInput").value = textValue + suggestStrArr[clickId];
				suggestDiv.style.display = "none";
			});
	}
}
$.on("#suggestInput","keydown",main);