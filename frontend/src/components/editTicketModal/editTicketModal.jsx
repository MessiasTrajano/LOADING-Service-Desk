import { useEffect, useState } from "react";
import { X, CalendarDays, Hash } from "lucide-react";

import {
  updateTicketTitle,
  updateTicketDescription,
  updateTicketPriority,
  updateTicketCategory,
} from "../../services/ticket.services";

import "./EditTicketModal.css";

function EditTicketModal({ ticket, onClose, onSave }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("OUTROS");
  const [priority, setPriority] = useState("MEDIA");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (ticket) {
      setTitle(ticket.title);
      setDescription(ticket.description);
      setCategory(ticket.category || "OUTROS");
      setPriority(ticket.priority);
      setError("");
    }
  }, [ticket]);

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");

    if (title.trim().length < 2) {
      setError("O título deve possuir pelo menos 2 caracteres.");
      return;
    }

    if (description.trim().length < 2) {
      setError("A descrição deve possuir pelo menos 2 caracteres.");
      return;
    }

    if (title.length > 100 || description.length > 1000) {
      setError("Verifique o limite de caracteres dos campos.");
      return;
    }

    setLoading(true);

    try {
      // Atualiza somente os campos que foram modificados.
      if (title.trim() !== ticket.title) {
        await updateTicketTitle(ticket.id, title.trim());
      }

      if (description.trim() !== ticket.description) {
        await updateTicketDescription(ticket.id, description.trim());
      }

      if (category !== ticket.category) {
        await updateTicketCategory(ticket.id, category);
      }

      if (priority !== ticket.priority) {
        await updateTicketPriority(ticket.id, priority);
      }

      await onSave();
      onClose();

    } catch (err) {
      console.error("Erro ao editar chamado:", err);

      const message = err.response?.data?.message;

      setError(
        Array.isArray(message)
          ? message.join(" ")
          : message || "Não foi possível salvar as alterações."
      );
    } finally {
      setLoading(false);
    }
  }

  if (!ticket) return null;

  return (
    <div className="edit-modal-overlay" onMouseDown={onClose}>
      <div
        className="edit-modal"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <header className="edit-modal-header">
          <div>
            <h2>Editar Chamado</h2>
            <p>Atualize as informações da solicitação.</p>
          </div>

          <button
            type="button"
            className="edit-close-button"
            onClick={onClose}
          >
            <X size={19} />
          </button>
        </header>

        <form onSubmit={handleSubmit}>
          <div className="edit-modal-info">
            <span>
              <Hash size={14} />
              ID: {ticket.id}
            </span>

            <span>
              <CalendarDays size={14} />
              Criado em:{" "}
              {new Date(ticket.createdAt).toLocaleDateString("pt-BR")}
            </span>
          </div>

          <div className="edit-form-field">
            <label htmlFor="edit-title">Título</label>

            <input
              id="edit-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={100}
              required
            />

            <small>{title.length}/100 caracteres</small>
          </div>

          <div className="edit-form-field">
            <label htmlFor="edit-description">Descrição detalhada</label>

            <textarea
              id="edit-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={1000}
              rows={5}
              required
            />

            <small>{description.length}/1000 caracteres</small>
          </div>

          <div className="edit-form-field">
            <label htmlFor="edit-category">Categoria</label>

            <select
              id="edit-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="HARDWARE">Hardware</option>
              <option value="SOFTWARE">Software</option>
              <option value="REDE">Rede</option>
              <option value="ACESSO">Acesso</option>
              <option value="OUTROS">Outros</option>
            </select>
          </div>

          <div className="edit-form-field">
            <label htmlFor="edit-priority">Prioridade</label>

            <select
              id="edit-priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="BAIXA">Baixa</option>
              <option value="MEDIA">Média</option>
              <option value="ALTA">Alta</option>
            </select>
          </div>

          {error && (
            <div className="edit-error">
              {error}
            </div>
          )}

          <footer className="edit-modal-footer">
            <button
              type="button"
              className="edit-cancel-button"
              onClick={onClose}
              disabled={loading}
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="edit-save-button"
              disabled={loading}
            >
              {loading ? "Salvando..." : "Salvar alterações"}
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
}

export default EditTicketModal;