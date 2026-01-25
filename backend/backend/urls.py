from django.urls import path, include
urlpatterns = [path("api/", include("app.interfaces.urls"))]
