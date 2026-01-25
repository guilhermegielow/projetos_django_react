from domain.entities import Cliente

def test_cliente():
    cliente = Cliente(1, "Teste", "a@a.com", "9999", "000")
    assert cliente.nome == "Teste"