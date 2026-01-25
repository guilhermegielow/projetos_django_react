export const listarStatusProjeto = async () =>
  fetch("http://127.0.0.1:8000/api/status-projetos/").then(r => r.json());
