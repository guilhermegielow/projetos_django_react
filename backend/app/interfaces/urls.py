from django.urls import path
from .views import (
    ClienteListCreate, ClienteDetail,
    StatusProjetoListCreate, StatusProjetoDetail,
    ProjetoListCreate, ProjetoDetail,
    AtividadeListCreate, AtividadeDetail
)

urlpatterns = [
    # Clientes
    path("clientes/", ClienteListCreate.as_view(), name="cliente-list-create"),
    path("clientes/<int:pk>/", ClienteDetail.as_view(), name="cliente-detail"),

    # Status Projeto
    path("status-projetos/", StatusProjetoListCreate.as_view(), name="status-list-create"),
    path("status-projetos/<int:pk>/", StatusProjetoDetail.as_view(), name="status-detail"),

    # Projetos
    path("projetos/", ProjetoListCreate.as_view(), name="projeto-list-create"),
    path("projetos/<int:pk>/", ProjetoDetail.as_view(), name="projeto-detail"),

    # Atividades
    path("atividades/", AtividadeListCreate.as_view(), name="atividade-list-create"),
    path("atividades/<int:pk>/", AtividadeDetail.as_view(), name="atividade-detail"),
]
