var currentQwestion = -1;
var jsonDefaultQwestions = '[{"q":"Вас попросили разработать калькулятор. Какой из предложенных вариантов вы выберете?","as":[  {"a":"Разработать веб приложение чтобы иметь доступ к калькулятору с любого устройства","t":"ВР"},  {"a":"Разработать мобильную версию приложения для использования калькулятора оффлайн","t":"ПИ"},    {"a":"Разработать консольное приложение с повышенной отказоустойчивостью","t":"ИБ"},    {"a":"Разработать алгоритм для максимально точного калькулятора","t":"ПМиИ"}]},{"q":"Ваш знакомый увлекся бизнесом и просит вас посоветовать crm систему для него. Ваши действия?","as":[   {"a":"Посоветовать вести учет в excel пока он не поймет какие именно возможности ему нужны","t":"ВР"},  {"a":"Посоветовать использовать готовые облачные решения","t":"КС"},    {"a":"Предложите написать crm специально под его задачи","t":"ПИ"}, {"a":"Посоветуете популярные настольные решения и свой сервер","t":"ИБ"}]},{"q":"Ваша бабушка постоянно теряет свой смартфон и вы хотите ей помочь. Ваши действия?","as":[  {"a":"Покажите ей сайт для отслеживания телефона","t":"ВР"},    {"a":"Установите софт для отслеживания устройства через Telegram","t":"ИБ"},    {"a":"Установите приложение издающее звуковой сигнал при определенных условиях","t":"ПИ"},  {"a":"Спроектируете кнопку которая отправляет сигнал на телефон по определенному протоколу","t":"САПР"}]},{"q":"У вас скоро экзамен вам необходимо подготовить подсказки. Ваши действия?","as":[    {"a":"Найти сайт со шпаргалками","t":"ВР"}, {"a":"Найти приложение со шпаргалками","t":"ПИ"},   {"a":"Попытаться распознать текст из записей в тетради","t":"КС"},  {"a":"Записать шпаргалки на листе используя методики шифрования","t":"ИБ"}]},{"q":"Вы работаете в компании и вас попросили разработать систему оповещения сотрудников. Ваши действия?","as":[   {"a":"Разработать устройства для передачи сообщений","t":"САПР"},   {"a":"Найти людей которые уже делали подобные системы и договориться о реализации у вас в фирме","t":"ИТМ"},    {"a":"Объединить компьютеры в одну сеть и написать программу для оповещения","t":"ПИ"}, {"a":"Доработать известные решения убрав все лишнее","t":"ИБ"}]},{"q":"Вы отправляетесь в путешествие. Вам нужно найти авиабилеты. Чем вы воспользуетесь?","as":[   {"a":"Сайтом надежной авиакомпании","t":"ИБ"},  {"a":"Сайтом агрегатором билетов","t":"КС"},    {"a":"Мобильным приложением","t":"ПИ"}, {"a":"Спрошу у друзей как они искали билеты","t":"ИТМ"}]},{"q":"Ваши дела плохи. Вы на грани отчисления. Ваши родители ждут списков на отчисление. Ваши действия?","as":[   {"a":"Удалить свою фамилию из списка в html странице и отправить ссылку родителям","t":"ВР"},   {"a":"Попытаться взломать систему института","t":"ИБ"}, {"a":"Узнать у людей в институте какие есть выходы из ситуации","t":"ИТМ"}, {"a":"Сформировать свой документ мигрировав данные из официального","t":"КС"}]},{"q":"Ваш руководитель требует от вас проект на свободную тему. Ваши действия?","as":[  {"a":"Найти готовый проект в интернете и доработать его","t":"ВР"}, {"a":"Написать программу упрощающую ваши основные обязанности","t":"ПИ"},   {"a":"Попробовать себя в сфере с нейросетями","t":"КС"},    {"a":"Спроектировать материальный предмет чтобы распечатать его на 3D принтере","t":"САПР"}]},{"q":"Вы заканчиваете институт и вас приглашают работать в малоизвестную компанию. Что вы сделает для начала?","as":[ {"a":"Посмотреть официальный сайт и оценить потенциал компании","t":"ВР"},  {"a":"Посмотреть официальную статистику и предположите примерное развитие компании","t":"КС"},  {"a":"Просмотрите все документы компании и их структуру взаимодействия","t":"ПИ"},  {"a":"Встретитесь с человеком уже работающим в этой компании и узнаете обо всем изнутри","t":"ИТМ"}]},{"q":"Вы заведуете большим отделом компании. начальник просит от вас ответ по эффективности сотрудников. Ваши действия?","as":[   {"a":"Сформировать отчет с помощью запроса к базе данных","t":"КС"},    {"a":"Узнать у неэффективных сотрудников причины и сформировать отчет основываясь на личном восприятии","t":"ИТМ"}, {"a":"Сформировать математическую модель учитывающую эффективность сотрудников по определенной формуле","t":"ПМиИ"},    {"a":"Попытаться составить отчет на основании документов оформленных в crm системе","t":"ПИ"}]}]';
var qwestions;
var jsonDefaultResults = '[{"tag":"ВР", "sp":"Веб-технологии", "link":"http://mospolytech.ru/index.php?id=5315", "per":0, "count":0, "total":0},{"tag":"САПР", "sp":"Интеграция и программирование САПР", "link":"http://mospolytech.ru/index.php?id=5314", "per":0, "count":0, "total":0},{"tag":"ИБ", "sp":"Кибербезопасность новой информационной среды", "link":"http://mospolytech.ru/index.php?id=5313", "per":0, "count":0, "total":0},{"tag":"КС", "sp":"Киберфизические системы", "link":"http://mospolytech.ru/index.php?id=5318", "per":0, "count":0, "total":0},{"tag":"ПИ", "sp":"Корпоративные информационные системы", "link":"http://mospolytech.ru/index.php?id=5316", "per":0, "count":0, "total":0},{"tag":"ИТМ", "sp":"ИТ-менеджмент", "link":"http://mospolytech.ru/index.php?id=5319", "per":0, "count":0, "total":0},{"tag":"ПМиИ", "sp":"Большие и открытые данные", "link":"http://mospolytech.ru/index.php?id=5317", "per":0, "count":0, "total":0}]';
var results;

