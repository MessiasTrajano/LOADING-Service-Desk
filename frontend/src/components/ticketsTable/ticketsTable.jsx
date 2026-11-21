
import { Pencil, Trash2, ClipboardList } from "lucide-react";
import "./TicketsTable.css";

const statusLabels = {
  ABERTA: "Aberta",
  EM_ANDAMENTO: "Em Andamento",
  CONCLUIDA: "Concluída"
};

const priorityLabels = {
  BAIXA: "Baixa",
  MEDIA: "Média",
  ALTA: "Alta"
};

const categoryLabels = {
  HARDWARE: "Hardware",
  SOFTWARE: "Software",
  REDE: "Rede",
  ACESSO: "Acesso",
  OUTROS: "Outros"
};

function formatDate(date) {
  return new Date(date).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}

function TicketsTable({ tickets, onEdit, onDelete, onAttendance }) {
  return (
    <div className="tickets-table-container">
      <table className="tickets-table">
        <thead>
          <tr>
            <th>Título</th>
            <th>Categoria</th>
            <th>Prioridade</th>
            <th>Status</th>
            <th>Data de criação</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {tickets.length === 0 ? (
            <tr>
              <td colSpan="6" className="empty-table">
                Nenhum chamado encontrado.
              </td>
            </tr>
          ) : (
            tickets.map((ticket) => (
              <tr key={ticket.id}>
                <td className="ticket-title-cell">
                  <strong>{ticket.title}</strong>
                  <span>{ticket.description}</span>
                </td>

                <td>
                  <span className="category-badge">
                    {categoryLabels[ticket.category] || ticket.category}
                  </span>
                </td>

                <td>
                  <span className={`priority-badge ${ticket.priority.toLowerCase()}`}>
                    {priorityLabels[ticket.priority]}
                  </span>
                </td>

                <td>
                  <span className={`status-badge ${ticket.status.toLowerCase()}`}>
                    <span className="badge-dot"></span>
                    {statusLabels[ticket.status]}
                  </span>
                </td>

                <td className="ticket-date">
                  {formatDate(ticket.createdAt)}
                </td>

                <td>
                  <div className="ticket-actions">
                    <button
                      type="button"
                      title="Editar chamado"
                      onClick={() => onEdit(ticket)}
                    >
                      <Pencil size={15} />
                    </button>

                    <button
                      type="button"
                      title="Atendimento"
                      onClick={() => onAttendance(ticket)}
                    >
                      <ClipboardList size={15} />
                    </button>

                    <button
                      type="button"
                      title="Excluir chamado"
                      onClick={() => onDelete(ticket)}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="table-footer">
        Mostrando {tickets.length} chamados
      </div>
    </div>
  );
}

export default TicketsTable;
