var qwestionsList = [];
var lastIndex = 0;
var Jsons = [];
var currentJson = {
	name:"New - ",
	json: "new_json",
	results:"new_results"};

$( document ).ready(function() {
	var url = $(location).attr('href').split('/')[7];
	if($.isNumeric(url)){
		$.getJSON("/getJson/"+url)
		.done(function(data){
			currentJson = [];
			currentJson = data[0];
			$.getJSON("/media/"+currentJson.json)
			.done(function(data){
				try {
					qwestionsList = data;
		
					if(qwestionsList[0].q === undefined || qwestionsList[0].as === undefined){
						throw 0;
					}
		
					$.each(qwestionsList, function (i, e) { drawQwestion(i, e); });
					lastIndex = qwestionsList.length;             
				}
				catch (e) {
					alert("incorrect json file");    
				}
			});
		})
	}
});


function btnSaveClick(){
	if ('Blob' in window) {
        qwestionsList = [];

        $(".qwestions").children(".qwestion").each(function() {
            var answersTemp = [];
			$(this).find(".answer-group").each(function() {
				var answerTemp = {
					a:$(this).find(".a").val(),
					t:$(this).find(".t").val()
				};

				answersTemp.push(answerTemp);
				delete this.answerTemp;
			});

            var qwestionTemp = {
        		q: $(this).find(".q").val(),
        		as: answersTemp
        	};
        	qwestionsList.push(qwestionTemp);
        	
		    delete this.answersTemp;
		    delete this.qwestionTemp; 
		});


        var fileName = "qwestions100.json";
        var toWrite = JSON.stringify(qwestionsList);

        var textFileAsBlob = new Blob([toWrite], { type: 'text/json' });

        if ('msSaveOrOpenBlob' in navigator) {
            navigator.msSaveOrOpenBlob(textFileAsBlob, fileName);
        } else {
            var downloadLink = document.createElement('a');
            downloadLink.download = fileName;
            downloadLink.innerHTML = 'Download File';
            downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
            downloadLink.style.display = 'none';
            document.body.appendChild(downloadLink);            

            downloadLink.click();
            delete this.downloadLink;
        }
        
    } 
    else {
        alert("Your browser does not support the HTML5 Blob.");
    }
}
function btnLoadClick(){
	qwestionsList = [];
	lastIndex = 0;

	$(".qwestions").hide(500, function() {$(".qwestions").html(null);});	

	if ('FileReader' in window) {
        $("#btnInputFile").click(); 
    } else {
    	alert("Your browser does not support the HTML5 FileReader.");
    }
}
function btnInputFileChange(event) {
    var fileToLoad = event.target.files[0];   
    if (fileToLoad) {
        var reader = new FileReader();
        reader.onload = async function (fileLoadedEvent) {
            var textFromFileLoaded = fileLoadedEvent.target.result;          
            try {
				qwestionsList = JSON.parse(textFromFileLoaded);

				if(qwestionsList[0].q === undefined || qwestionsList[0].as === undefined){
					throw 0;
				}

                $.each(qwestionsList, function (i, e) { drawQwestion(i, e); });
                lastIndex = qwestionsList.length;             
            }
            catch (e) {
            	alert("incorrect json file");    
            }
        };
        reader.readAsText(fileToLoad, 'UTF-8');      
	}
	$(".qwestions").show(500); 
}

function downloadListHide(){
	$('.side-menu').addClass('side-hide');
}
function btnDownloadClick(){
	qwestionsList = [];
	lastIndex = 0;
	$(".qwestions").hide(500, function() {$(".qwestions").html(null);});	

	$.getJSON("/getAllJson")
	.done(function(data){
		Jsons = data;
		$('.side-menu').find('ol').html("");
		$.each(data, function(i, item) {
			$('.side-menu').find('ol').html($('.side-menu').find('ol').html() + "<li><a onclick='downloadJson("+item.id+")'>"+item.name+"</a></li>");
		});
	})
	$(".qwestions").show(500); 
	$('.side-menu').removeClass('side-hide');
}
function downloadJson(i){
	currentJson = [];
	for (var l = 0; l<Jsons.length; l++) {
		if(Jsons[l].id == i){
			currentJson = Jsons[l];
			break;
		}
	}
	$.getJSON("/media/"+currentJson.json)
	.done(function(data){
		try {
			qwestionsList = data;

			if(qwestionsList[0].q === undefined || qwestionsList[0].as === undefined){
				throw 0;
			}

			$.each(qwestionsList, function (i, e) { drawQwestion(i, e); });
			lastIndex = qwestionsList.length;             
		}
		catch (e) {
			alert("incorrect json file");    
		}
	});
	$('.side-menu').addClass('side-hide');
}

