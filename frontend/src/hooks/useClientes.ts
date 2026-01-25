import { useEffect, useState } from "react";
import { ClientesService } from "../services/clientes.service";
import type { Cliente } from "../types/Cliente";

export function useClientes() {
  const [clientes, setClientes] = useState<Cliente[]>([]);

  async function carregar() {
    setClientes(await ClientesService.listar());
  }

  useEffect(() => {
    carregar();
  }, []);

  return { clientes, reload: carregar };
}
