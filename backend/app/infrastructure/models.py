from django.db import models

class ClienteModel(models.Model):
    nome = models.CharField(max_length=255)
    email = models.EmailField(unique=True, error_messages={
            "unique": "Já existe um cliente cadastrado com este e-mail."})
    telefone = models.CharField(max_length=20)
    cnpj = models.CharField(unique=True, max_length=20, error_messages={
            "unique": "Já existe um cliente cadastrado com este CNPJ."
        })

    class Meta:
        db_table = "clientes"

class StatusProjetoModel(models.Model):
    nome = models.CharField(max_length=100)

    class Meta:
        db_table = "status_projeto"

class ProjetoModel(models.Model):
    nome = models.CharField(max_length=255)
    descricao = models.TextField()
    cliente = models.ForeignKey(ClienteModel, on_delete=models.CASCADE)
    status_projeto = models.ForeignKey(StatusProjetoModel, on_delete=models.SET_NULL, null=True)

    class Meta:
        db_table = "projetos"

class AtividadeModel(models.Model):
    descricao = models.TextField()
    data = models.DateTimeField()
    projeto = models.ForeignKey(ProjetoModel, on_delete=models.CASCADE)

    class Meta:
        db_table = "atividades"
