from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404

from app.infrastructure.models import ClienteModel, ProjetoModel, AtividadeModel, StatusProjetoModel
from app.infrastructure.serializers import ClienteSerializer, ProjetoSerializer, AtividadeSerializer, StatusProjetoSerializer


# ----------------------
# CLIENTES
# ----------------------
class ClienteListCreate(APIView):
    def get(self, request):
        clientes = ClienteModel.objects.all()
        serializer = ClienteSerializer(clientes, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ClienteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ClienteDetail(APIView):
    def get(self, request, pk):
        cliente = get_object_or_404(ClienteModel, pk=pk)
        serializer = ClienteSerializer(cliente)
        return Response(serializer.data)

    def put(self, request, pk):
        cliente = get_object_or_404(ClienteModel, pk=pk)
        serializer = ClienteSerializer(cliente, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        cliente = get_object_or_404(ClienteModel, pk=pk)
        cliente.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# ----------------------
# STATUS PROJETO
# ----------------------
class StatusProjetoListCreate(APIView):
    def get(self, request):
        status_projetos = StatusProjetoModel.objects.all()
        serializer = StatusProjetoSerializer(status_projetos, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = StatusProjetoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class StatusProjetoDetail(APIView):
    def get(self, request, pk):
        status_projeto = get_object_or_404(StatusProjetoModel, pk=pk)
        serializer = StatusProjetoSerializer(status_projeto)
        return Response(serializer.data)

    def put(self, request, pk):
        status_projeto = get_object_or_404(StatusProjetoModel, pk=pk)
        serializer = StatusProjetoSerializer(status_projeto, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        status_projeto = get_object_or_404(StatusProjetoModel, pk=pk)
        status_projeto.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# ----------------------
# PROJETOS
# ----------------------
class ProjetoListCreate(APIView):
    def get(self, request):
        projetos = ProjetoModel.objects.all()
        serializer = ProjetoSerializer(projetos, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ProjetoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ProjetoDetail(APIView):
    def get(self, request, pk):
        projeto = get_object_or_404(ProjetoModel, pk=pk)
        serializer = ProjetoSerializer(projeto)
        return Response(serializer.data)

    def put(self, request, pk):
        projeto = get_object_or_404(ProjetoModel, pk=pk)
        serializer = ProjetoSerializer(projeto, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        projeto = get_object_or_404(ProjetoModel, pk=pk)
        projeto.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# ----------------------
# ATIVIDADES
# ----------------------
class AtividadeListCreate(APIView):
    def get(self, request):
        atividades = AtividadeModel.objects.all()
        serializer = AtividadeSerializer(atividades, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = AtividadeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AtividadeDetail(APIView):
    def get(self, request, pk):
        atividade = get_object_or_404(AtividadeModel, pk=pk)
        serializer = AtividadeSerializer(atividade)
        return Response(serializer.data)

    def put(self, request, pk):
        atividade = get_object_or_404(AtividadeModel, pk=pk)
        serializer = AtividadeSerializer(atividade, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        atividade = get_object_or_404(AtividadeModel, pk=pk)
        atividade.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