var setting = {
    name: "static",
    active: false,
    firstTitle: "Ищешь будущую профессию в IT?",
    firstDescription: "поможет тебе в этом непростом выборе. Пройди небольшой тест и узнай какие направления <a class='mainLink' href='https://vk.com/fit.mospolytech'>FIT'a</a> подходят именно тебе!",
    lastTitle: "Ты похож на политеховца ))",
    lastDescription: "Тебе подойдут направления:",
    background: "../img/04.jpg",
    logo: "../img/top_sh.png",
    questions_id: -1,   
    count: 10, 
}
var json = {
    name: "static",
    json: "json/qwestions100.json",
    results: "json/results.json",
}

$.getJSON("/getLastSetting")
.done(function(data){
    if(data.length)
    {	
        setting = data[0];
        console.log( "success load settings - "+setting.name);
        $('#top-1 h3').html(setting.firstTitle);
        $('#top-1 img').attr("src", "media/" + setting.logo);
        $('#top-1 p').html(setting.firstDescription);
        $('#bg').css('background-image', 'url(' + "media/" + setting.background + ')');
    }
})
.fail(function() {
    console.log( "failed load settings");
})
.always(function() {
    if(setting.questions_id+1){
        $.getJSON("/getJson/"+setting.questions_id)
        .done(function(data){
            json = data[0];
            console.log( "success load json information - "+json.name);        
        })
        .always(function() {
            $.getJSON(((setting.questions_id+1)?"media/":"templates/static/") + json.json)
            .done(function(data){
                console.log( "success load json from qwestions file");
                qwestions = data;
            
                qwestions.sort(function(a,b){
                    return Math.round(Math.random())*3-1;
                });
            
            })
            .fail(function() {
                console.log( "failed load json from qwestions file");
                qwestions = JSON.parse(jsonDefaultQwestions);
            })
            .always(function() {
                generateQwestions();
                checkDeviceWidth();
            });
            
            $.getJSON(((setting.questions_id+1)?"media/":"templates/static/") + json.results)
            .done(function(data){
                console.log( "success load json from results file");
                results = data;	
            })
            .fail(function() {
                console.log( "failed load json from results file");
                results = JSON.parse(jsonDefaultResults);
            });
        });
    }

    
});

