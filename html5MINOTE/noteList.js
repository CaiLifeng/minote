var colors=["#FFF18B","#D9F1FF","#FEFEFE","#ECFFBB","#FFCFCF"];
var darkColors=["#FEE008","#8DD5FE","#E4E4E4","#D9FE7C","#FF8B8B"];
var noteList=document.getElementById("noteList");
window.onload=function(){
	
	showNotes();
	editNote();
};

function addTime(){
	var dateTime=Date.toUTCString();
	return dateTime;
}

function showNotes(){
	var notes=JSON.parse(localStorage.getItem("notes"));
	var noteList=document.getElementById("noteList");
	for(var i=0;i<notes.length;i++){
		var content=notes[i].content;
		var time=notes[i].time.split(" ")[0];
		var colorIndex=notes[i].colorIndex;
		var note=document.createElement("li");
		note.id="note"+i;
		note.className="note";
		note.style.backgroundColor=colors[colorIndex];
		note.setAttribute("noteIndex",i);
		note.setAttribute("colorIndex",colorIndex);
		note.innerHTML="<div class='title' noteIndex="+i+" style='width:70%;overflow:hidden;float:left;height:100%'>"+content+"</div><div class='time' style='width:30%;overflow:hidden;float:left;height:100%'>"+time+"</div>";
		noteList.appendChild(note);
	}
}

function getRandomColor(){
	var index=Math.floor((Math.random()*colors.length));
}

function editNote(){
	var noteList=document.getElementById("noteList");
	var touchHandler=function(event){
		var noteIndex=event.target.parentNode.getAttribute("noteIndex");
		console.log(noteIndex);
		var colorIndex=JSON.parse(localStorage.getItem("notes"))[noteIndex].colorIndex;
		location.href="noteDetail.html?action=edit&noteIndex="+noteIndex+"&colorIndex="+colorIndex;
	};
	noteList.addEventListener("touchstart",touchHandler,false);
}