function btnUploadClick(){

	qwestionsList = [];
	$(".qwestions").children(".qwestion").each(function() {
		var answersTemp = [];
		$(this).find(".answer-group").each(function() {
			var answerTemp = {
				a:$(this).find(".a").val(),
				t:$(this).find(".t").val()
			};

			answersTemp.push(answerTemp);
			delete this.answerTemp;
		});

		var qwestionTemp = {
			q: $(this).find(".q").val(),
			as: answersTemp
		};
		qwestionsList.push(qwestionTemp);
		
		delete this.answersTemp;
		delete this.qwestionTemp; 
	});

	$.ajax({
		type: "POST",    
		url: "/setJson",
		//username:"",
		//password:"",
		beforeSend: function(xhr, settings){
        	xhr.setRequestHeader("X-CSRFToken", getCookie("csrftoken"))
    	},
		data:{
			name: currentJson.name,
			json_name: currentJson.json,
			json: JSON.stringify(qwestionsList),
			results_name: currentJson.results
		},
		success: function(arg){ 
			alert("File uploaded!")
		}
	});
}
function getCookie(c_name)
{
	if (document.cookie.length > 0)
	{
		c_start = document.cookie.indexOf(c_name + "=");
		if (c_start != -1)
		{
			c_start = c_start + c_name.length + 1;
			c_end = document.cookie.indexOf(";", c_start);
			if (c_end == -1) c_end = document.cookie.length;
			return unescape(document.cookie.substring(c_start,c_end));
		}
	}
	return "";
}

function drawQwestion(i, e){
	var s = "";
	s +="	      <div id=\"qwestion"+i+"\" class=\"qwestion\">";
	s +="	        <div class=\"qwestion-group\">";
	s +="	          <button class=\"btn-add\" onclick=\"showAnswers("+i+")\">➥</button> ";
	s +="	          <input class=\"q\" placeholder=\"Question\" value=\""+e.q+"\">";
	s +="	          <button class=\"btn-del\" onclick=\"delQwestion("+i+")\">✖</button>";
	s +="	        </div>";
	s +="	        <div id=\"answers"+i+"\" class=\"answers\">";
	for (var j = 0; j < e.as.length; j++) {
		s +="	          <div id=\"answer"+i+"-"+j+"\" class=\"answer-group\">";
		s +="	            <select class=\"t\">";
		s +="	              <option "+(e.as[j].t == "ВР" ? "selected":" ")+">ВР</option>";
		s +="	              <option "+(e.as[j].t == "САПР" ? "selected":" ")+">САПР</option>";
		s +="	              <option "+(e.as[j].t == "ИБ" ? "selected":" ")+">ИБ</option>";
		s +="	              <option "+(e.as[j].t == "КС" ? "selected":" ")+">КС</option>";
		s +="	              <option "+(e.as[j].t == "ПИ" ? "selected":" ")+">ПИ</option>";
		s +="	              <option "+(e.as[j].t == "ИТМ" ? "selected":" ")+">ИТМ</option>";
		s +="	              <option "+(e.as[j].t == "ПМиИ" ? "selected":" ")+">ПМиИ</option>";
		s +="	            </select>";
		s +="	            <input class=\"a\" placeholder=\"Answer\" value=\""+e.as[j].a+"\">";
		s +="	            <button class=\"btn-del\" onclick=\"delAnswer("+i+", "+j+")\">✖</button>";
		s +="	          </div>";
	}
	s +="	          <center><button class=\"btn-add\" onclick=\"addAnswer("+i+")\">✚</button> </center>";
	s +="	        </div>";
	s +="	      </div>";

	$(".qwestions").prepend(s);
	$("#qwestion"+i).hide();
	$("#answers"+i).hide();
	$("#qwestion"+i).show(500);
}
function showAnswers(i) {
	if ($("#answers"+i).css("display") == "none")
		$("#answers"+i).show(500);
	else
		$("#answers"+i).hide(500);
}
function delQwestion(i){
	$("#qwestion"+i).hide(500, function(){
		$("#qwestion"+i).remove();
	});
}
function delAnswer(i, j){
	$("#answer"+i+"-"+j).hide(500, function(){
		$("#answer"+i+"-"+j).remove();
	});
}
function addQwestion(){
	var element = {q: "", as: []};
	drawQwestion(lastIndex, element);
	lastIndex++;	
}
function addAnswer(i){
	var n = $("#answers"+i).children(".answer-group").length;

	var s = "";
	s +="	          <div id=\"answer"+i+"-"+n+"\" class=\"answer-group\">";
	s +="	            <select class=\"t\">";
	s +="	              <option>ВР</option>";
	s +="	              <option>САПР</option>";
	s +="	              <option>ИБ</option>";
	s +="	              <option>КС</option>";
	s +="	              <option>ПИ</option>";
	s +="	              <option>ИТМ</option>";
	s +="	              <option>ПМиИ</option>";
	s +="	            </select>";
	s +="	            <input class=\"a\" placeholder=\"Answer\">";
	s +="	            <button class=\"btn-del\" onclick=\"delAnswer("+i+", "+n+")\">✖</button>";
	s +="	          </div>";

	$("#answers"+i).prepend(s);
	$("#answer"+i+"-"+n).hide();
	$("#answer"+i+"-"+n).show(500);
}