import { useEffect, useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  IconButton,
  Button,
  Typography
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  listarProjetos,
  criarProjeto,
  editarProjeto,
  excluirProjeto
} from "../../services/projetos.service";
import { listarClientes } from "../../services/clientes.service";
import { listarStatusProjeto } from "../../services/statusProjeto.service";

import type { Projeto } from "../../types/Projeto";
import type { Cliente } from "../../types/Cliente";
import type { StatusProjeto } from "../../types/StatusProjeto";
import { ProjetoDialog } from "./ProjetoDialog";

export function ProjetosPage() {
  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [status, setStatus] = useState<StatusProjeto[]>([]);
  const [open, setOpen] = useState(false);
  const [editando, setEditando] = useState<Projeto | undefined>();

  const carregar = async () => {
    const [projetosData, clientesData, statusData] = await Promise.all([
      listarProjetos(),
      listarClientes(),
      listarStatusProjeto(),
    ]);

    setProjetos(projetosData);
    setClientes(clientesData);
    setStatus(statusData);
  };

  useEffect(() => {
    carregar();
  }, []);

  const salvar = async (data: any) => {
    const payload = {
      nome: data.nome,
      descricao: data.descricao,
      cliente_id: data.cliente_id,
      status_projeto: data.status_projeto,
    };

    console.log("PAYLOAD:", payload);

    if (!payload.cliente_id) {
      alert("Cliente é obrigatório");
      return;
    }

    if (editando) {
      await editarProjeto(editando.id, payload);
    } else {
      await criarProjeto(payload);
    }

    setOpen(false);
    setEditando(undefined);
    carregar();
  };

  const handleEditar = (p: Projeto) => {
    setEditando({
      id: p.id,
      nome: p.nome,
      descricao: p.descricao,
      cliente_id: p.cliente_id,
      status_projeto: p.status_projeto,
    });

    setOpen(true);
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Projetos
      </Typography>

      <Button
        variant="contained"
        onClick={() => {
          setEditando(undefined);
          setOpen(true);
        }}
      >
        Novo Projeto
      </Button>

      <Table sx={{ mt: 2 }}>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Descrição</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {projetos.map(p => (
            <TableRow key={p.id}>
              <TableCell>{p.nome}</TableCell>
              <TableCell>{p.descricao}</TableCell>
              <TableCell>{p.status_projeto_nome}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleEditar(p)}>
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={async () => {
                    await excluirProjeto(p.id);
                    carregar();
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <ProjetoDialog
        open={open}
        onClose={() => {
          setOpen(false);
          setEditando(undefined);
        }}
        onSave={salvar}
        clientes={clientes}
        status={status}
        projeto={editando}
      />
    </Paper>
  );
}
