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

import type { Projeto } from "../../types/Projeto";
import type { Atividade } from "../../types/Atividade";

import { listarProjetos } from "../../services/projetos.service";

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (data: Atividade) => Promise<void>;
  atividade?: Atividade;
}

const emptyForm: Atividade = {
  id: undefined,
  descricao: "",
  data: "",
  projeto_id: null,
};

export function AtividadeDialog({
  open,
  onClose,
  onSave,
  atividade
}: Props) {
  const [form, setForm] = useState<Atividade>(emptyForm);
  const [projetos, setProjetos] = useState<Projeto[]>([]);

  useEffect(() => {
    if (!open) return;

    // 🔥 sempre atualiza projetos ao abrir
    listarProjetos()
      .then(setProjetos)
      .catch(console.error);

    if (atividade) {
      setForm({
        id: atividade.id,
        descricao: atividade.descricao ?? "",
        data: atividade.data
        ? atividade.data.slice(0, 16)
        : "",
        projeto_id: atividade.projeto_id ?? null,
      });
    } else {
      setForm(emptyForm);
    }
  }, [open, atividade]);

  const handleSave = async () => {
    if (!form.descricao.trim()) {
      alert("Preencha a descrição");
      return;
    }

    if (!form.data) {
      alert("Preencha a data");
      return;
    }

    if (!form.projeto_id) {
      alert("Selecione um projeto");
      return;
    }

    await onSave({
    ...form,
    data: `${form.data}:00`,
    });

    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>
        {atividade ? "Editar Atividade" : "Nova Atividade"}
      </DialogTitle>

      <DialogContent
        sx={{ display: "flex", gap: 2, flexDirection: "column", mt: 1 }}
      >
        <TextField
          label="Descrição"
          value={form.descricao}
          onChange={e =>
            setForm({ ...form, descricao: e.target.value })
          }
          fullWidth
          multiline
          rows={3}
          required
        />

        <TextField
          label="Data"
          type="datetime-local"
          value={form.data}
          onChange={e =>
            setForm({ ...form, data: e.target.value })
          }
          InputLabelProps={{ shrink: true }}
          fullWidth
          required
        />

        <FormControl fullWidth required>
          <InputLabel>Projeto</InputLabel>
          <Select
            value={form.projeto_id ?? ""}
            label="Projeto"
            onChange={e =>
              setForm({
                ...form,
                projeto_id: Number(e.target.value),
              })
            }
          >
            {projetos.map(p => (
              <MenuItem key={p.id} value={p.id}>
                {p.nome} - {p.cliente_nome} - {p.cliente_email}
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
