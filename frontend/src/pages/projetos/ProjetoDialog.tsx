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

import { listarClientes } from "../../services/clientes.service";
import { listarStatusProjeto } from "../../services/statusProjeto.service";

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (data: Projeto) => Promise<void>;
  projeto?: Projeto;
}

const emptyForm: Projeto = {
  id: undefined,
  nome: "",
  descricao: "",
  cliente_id: null,
  status_projeto: null,
};

export function ProjetoDialog({ open, onClose, onSave, projeto }: Props) {
  const [form, setForm] = useState<Projeto>(emptyForm);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [status, setStatus] = useState<StatusProjeto[]>([]);

  useEffect(() => {
    if (!open) return;

    // 🔥 sempre atualiza listas ao abrir
    Promise.all([
      listarClientes(),
      listarStatusProjeto()
    ]).then(([clientesData, statusData]) => {
      setClientes(clientesData);
      setStatus(statusData);
    });

    setForm({
      id: projeto?.id,
      nome: projeto?.nome ?? "",
      descricao: projeto?.descricao ?? "",
      cliente_id: projeto?.cliente_id ?? null,
      status_projeto: projeto?.status_projeto ?? null,
    });
  }, [open, projeto]);

  const handleSave = async () => {
    if (!form.nome.trim()) return;
    if (!form.cliente_id) return;

    await onSave(form);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>
        {projeto ? "Editar Projeto" : "Novo Projeto"}
      </DialogTitle>

      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
        <TextField
          label="Nome"
          value={form.nome}
          required
          onChange={e => setForm({ ...form, nome: e.target.value })}
        />

        <TextField
          label="Descrição"
          value={form.descricao}
          multiline
          rows={3}
          onChange={e => setForm({ ...form, descricao: e.target.value })}
        />

        <FormControl fullWidth required>
          <InputLabel>Cliente</InputLabel>
          <Select
            value={form.cliente_id ?? ""}
            label="Cliente"
            onChange={e =>
              setForm({ ...form, cliente_id: Number(e.target.value) })
            }
          >
            {clientes.map(c => (
              <MenuItem key={c.id} value={c.id}>
                {c.nome} — {c.email}
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
                status_projeto: e.target.value
                  ? Number(e.target.value)
                  : null
              })
            }
          >
            <MenuItem value="">
              <em>Sem status</em>
            </MenuItem>
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
        <Button variant="contained" onClick={handleSave}>
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