function getStatistic(){
    $.ajax({
		type: "POST",    
		url: "/sendStatistic/",
		data:{
			referer: document.referrer,
			userAgent: navigator.userAgent,
			results: JSON.stringify(results),
		},
		success: function(arg){ 
			console.log("success upload statistic");
		}
	});
}


$(window).resize(function () {
    $('body').height($('html').height());    
    $('#bg').height($(window).height()+60);
    checkDeviceWidth();
});

function startQwestion(){
	nextQwestion();
}

function nextQwestion(){
	try{
		if(currentQwestion == setting.count-1){
            generateResult();	
            getStatistic()
        }

		$('#container'+currentQwestion).fadeOut(500);
		$('.carousel').carousel('next');
		currentQwestion++;
		$('#container'+currentQwestion).fadeIn(500);
		$('.carousel').carousel('pause');
		checkDeviceWidth();
	}
	catch(error){
		alert("Пожалуйста, нет так быстро! (╯°□°）╯");
		setTimeout(function(){
            $('#container'+currentQwestion).fadeOut(500);
            $('.carousel').carousel('prev');
            currentQwestion--;
            $('#container'+currentQwestion).fadeIn(500);
            $('.carousel').carousel('pause');
            checkDeviceWidth();
        }, 500); 
	}
}

function restarQwestion(){
    location.reload();
}


function showNextButton() {
	//$('.carousel-control-next').prop('hidden', !(currentPage > 0 && currentPage < lastPage));
}
function showPrevButton() {
	//$('.carousel-control-prev').prop('hidden', !(currentPage > 0 && currentPage < lastPage));
}
function checkDeviceWidth() {
	var topHeight = $('#top'+currentQwestion).height();
	var topPosition = $('#top'+currentQwestion).offset().top;
	var bottomHeight = $('#bottom'+currentQwestion).height();
	var bottomPosition = $('#bottom'+currentQwestion).offset().top;

	var bodyChange = $('body').height() + (topPosition + topHeight + 10 - bottomPosition);

	$('body').animate({height: bodyChange}, 500);
}

function choiceClick(e){
    $( this ).toggleClass( "active" );
}

function getQwestion(i, q) {
	var s = "";          
	s+="<div class=\"carousel-item\">	";
    s+="        <div id=\"container"+i+"\" class=\"container\">	";
    s+="          <div class=\"carousel-caption\">	";
    s+="            <div id=\"top"+i+"\" class=\"carousel-caption-top\">	";
    s+="                <h3>Вопрос "+i+".</h3>	";
    s+="                <p id=\"qwestion"+i+"\">"+q.q+"</p>	";
    s+="                    <div id=\"answers"+i+"\" class=\"btn-group-toggle\" data-toggle=\"buttons\" >	";

    for (var j = 0; j < q.as.length; j++) {
        s+="                      <button class=\"btn btn-choice\" data-tag=\""+q.as[j].t+"\" onclick=\"choiceClick()\"> ";
        s+="                        <input type=\"radio\" autocomplete=\"off\"> "+q.as[j].a;
        s+="                      </button>  ";
    }

    s+="                    </div><br>";
    s+="                <button onclick=\"nextQwestion()\" class=\"btn btn-lg btn-answer\">Ответить</button>    ";
    s+="            </div>	";
    s+="            <div id=\"bottom"+i+"\" class=\"carousel-caption-bottom\">	";
    s+="            </div>	";
    s+="          </div>	";
    s+="        </div>	";
    s+="      </div>	";

    return s;
}
function generateQwestions() {
	for (var i = 0; i < setting.count; i++) {
	   $(".carousel-inner").html($(".carousel-inner").html()+getQwestion(i, qwestions[i]));
	   $(".carousel-indicators").html($(".carousel-indicators").html()+"<li data-target=\"#carousel\" data-slide-to=\""+(i+1)+"\"></li>");
    }
    $(".carousel-indicators").html($(".carousel-indicators").html()+"<li data-target=\"#carousel\" data-slide-to=\""+(setting.count+1)+"\"></li>");
}

