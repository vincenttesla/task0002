// window.onload = function(){
// 	$.click('#btn',function(){
// 	var userInput = $('#hoby1').value;
// 	if(isString(userInput)){
// 		userInput = trim(userInput);
// 		var hobys = userInput.split(",");
// 		var uniqHoby = uniqArray(hobys);
// 		var mse = "";
// 		for (var i = 0; i < uniqHoby.length; i++) {
// 			mse += uniqHoby[i]+"&nbsp";
// 		};
// 		$('#message').innerHTML = "<p>"+mse+"</p>";
// 	}
// });
// }
window.onload = function(){
	$.click('#btn',function(){
	var userInput = $('#hoby2').value;
		userInput = trim(userInput);
		var hobys = userInput.split(/\s|,|，|、|；|;/g);
		var uniqHoby = uniqArray(hobys);
		var mse = "";
		if(uniqHoby.length == 0){
			$('#errormes').innerHTML = "<p>您还没有输入！</p>";
		}else if(uniqHoby.length >= 10){
			$('#errormes').innerHTML = "<p>您输入数据过长！</p>";
		}else{
			$('#errormes').innerHTML = "";
			for (var i = 0; i < uniqHoby.length; i++) {
				mse += "<label for="+uniqHoby[i]+">"+uniqHoby[i]+"</label><input type='checkbox' id="+uniqHoby[i]+">&nbsp";
			};
			$('#message').innerHTML = mse;
		}
});
}
