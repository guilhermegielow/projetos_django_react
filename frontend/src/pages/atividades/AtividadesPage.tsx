import { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  listarAtividades,
  criarAtividade,
  editarAtividade,
  excluirAtividade
} from "../../services/atividades.service";

import { listarProjetos } from "../../services/projetos.service";

import type { Atividade } from "../../types/Atividade";
import type { Projeto } from "../../types/Projeto";

import { AtividadeDialog } from "./AtividadeDialog";

export function AtividadesPage() {
  const [atividades, setAtividades] = useState<Atividade[]>([]);
  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [open, setOpen] = useState(false);
  const [editando, setEditando] = useState<Atividade | undefined>();

  const carregar = async () => {
    setAtividades(await listarAtividades());
    setProjetos(await listarProjetos());
  };

  useEffect(() => {
    carregar();
  }, []);

  const salvar = async (data: any) => {
    const isEdit = !!editando?.id;

    if (isEdit) {
      await editarAtividade(editando!.id!, data);
    } else {
      await criarAtividade(data);
    }

    setOpen(false);
    setEditando(undefined);
    carregar();
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Atividades
      </Typography>

      <Button
        variant="contained"
        onClick={() => {
          setEditando(undefined); // 🔥
          setOpen(true);
        }}
      >
        Nova Atividade
      </Button>

      <Table sx={{ mt: 2 }}>
        <TableHead>
          <TableRow>
            <TableCell>Descrição</TableCell>
            <TableCell>Data</TableCell>
            <TableCell>Projeto</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {atividades.map(a => (
            <TableRow key={a.id}>
              <TableCell>{a.descricao}</TableCell>
              <TableCell>
                {new Date(a.data).toLocaleString()}
              </TableCell>
              <TableCell>{a.projeto_nome}</TableCell>

              <TableCell>
                <IconButton
                  onClick={() => {
                    setEditando(a);
                    setOpen(true);
                  }}
                >
                  <EditIcon />
                </IconButton>

                <IconButton
                  onClick={() =>
                    excluirAtividade(a.id!).then(carregar)
                  }
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <AtividadeDialog
        open={open}
        onClose={() => {
          setOpen(false);
          setEditando(undefined); // 🔥
        }}
        onSave={salvar}
        projetos={projetos}
        atividade={editando}
      />
    </Paper>
  );
}
