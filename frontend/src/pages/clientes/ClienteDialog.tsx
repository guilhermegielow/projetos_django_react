import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button
} from "@mui/material";
import { useState, useEffect } from "react";
import type { Cliente } from "../../types/Cliente";
import { validarEmail, validarCNPJ } from "../../utils/validators";
import { maskCNPJ, maskTelefone } from "../../utils/masks";

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (data: Cliente) => Promise<any>; // deve lançar apenas err.response.data em caso de erro
  cliente?: Cliente;
}

const emptyForm: Cliente = {
  id: undefined,
  nome: "",
  email: "",
  telefone: "",
  cnpj: "",
};

export function ClienteDialog({ open, onClose, onSave, cliente }: Props) {
  const [form, setForm] = useState<Cliente>(emptyForm);
  const [submitted, setSubmitted] = useState(false);
  const [backendErrors, setBackendErrors] = useState<Record<string, string[]>>({});

  useEffect(() => {
    if (cliente) {
      setForm(cliente);
    } else {
      setForm(emptyForm);
    }
    setSubmitted(false);
    setBackendErrors({});
  }, [cliente, open]);

  const handleSave = async () => {
    setSubmitted(true);

    // validação local
    if (!form.nome.trim()) return;
    if (!validarEmail(form.email)) return;
    if (!validarCNPJ(form.cnpj)) return;

    const payload: Cliente = {
      nome: form.nome,
      email: form.email,
      telefone: form.telefone.replace(/\D/g, ""),
      cnpj: form.cnpj.replace(/\D/g, ""),
    };

    if (form.id) payload.id = form.id;

    try {
      await onSave(payload);
      onClose(); // fecha se sucesso
    } catch (data: any) {
      // 'data' aqui deve ser o objeto do serializer { cnpj: [...], email: [...] }
      const formattedErrors: Record<string, string[]> = {};
      Object.keys(data).forEach(key => {
        formattedErrors[key] = Array.isArray(data[key]) ? data[key] : [String(data[key])];
      });
      setBackendErrors(formattedErrors);
    }
  };

  const getHelperText = (field: keyof Cliente, localError: string) => {
    const backendMsg = backendErrors[field]?.join(", ");
    if (backendMsg) return backendMsg;
    return submitted && localError ? localError : "";
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>{cliente ? "Editar" : "Novo"} Cliente</DialogTitle>

      <DialogContent sx={{ display: "flex", gap: 2, flexDirection: "column", mt: 1 }}>
        <TextField
          label="Nome"
          value={form.nome}
          required
          error={submitted && (!form.nome.trim() || !!backendErrors.nome)}
          helperText={getHelperText("nome", !form.nome.trim() ? "Informe o nome" : "")}
          onChange={e => {
            setForm({ ...form, nome: e.target.value });
            setBackendErrors({ ...backendErrors, nome: [] });
          }}
        />

        <TextField
          label="Email"
          value={form.email}
          required
          error={submitted && (!validarEmail(form.email) || !!backendErrors.email)}
          helperText={getHelperText("email", !validarEmail(form.email) ? "E-mail inválido" : "")}
          onChange={e => {
            setForm({ ...form, email: e.target.value });
            setBackendErrors({ ...backendErrors, email: [] });
          }}
        />

        <TextField
          label="Telefone"
          value={form.telefone}
          onChange={e => setForm({ ...form, telefone: maskTelefone(e.target.value) })}
        />

        <TextField
          label="CNPJ"
          value={form.cnpj}
          required
          error={submitted && (!validarCNPJ(form.cnpj) || !!backendErrors.cnpj)}
          helperText={getHelperText("cnpj", !validarCNPJ(form.cnpj) ? "CNPJ inválido" : "")}
          onChange={e => {
            setForm({ ...form, cnpj: maskCNPJ(e.target.value) });
            setBackendErrors({ ...backendErrors, cnpj: [] });
          }}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button variant="contained" onClick={handleSave}>Salvar</Button>
      </DialogActions>
    </Dialog>
  );
}
