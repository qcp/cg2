import json
import csv
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from .models import Setting, Json, Statistic
from django.http import HttpResponse
from django.core.files.base import ContentFile
import datetime

res = '[{"tag":"ВР", "sp":"Веб-технологии", "link":"http://mospolytech.ru/index.php?id=5315", "per":0, "count":0, "total":0},{"tag":"САПР", "sp":"Интеграция и программирование САПР", "link":"http://mospolytech.ru/index.php?id=5314", "per":0, "count":0, "total":0},{"tag":"ИБ", "sp":"Кибербезопасность новой информационной среды", "link":"http://mospolytech.ru/index.php?id=5313", "per":0, "count":0, "total":0},{"tag":"КС", "sp":"Киберфизические системы", "link":"http://mospolytech.ru/index.php?id=5318", "per":0, "count":0, "total":0},{"tag":"ПИ", "sp":"Корпоративные информационные системы", "link":"http://mospolytech.ru/index.php?id=5316", "per":0, "count":0, "total":0},{"tag":"ИТМ", "sp":"ИТ-менеджмент", "link":"http://mospolytech.ru/index.php?id=5319", "per":0, "count":0, "total":0},{"tag":"ПМиИ", "sp":"Большие и открытые данные", "link":"http://mospolytech.ru/index.php?id=5317", "per":0, "count":0, "total":0}]'

def cgIndex(request):
    return render(request, 'careerGuidance.html')

def getLastSetting(request):
    response = list(Setting.objects.filter(active = True).values())
    return HttpResponse(json.dumps(response), content_type="application/json")

def getSetting(request, id):
    response = list(Setting.objects.filter(id = id).values())
    return HttpResponse(json.dumps(response), content_type="application/json")

@csrf_exempt
def sendStatistic(request):
    if request.method == 'POST':
        rf = request.POST.get("referer")
        ua = request.POST.get("userAgent")
        rs = request.POST.get("results")
        st = Statistic.objects.create( referer = rf, userAgent=ua, results=rs )
        st.save()
        return HttpResponse(status=200)
    else:
        return HttpResponse(status=404)

@login_required
def exportStatistic(request):
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="statistic.csv"'

    writer = csv.writer(response, csv.excel)
    response.write(u'\ufeff'.encode('utf8'))
    writer.writerow(['referer', 'userAgent', 'time', 'results'])

    stats = Statistic.objects.all().values_list('referer', 'userAgent', 'time', 'results')
    for stat in stats:
        writer.writerow(stat)

    return response

def getAllJson(request):
    response = list(Json.objects.values())
    return HttpResponse(json.dumps(response), content_type="application/json")

@login_required
def setJson(request):
    if request.method == 'POST':
        # путь уже содержит папку, нужно брать только название файла, тогда папка не будет дублироваться
        json = Json.objects.create( name = str(str(datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')+" - "+request.POST.get("name"))) )
        json.json.save(request.POST.get("json_name"), ContentFile(request.POST.get("json").encode('utf-8')))
        json.results.save(request.POST.get("results_name"), ContentFile(res.encode('utf-8')))
        json.save()
        return HttpResponse(status=200)
    else:
        return HttpResponse(status=404)

def getJson(request, id):
    response = list(Json.objects.filter(id = id).values())
    return HttpResponse(json.dumps(response), content_type="application/json")

@login_required
def qbIndex(request):
    return render(request, 'qwestionsBuilder.html')


