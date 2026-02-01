from datetime import datetime

from rest_framework import serializers
from .models import *

class ClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClienteModel
        fields = "__all__"

class StatusProjetoSerializer(serializers.ModelSerializer):
    class Meta:
        model = StatusProjetoModel
        fields = "__all__"

class ProjetoSerializer(serializers.ModelSerializer):
    cliente_nome = serializers.CharField(
        source="cliente.nome",
        read_only=True
    )
    cliente_email = serializers.CharField(
        source="cliente.email",
        read_only=True
    )
    status_projeto_nome = serializers.CharField(
        source="status_projeto.nome",
        read_only=True
    )
    cliente_id = serializers.PrimaryKeyRelatedField(
        queryset=ClienteModel.objects.all(),
        source="cliente",
        required=True
    )

    status_projeto_id = serializers.PrimaryKeyRelatedField(
        queryset=StatusProjetoModel.objects.all(),
        source="status_projeto",
        required=False,
        allow_null=True
    )
    class Meta:
        model = ProjetoModel
        fields =  [
            "id",
            "nome",
            "descricao",
            "cliente_id",
            "cliente_nome",
            "cliente_email",
            "status_projeto",
            "status_projeto_nome",
            "status_projeto_id"
        ]



class AtividadeSerializer(serializers.ModelSerializer):
    projeto_id = serializers.PrimaryKeyRelatedField(
        source="projeto",
        queryset=ProjetoModel.objects.all()
    )

    projeto_nome = serializers.CharField(
        source="projeto.nome",
        read_only=True
    )

    cliente_nome = serializers.CharField(
        source="projeto.cliente.nome",
        read_only=True
    )
    data = serializers.CharField()

    def create(self, validated_data):
        validated_data["data"] = datetime.fromisoformat(
            validated_data["data"]
        )
        return super().create(validated_data)

    def update(self, instance, validated_data):
        validated_data["data"] = datetime.fromisoformat(
            validated_data["data"]
        )
        return super().update(instance, validated_data)

    class Meta:
        model = AtividadeModel
        fields = [
            "id",
            "descricao",
            "data",
            "projeto_id",
            "projeto_nome",
            "cliente_nome",
        ]

