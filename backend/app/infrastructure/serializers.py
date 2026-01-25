from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from .models import *

class ClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClienteModel
        fields = "__all__"
        extra_kwargs = {
            'cnpj': {
                'validators': [
                    UniqueValidator(
                        queryset=ClienteModel.objects.all(),
                        message="Já existe um cliente cadastrado com este CNPJ."
                    )
                ]
            },
            'email': {
                'validators': [
                    UniqueValidator(
                        queryset=ClienteModel.objects.all(),
                        message="Já existe um cliente cadastrado com este e-mail."
                    )
                ]
            }
        }

    def validate_email(self, value):
        if ClienteModel.objects.filter(email=value).exists():
            raise serializers.ValidationError(
                "Já existe um cliente com este e-mail."
            )
        return value

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

