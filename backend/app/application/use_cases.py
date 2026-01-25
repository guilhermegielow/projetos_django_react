from domain.entities import Cliente, Projeto, Atividade, StatusProjeto

class ClienteUseCase:
    def __init__(self, repo):
        self.repo = repo

    def criar(self, cliente: Cliente):
        return self.repo.save(cliente)

    def listar(self):
        return self.repo.list()