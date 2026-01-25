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

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  projetos: Projeto[];
  atividade?: Atividade;
}

const emptyForm = {
  descricao: "",
  data: "",
  projeto_id: "",
};

export function AtividadeDialog({
  open,
  onClose,
  onSave,
  projetos,
  atividade
}: Props) {
  const [form, setForm] = useState<typeof emptyForm>(emptyForm);

  /**
   * Sincroniza formulário (novo / editar)
   */
  useEffect(() => {
    if (atividade) {
      setForm({
        descricao: atividade.descricao ?? "",
        data: atividade.data
          ? new Date(atividade.data).toISOString().slice(0, 16)
          : "",
        projeto_id: atividade.projeto_id ?? "",
      });
    } else {
      setForm(emptyForm);
    }
  }, [atividade, open]);

  const handleSave = () => {
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

    // ✅ Conversão SEGURA
    const date = new Date(form.data);
    if (isNaN(date.getTime())) {
      alert("Data inválida");
      return;
    }

    onSave({
      descricao: form.descricao,
      data: date.toISOString(),
      projeto_id: form.projeto_id,
    });
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
            value={form.projeto_id}
            label="Projeto"
            onChange={e =>
              setForm({ ...form, projeto_id: e.target.value })
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
