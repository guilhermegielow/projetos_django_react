export interface Projeto {
  id: number;
  nome: string;
  descricao: string;

  cliente_id: number;
  cliente_nome?: string;
  cliente_email?: string;

  status_projeto: number | null;
  status_projeto_nome?: string;
}
