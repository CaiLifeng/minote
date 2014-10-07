var colors=["#FFF18B","#D9F1FF","#FEFEFE","#ECFFBB","#FFCFCF"];
var darkColors=["#FEE008","#8DD5FE","#E4E4E4","#D9FE7C","#FF8B8B"];
window.onload=function(){
	setArticleHeight();
	showBlock();
	init();
	saveNote();
	chooseColor();
};


function showBlock(){
		var isBlock=false;
		var changeColor=document.getElementById("changeColor");
		changeColor.addEventListener("touchstart",function(){
			if(isBlock===false){
				var chooseColor=document.getElementById("chooseColor");
				chooseColor.style.display="block";
				isBlock=true;
			}
			else{
				var chooseColor=document.getElementById("chooseColor");
				chooseColor.style.display="none";
				isBlock=false;
			}
			
		},false);
}

function saveNote(){
	var args=getQueryStrArgs();

	save.addEventListener("touchstart",function(event){
		event.preventDefault();
		var myDate=new Date();
		var dateTime=myDate.toLocaleString();
		if(args["action"]=="create"){
			var noteContent=document.getElementById("content").value;
			if(localStorage.getItem("notes")==null){
				localStorage.setItem("notes","");
				var colindex=sessionStorage.getItem("colorIndex");
				var newNoteStr="[{\"position\":\"{'x':0,'y':0}\",\"content\":\""+noteContent+"\",\"time\":\""+dateTime+"\",\"colorIndex\":\""+colindex+"\"}]";
				localStorage.setItem("notes",newNoteStr);
			}
			else{
				var notes=JSON.parse(localStorage.getItem("notes"));
				var colindex=sessionStorage.getItem("colorIndex");
				var newNoteObj={position:"{'x':0,'y':0}",content:noteContent,time:dateTime,colorIndex:colindex};
				notes[notes.length]=newNoteObj;
				var notesStr=JSON.stringify(notes);
				localStorage.setItem("notes",notesStr);
			}
			
		}
		else if(args["action"]=="edit"){
			var noteIndex=args["noteIndex"];
			var notes=JSON.parse(localStorage.getItem("notes"));
			var noteContent=document.getElementById("content").value;
			var colIndex=sessionStorage.getItem("colorIndex");
			var newNoteObj={position:"{'x':0,'y':0}",content:noteContent,time:dateTime,colorIndex:colIndex};
			notes[noteIndex]=newNoteObj;
			var notesStr=JSON.stringify(notes);
			localStorage.setItem("notes",notesStr);
		}
		location.href="noteList.html";
	},false);
}

function setArticleHeight(){
	var winHeight=window.screen.availHeight;
	var article=document.getElementsByTagName("article")[0];
	article.style.height=(winHeight-50)+'px';//这里一定要加上PX
}

function getRandomColor(){
	var index=Math.floor((Math.random()*colors.length));
	return index;
}

function getQueryStrArgs(){
     // 取得查询字符串并去掉开头的问号
     var qs=(location.search.length>0?location.search.substring(1):"");
     //创建一个js对象
     var args={};
     var items=qs.length?qs.split("&"):[];
     var item=null;
     var name=null;
     var value=null;

     for(var i=0;i<items.length;i++){
          item=items[i].split("=");
          name=decodeURIComponent(item[0]);
          value=decodeURIComponent(item[1]);

          if(name.length){
               args[name]=value;
          }
     }

     return args;
}

function init(){
	var args=getQueryStrArgs();
	var showTime=document.getElementById("showTime");
	var toolbar=document.getElementById("tool");
	var content=document.getElementById("content");
	if(args["action"]=="create"){
		var colorIndex=getRandomColor();
		var color=colors[colorIndex];
		var darkColor=darkColors[colorIndex];
		
		toolbar.style.backgroundColor=darkColor;
		content.style.backgroundColor=color;
		sessionStorage.setItem("colorIndex",colorIndex);

		//设置时间
		
		var myDate=new Date();
		var dateTime=myDate.toLocaleString();
		showTime.innerHTML=dateTime;
	}
	else if(args["action"]=="edit"){
		var noteIndex=args["noteIndex"];
		var colorIndex=args["colorIndex"];
		sessionStorage.setItem("colorIndex",colorIndex);
		var notes=JSON.parse(localStorage.getItem("notes"));
		
		content.value=notes[noteIndex].content;
		var time=notes[noteIndex].time;
		showTime.innerHTML=time;
		var color=colors[colorIndex];
		var darkColor=darkColors[colorIndex];
		toolbar.style.backgroundColor=darkColor;
		content.style.backgroundColor=color;
	}
}

function chooseColor(){
	var toolbar=document.getElementById("tool");
	var content=document.getElementById("content");
	var chooseColor=document.getElementById("chooseColor");
	chooseColor.addEventListener("touchstart",function(event){
		var colorIndex=event.target.getAttribute("colorIndex");
		console.log(colorIndex);
		var color=colors[colorIndex];
		var darkColor=darkColors[colorIndex];
		toolbar.style.backgroundColor=darkColor;
		content.style.backgroundColor=color;
		sessionStorage.setItem("colorIndex",colorIndex);
		chooseColor.style.display="none";
	},false);
}

