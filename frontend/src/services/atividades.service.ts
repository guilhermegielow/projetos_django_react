import { apiFetch } from "./api";
import type { Atividade } from "../types/Atividade";

export function listarAtividades(): Promise<Atividade[]> {
  return apiFetch<Atividade[]>("/atividades/");
}

export function criarAtividade(atividade: Partial<Atividade>) {
  return apiFetch<Atividade>("/atividades/", {
    method: "POST",
    body: JSON.stringify(atividade),
  });
}

export function editarAtividade(id: number, atividade: Partial<Atividade>) {
  return apiFetch<Atividade>(`/atividades/${id}/`, {
    method: "PUT",
    body: JSON.stringify(atividade),
  });
}

export function excluirAtividade(id: number) {
  return apiFetch<void>(`/atividades/${id}/`, {
    method: "DELETE",
  });
}
