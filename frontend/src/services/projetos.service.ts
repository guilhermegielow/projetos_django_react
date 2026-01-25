import { apiFetch } from "./api";
import type { Projeto } from "../types/Projeto";

export function listarProjetos(): Promise<Projeto[]> {
  return apiFetch<Projeto[]>("/projetos");
}

export function criarProjeto(data: Partial<Projeto>) {
  return apiFetch<Projeto>("/projetos/", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function editarProjeto(id: number, data: Partial<Projeto>) {
  return apiFetch<Projeto>(`/projetos/${id}/`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export function excluirProjeto(id: number) {
  return apiFetch<void>(`/projetos/${id}/`, {
    method: "DELETE",
  });
}
