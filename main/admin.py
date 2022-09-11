from django.contrib import admin
# from .models import Reviews,RequestCall,Service,FormRequest,FormWrite
from django.utils.safestring import mark_safe

from .models import Repair_Request, Repair_Request_Photo, Services,Reviews,Photo


class Repair_RequestAdmin(admin.ModelAdmin):
    list_display = ['name', 'phone']
    list_filter = ['phone']
    readonly_fields = ['preview']

    def preview(self, obj):
        return "Hello"

class Repair_Request_PhotoAdmin(admin.ModelAdmin):
    list_display = ['name', 'phone']
    readonly_fields = ['preview']


    def preview(self, obj):
        return mark_safe(f'<img src="{obj.img1.url}" style = "max-height: 200px;">')

class PhotoAdmin(admin.ModelAdmin):
    readonly_fields = ['preview']

    def preview(self, obj):
        return mark_safe(f'<img src="{obj.photo1.url}" style = "max-height: 200px;"><img src="{obj.photo2.url}" style = "max-height: 200px;">')

admin.site.register(Photo,PhotoAdmin)
admin.site.register(Reviews)
admin.site.register(Services)
admin.site.register(Repair_Request,Repair_RequestAdmin)
admin.site.register(Repair_Request_Photo, Repair_Request_PhotoAdmin)

#
# class ReviewsAdmin(admin.ModelAdmin):
#     list_display = ['name_review', 'review', 'date_pub_review']
#     prepopulated_fields = {'slug': ('name_review',)}

#
#
# admin.site.register(Reviews,ReviewsAdmin)
# admin.site.register(RequestCall)
# admin.site.register(Service)
# admin.site.register(FormRequest)
# admin.site.register(FormWrite)
#
