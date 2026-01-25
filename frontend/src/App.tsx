import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Clientes from "./pages/Clientes";
import Projetos from "./pages/Projetos";
import Atividades from "./pages/Atividades";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/projetos" element={<Projetos />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

