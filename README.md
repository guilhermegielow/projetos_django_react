# Projeto CRUD com Django, Django REST Framework e React

Este projeto é uma aplicação **CRUD profissional** baseada em **Clean Architecture** e **microserviços**, utilizando **Django + Django REST Framework** no backend e **React** no frontend. Ele permite gerenciar **Clientes**, **Projetos**, **Atividades** e **Status de Projeto**, com foco em **boas práticas**, **manutenibilidade**, **testabilidade** e **escalabilidade**.

O projeto é uma evolução arquitetural do CRUD original em Vue.js + Flask, agora alinhado com padrões utilizados em ambientes corporativos.

---

## Tecnologias Utilizadas

### Backend (API) – Python

* **Python**: 3.11+
* **Django**: 4.2+
* **Django REST Framework**: 3.14+
* **psycopg2-binary**: Integração com PostgreSQL
* **pytest**: Testes automatizados
* **flake8**: Qualidade de código (PEP 8)

### Frontend – React

* **React**: 18+
* **TypeScript**: Tipagem estática
* **Fetch API**: Comunicação com o backend

### Banco de Dados

* **PostgreSQL**: Persistência dos dados

### DevOps

* **Docker**
* **Docker Compose**

---

## Arquitetura do Projeto

O backend segue os princípios de **Clean Architecture** e **SOLID**, com separação clara de responsabilidades:

```
backend/
├── app/
│   ├── domain/          # Entidades e regras de negócio
│   ├── application/     # Casos de uso
│   ├── infrastructure/  # Django ORM e banco de dados
│   ├── interfaces/      # API REST (views e serializers)
│   └── tests/           # Testes unitários
```

### Padrões Aplicados

* SOLID
* Clean Code
* Repository Pattern
* Service / Use Case Layer
* Dependency Inversion
* DTOs

---

## Diagrama de Classes

```
+-------------------+           +-------------------+          +-------------------+
|     Atividade     |           |      Cliente      |          |      Projeto      |
+-------------------+           +-------------------+          +-------------------+
| - id: integer     |           | - id: integer     |          | - id: integer     |
| - descricao: text |           | - nome: string    |          | - nome: string    |
| - data: timestamp |           | - email: string   |          | - descricao: text |
| - projeto_id: int | --------> | - telefone: string| <------->| - cliente_id: int |
+-------------------+           | - cnpj: string    |          | - status_projeto_id|
                                +-------------------+          +-------------------+
                                                              |    ^
                                                              |    |
                                                     +------------------------+
                                                     |    StatusProjeto       |
                                                     +------------------------+
                                                     | - id: integer          |
                                                     | - nome: string         |
                                                     +------------------------+
```

---

## Instalação e Execução

### Pré-requisitos

* Docker e Docker Compose
* Node.js 18+

---

### Backend (Django + DRF)

1. Acesse a pasta do backend:

```bash
cd backend
```

2. Crie o ambiente virtual:

```bash
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
```

3. Instale as dependências:

```bash
pip install -r requirements.txt
```

4. Execute as migrações:

```bash
python manage.py migrate
```

5. Inicie o servidor:

```bash
python manage.py runserver
```

A API estará disponível em:

```
http://localhost:8000
```

---

### Frontend (React)

1. Acesse a pasta do frontend:

```bash
cd frontend
```

2. Instale as dependências:

```bash
npm install
```

3. Inicie a aplicação:

```bash
npm start
```

---

## Testes

### Executar testes unitários

```bash
pytest
```

### Cobertura de testes

```bash
pytest --cov=app --cov-report=html
```

---

## Qualidade de Código

### Verificação PEP 8

```bash
flake8 backend/app
```

### PEPs aplicadas

* **PEP 8** – Estilo de código
* **PEP 257** – Docstrings
* **PEP 484** – Type Hints

---

## Banco de Dados (PostgreSQL)

O projeto utiliza PostgreSQL. Em ambiente Docker, o banco é criado automaticamente.

Modelo lógico baseado no diagrama apresentado.

---

## Benefícios da Arquitetura

* Código desacoplado
* Alta testabilidade
* Fácil manutenção
* Pronto para microserviços
* Ideal para portfólio profissional

---

## Evoluções Futuras

* Separação completa em microserviços
* API Gateway
* Autenticação JWT
* CI/CD
* Deploy em cloud (AWS, Render, Railway)

---

## Autor

Projeto desenvolvido por **Guilherme Gielow**

Arquitetura, Clean Code e padrões voltados ao mercado profissional.
