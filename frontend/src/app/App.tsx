import { ClientesPage } from "../pages/clientes/ClientesPage";
import { ProjetosPage } from "../pages/projetos/ProjetosPage";
import { AtividadesPage } from "../pages/atividades/AtividadesPage";

export default function App() {
  return (
    <div style={{ maxWidth: 900, margin: "0 auto" }}>
      <h1>Sistema de Projetos</h1>
      <ClientesPage />
      <hr />
      <ProjetosPage />
      <hr />
      <AtividadesPage />
    </div>
  );
}
