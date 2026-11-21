import { useState } from "react";
import { X } from "lucide-react";
import { createTicket } from "../../services/ticket.services";
import "../editTicketModal/editTicketModal.css";

function NewTicketDrawer({ open, onClose, onSave }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("OUTROS");
  const [priority, setPriority] = useState("MEDIA");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function resetForm() {
    setTitle("");
    setDescription("");
    setCategory("OUTROS");
    setPriority("MEDIA");
    setError("");
  }

  function handleClose() {
    if (!loading) {
      resetForm();
      onClose();
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (title.trim().length < 2 || description.trim().length < 2) {
      setError("Título e descrição devem possuir pelo menos 2 caracteres.");
      return;
    }

    setLoading(true);

    try {
      await createTicket({
        title: title.trim(),
        description: description.trim(),
        category,
        priority,
      });
      resetForm();
      await onSave();
      onClose();
    } catch (err) {
      const message = err.response?.data?.message;
      setError(
        Array.isArray(message)
          ? message.join(" ")
          : message || "Não foi possível cadastrar o chamado."
      );
    } finally {
      setLoading(false);
    }
  }

  if (!open) return null;

  return (
    <div className="edit-modal-overlay" onMouseDown={handleClose}>
      <div className="edit-modal" onMouseDown={(event) => event.stopPropagation()}>
        <header className="edit-modal-header">
          <div>
            <h2>Novo Chamado</h2>
            <p>Cadastre uma nova solicitação.</p>
          </div>
          <button type="button" className="edit-close-button" onClick={handleClose}>
            <X size={19} />
          </button>
        </header>

        <form onSubmit={handleSubmit}>
          <div className="edit-form-field">
            <label htmlFor="new-ticket-title">Título</label>
            <input id="new-ticket-title" value={title} onChange={(event) => setTitle(event.target.value)} maxLength={100} required />
            <small>{title.length}/100 caracteres</small>
          </div>

          <div className="edit-form-field">
            <label htmlFor="new-ticket-description">Descrição detalhada</label>
            <textarea id="new-ticket-description" value={description} onChange={(event) => setDescription(event.target.value)} maxLength={1000} rows={5} required />
            <small>{description.length}/1000 caracteres</small>
          </div>

          <div className="edit-form-field">
            <label htmlFor="new-ticket-category">Categoria</label>
            <select id="new-ticket-category" value={category} onChange={(event) => setCategory(event.target.value)}>
              <option value="HARDWARE">Hardware</option>
              <option value="SOFTWARE">Software</option>
              <option value="REDE">Rede</option>
              <option value="ACESSO">Acesso</option>
              <option value="OUTROS">Outros</option>
            </select>
          </div>

          <div className="edit-form-field">
            <label htmlFor="new-ticket-priority">Prioridade</label>
            <select id="new-ticket-priority" value={priority} onChange={(event) => setPriority(event.target.value)}>
              <option value="BAIXA">Baixa</option>
              <option value="MEDIA">Média</option>
              <option value="ALTA">Alta</option>
            </select>
          </div>

          {error && <div className="edit-error">{error}</div>}

          <footer className="edit-modal-footer">
            <button type="button" className="edit-cancel-button" onClick={handleClose} disabled={loading}>Cancelar</button>
            <button type="submit" className="edit-save-button" disabled={loading}>{loading ? "Cadastrando..." : "Cadastrar chamado"}</button>
          </footer>
        </form>
      </div>
    </div>
  );
}

export default NewTicketDrawer;
