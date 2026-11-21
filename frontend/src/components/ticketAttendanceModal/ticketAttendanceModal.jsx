
import { useState } from "react";
import { X, ClipboardList, ArrowRight } from "lucide-react";
import { updateTicketStatus } from "../../services/ticket.services";
import "./ticketAttendanceModal.css";

const statusLabels = {
  ABERTA: "Aberta",
  EM_ANDAMENTO: "Em andamento",
  CONCLUIDA: "Concluída"
};

const nextStatus = {
  ABERTA: "EM_ANDAMENTO",
  EM_ANDAMENTO: "CONCLUIDA"
};

function TicketAttendanceModal({ ticket, onClose, onSave }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!ticket) return null;

  const next = nextStatus[ticket.status];

  async function handleAdvance() {
    if (!next) return;

    setLoading(true);
    setError("");

    try {
      await updateTicketStatus(ticket.id, next);
      await onSave();
      onClose();
    } catch (err) {
      console.error("Erro ao atualizar status:", err);

      const message = err.response?.data?.message;
      setError(
        Array.isArray(message)
          ? message.join(" ")
          : message || "Não foi possível atualizar o status."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="attendance-overlay" onMouseDown={onClose}>
      <div
        className="attendance-modal"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <header className="attendance-header">
          <div>
            <div className="attendance-icon">
              <ClipboardList size={20} />
            </div>
            <h2>Atendimento do chamado</h2>
            <p>Gerencie o andamento desta solicitação.</p>
          </div>

          <button
            type="button"
            className="attendance-close"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </header>

        <div className="attendance-content">
          <span className="attendance-label">Título do chamado</span>
          <h3>{ticket.title}</h3>

          <span className="attendance-label">Descrição</span>
          <p className="attendance-description">
            {ticket.description}
          </p>

          <div className="attendance-info">
            <div>
              <span className="attendance-label">Prioridade</span>
              <strong>{ticket.priority}</strong>
            </div>

            <div>
              <span className="attendance-label">Status atual</span>
              <strong>{statusLabels[ticket.status]}</strong>
            </div>
          </div>

          <div className="attendance-progress">
            <span className="attendance-label">Fluxo de atendimento</span>

            <div className="attendance-steps">
              {["ABERTA", "EM_ANDAMENTO", "CONCLUIDA"].map(
                (status, index) => {
                  const currentIndex = [
                    "ABERTA",
                    "EM_ANDAMENTO",
                    "CONCLUIDA"
                  ].indexOf(ticket.status);

                  return (
                    <div
                      key={status}
                      className={`attendance-step ${
                        index <= currentIndex ? "active" : ""
                      }`}
                    >
                      <span className="attendance-step-dot"></span>
                      <span>{statusLabels[status]}</span>
                    </div>
                  );
                }
              )}
            </div>
          </div>

          {error && (
            <p className="attendance-error">{error}</p>
          )}
        </div>

        <footer className="attendance-footer">
          <button
            type="button"
            className="attendance-cancel"
            onClick={onClose}
            disabled={loading}
          >
            Fechar
          </button>

          {next && (
            <button
              type="button"
              className="attendance-advance"
              onClick={handleAdvance}
              disabled={loading}
            >
              {loading ? "Atualizando..." : "Avançar status"}
              {!loading && <ArrowRight size={16} />}
            </button>
          )}

          {!next && (
            <span className="attendance-finished">
              Chamado concluído
            </span>
          )}
        </footer>
      </div>
    </div>
  );
}

export default TicketAttendanceModal;
