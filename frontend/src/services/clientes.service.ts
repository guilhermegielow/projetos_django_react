import { apiFetch } from "./api";
import type { Cliente } from "../types/Cliente";

export function listarClientes(): Promise<Cliente[]> {
  return apiFetch<Cliente[]>("/clientes");
}

export function criarCliente(cliente: Partial<Cliente>) {
  return apiFetch<Cliente>("/clientes/", {
    method: "POST",
    body: JSON.stringify(cliente),
  });
}

export function editarCliente(id: number, cliente: Partial<Cliente>) {
  return apiFetch<Cliente>(`/clientes/${id}/`, {
    method: "PUT",
    body: JSON.stringify(cliente),
  });
}

export function excluirCliente(id: number) {
  return apiFetch<void>(`/clientes/${id}/`, {
    method: "DELETE",
  });
}
