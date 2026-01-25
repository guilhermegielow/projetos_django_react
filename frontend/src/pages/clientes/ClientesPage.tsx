import { useEffect, useState } from "react";
import {
  Table, TableHead, TableRow, TableCell, TableBody,
  Paper, IconButton, Button, Typography
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  listarClientes, criarCliente, editarCliente, excluirCliente
} from "../../services/clientes.service";

import type { Cliente } from "../../types/Cliente";
import { ClienteDialog } from "./ClienteDialog";

export function ClientesPage() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [open, setOpen] = useState(false);
  const [editando, setEditando] = useState<Cliente | undefined>();

  const carregar = async () => {
    setClientes(await listarClientes());
  };

  useEffect(() => { carregar(); }, []);

  const salvar = async (data: any) => {
    editando
      ? await editarCliente(editando.id, data)
      : await criarCliente(data);

    setOpen(false);
    setEditando(undefined);
    carregar();
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Clientes
      </Typography>

      <Button variant="contained" onClick={() => setOpen(true)}>
        Novo Cliente
      </Button>

      <Table sx={{ mt: 2 }}>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Telefone</TableCell>
            <TableCell>CNPJ</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {clientes.map(c => (
            <TableRow key={c.id}>
              <TableCell>{c.nome}</TableCell>
              <TableCell>{c.email}</TableCell>
              <TableCell>{c.telefone}</TableCell>
              <TableCell>{c.cnpj}</TableCell>
              <TableCell>
                <IconButton onClick={() => { setEditando(c); setOpen(true); }}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => excluirCliente(c.id).then(carregar)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <ClienteDialog
        open={open}
        onClose={() => { setOpen(false); setEditando(undefined); }}
        onSave={salvar}
        cliente={editando}
      />
    </Paper>
  );
}
