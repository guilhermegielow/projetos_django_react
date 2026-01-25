from dataclasses import dataclass
from datetime import datetime

@dataclass
class Cliente:
    id: int | None
    nome: str
    email: str
    telefone: str
    cnpj: str

@dataclass
class StatusProjeto:
    id: int | None
    nome: str

@dataclass
class Projeto:
    id: int | None
    nome: str
    descricao: str
    cliente_id: int
    status_projeto_id: int

@dataclass
class Atividade:
    id: int | None
    descricao: str
    data: datetime
    projeto_id: int