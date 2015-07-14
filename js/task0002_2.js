window.onload=function(){
	$.click("#btn",function(){
		var timeInput = $("#timegeter").value;
		tI = timeInput.split("-");
		interv = setInterval("showTime("+tI+")",1000);
	});
}
function showTime(){
			var now = new Date();
			var tg = new Date(tI[0],tI[1]-1,tI[2]);
			var td = tg - now;
			var day = Math.floor(td/(24*60*60*1000));
			var hour = Math.floor((td - day*24*60*60*1000)/(60*60*1000));
			var min = Math.floor((td - day*24*60*60*1000-hour*60*60*1000)/(60*1000));
			var second = Math.floor((td - day*24*60*60*1000-hour*60*60*1000-min*60*1000)/1000);
			$("#text").innerHTML = "距离"+tI[0]+"年"+tI[1]+"月"+tI[2]+"日还有"+day+"天"+hour+"时"+min+"分"+second+"秒";
			if(tg === now){
				clearInterval(interv);
			}
		}