from django.contrib import admin
from .models import Setting, Json, Statistic
from django.utils.html import format_html
from django.urls import path
from django.template.response import TemplateResponse
# Register your models here.


@admin.register(Statistic)
class StatisticAdmin(admin.ModelAdmin):
    change_list_template = "admin/statistic_change_list.html"

@admin.register(Setting)
class SettingAdmin(admin.ModelAdmin):
    fieldsets = (
        (None, {
            'fields': (('name', 'active'), ('questions', 'count'))
        }),
        ('Расширенная настройка', {
            'classes': ('collapse',),
            'fields': ('firstTitle', 'firstDescription','lastTitle','lastDescription','background','logo'),
        }),
    )
    list_display = ('__str__', 'active', 'questions', 'count')
    list_editable = ['active']

@admin.register(Json)
class JsonAdmin(admin.ModelAdmin):
    list_display = ('__str__', 'qb_button')
    def qb_button(self, obj):
        return format_html('<a class="button" href="/admin/careerGuidance/json/new/'+str(obj.pk)+'/">Открыть</a>')
    qb_button.short_description = ''
    qb_button.allow_tags = True

    change_form_template = "admin/json_change_form.html"
    add_form_template = "admin/json_add_form.html"

    def change_view(self, request, object_id, form_url='', extra_context=None):
        return super(JsonAdmin, self).change_view(request, object_id, form_url, extra_context=extra_context,)

    def get_urls(self):
        urls = super(JsonAdmin, self).get_urls()
        
        _urls = [ path('new/<int:id>/', self.admin_site.admin_view(self.new_json)) ]
        return _urls + urls

    # Your view definition fn
    def new_json(self, request, id):
        context = dict(
           # Include common variables for rendering the admin template.
           self.admin_site.each_context(request),           
            opts = Json._meta,
            is_new = True
        )
        return TemplateResponse(request, "admin/json_add_form.html", context)