function getResult(){
	var s = "";
	s+="      <div class=\"carousel-item\">";
    s+="        <div id=\"container"+setting.count+"\" class=\"container\">";
    s+="          <div class=\"carousel-caption\">";
    s+="            <div id=\"top"+setting.count+"\" class=\"carousel-caption-center\">";
    s+="                <h3>"+setting.lastTitle+"</h3>";
    //s+="                <img src=\"img/men2.png\" onload=\"checkDeviceWidth()\">";
    s+="                <p>"+setting.lastDescription+"</p>";

    if(results[0].per.toFixed() == 0){
        s+="                  <a href=\"https://vk.com/mpu_overhear\"> Никакие! Ахахахах >_<</a>";          
    }
    else
    {
        var i = 0;
        do {
            s+="                  <a href=\""+results[i].link+"\" target=\"_blank\"> <li>"+results[i].sp+" - "+results[i].per.toFixed()+"%</li></a>";
            i++;

        } while(results[i].per.toFixed() >= 30)
        s+="                <text style=\"font-size: 0.8rem;\"> Нажми чтобы узнать подробнее</text>";
    }
    
    s+="                <div class=\"share-block\">";
    s+="				    <h5> Поделись этим тестом </h5>";
    s+="                    <button type=\"button\" class=\"btn btn-share\" onclick=\"share('vk')\"><i class=\"fa fa-2x fa-vk\"></i></button>";
	s+="				    <button type=\"button\" class=\"btn btn-share\" onclick=\"share('fb')\"><i class=\"fa fa-2x fa-facebook\"></i> </button>";
	s+="				    <button type=\"button\" class=\"btn btn-share\" onclick=\"share('tw')\"><i class=\"fa fa-2x fa-twitter\"></i> </button>";
	//s+="			        <button type=\"button\" class=\"btn btn-share\" onclick=\"share('gp')\"><i class=\"fa fa-google-plus\"></i> </button>";
    s+="                </div>";

    s+="            </div>";
    s+="            <div id=\"bottom"+setting.count+"\" class=\"carousel-caption-bottom\">";
    s+="                <button onclick=\"restarQwestion()\" class=\"btn btn-lg btn-answer\">Ещё раз</button>";
    s+="            </div>";
    s+="          </div>";
    s+="        </div>";
    s+="      </div>";

    return s;
}
function generateResult(){

	$('.btn-choice').each(function (i, e) {
		for(var i = 0; i < results.length; i++){
	    	if($(e).data("tag") == results[i].tag){
                results[i].total++;
                if($(e).hasClass("active"))
	    		    results[i].count++;
            }
		}        
    });
 
    for(var i = 0; i < results.length; i++){
        results[i].per = (results[i].count / results[i].total)*100;
    }     

    results.sort(function(a,b){
   	if(a.per < b.per){ return 1}
    	if(a.per > b.per){ return -1}
      		return 0;
	});

    $(".carousel-inner").html($(".carousel-inner").html() + getResult());
}

function share(social){
    var url_share = location.href;
    var url_soc = false;
    switch (social) {
        case "vk":
            url_soc = "https://vk.com/share.php?url="+url_share;
            break;
        case "fb":
            url_soc = "https://www.facebook.com/sharer/sharer.php?u="+url_share;
            break;
        case "ok":
            url_soc = "https://connect.ok.ru/offer?url="+url_share;
            break;
        case "tw":
            url_soc = "https://twitter.com/intent/tweet?url="+url_share;
            break;
        case "gp":
            url_soc = "https://plus.google.com/share?url="+url_share;
            break;
    }
     
    // открытие нового окна для шаринга
    if(url_soc){
        // размеры окна
        var width = 800, height = 500;
        // центруем окно
        var left = (window.screen.width - width) / 2;
        var top = (window.screen.height - height) / 2;
        // открываем окно
        social_window = window.open(url_soc, "share_window", "height=" + height + ",width=" + width + ",top=" + top + ",left=" + left);
        // устанавливаем на окно фокус
        social_window.focus();
    }
}