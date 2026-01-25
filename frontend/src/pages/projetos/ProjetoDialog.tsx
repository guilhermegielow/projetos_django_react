import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@mui/material";
import { useEffect, useState } from "react";

import type { Cliente } from "../../types/Cliente";
import type { StatusProjeto } from "../../types/StatusProjeto";
import type { Projeto } from "../../types/Projeto";

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  clientes: Cliente[];
  status: StatusProjeto[];
  projeto?: Projeto;
}

const emptyForm = {
  nome: "",
  descricao: "",
  cliente_id: null as number | null,
  status_projeto: null as number | null,
};

export function ProjetoDialog({
  open,
  onClose,
  onSave,
  clientes,
  status,
  projeto
}: Props) {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (open) {
      setForm({
        nome: projeto?.nome ?? "",
        descricao: projeto?.descricao ?? "",
        cliente_id: projeto?.cliente_id ?? null,
        status_projeto: projeto?.status_projeto ?? null,
      });
    }
  }, [open, projeto]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>
        {projeto ? "Editar Projeto" : "Novo Projeto"}
      </DialogTitle>

      <DialogContent
        sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
      >
        <TextField
          label="Nome"
          value={form.nome}
          onChange={e => setForm({ ...form, nome: e.target.value })}
          fullWidth
        />

        <TextField
          label="Descrição"
          value={form.descricao}
          onChange={e => setForm({ ...form, descricao: e.target.value })}
          fullWidth
          multiline
          rows={3}
        />

        <FormControl fullWidth>
          <InputLabel>Cliente</InputLabel>
          <Select
            value={form.cliente_id ?? ""}
            label="Cliente"
            onChange={e =>
              setForm({
                ...form,
                cliente_id: Number(e.target.value),
              })
            }
          >
            {clientes.map(c => (
              <MenuItem key={c.id} value={c.id}>
                {c.nome} - {c.email}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Status</InputLabel>
          <Select
            value={form.status_projeto ?? ""}
            label="Status"
            onChange={e =>
              setForm({
                ...form,
                status_projeto: Number(e.target.value),
              })
            }
          >
            {status.map(s => (
              <MenuItem key={s.id} value={s.id}>
                {s.nome}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button variant="contained" onClick={() => onSave(form)}>
        {console.log("FORM NO DIALOG:", form)}
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
