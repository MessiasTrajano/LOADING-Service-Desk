import { useState, useEffect } from "react";

import Sidebar from "./components/sidebars/sidebar";
import SummaryCard from "./components/summaryCard/summaryCard";
import Filters from "./components/filters/filters";
import TicketsTable from "./components/ticketsTable/ticketsTable";
import EditTicketModal from "./components/editTicketModal/editTicketModal";
import TicketAttendanceModal from "./components/ticketAttendanceModal/ticketAttendanceModal";
import NewTicketDrawer from "./components/newTicketDrawer/newTicketDrawer";

import { Inbox, Clock, CircleCheck } from "lucide-react";

import {
  getTickets,
  deleteTicket
} from "./services/ticket.services";

import "./App.css";

function App() {
  // Estados principais
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Estados dos filtros
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  // Estados dos modais
  const [editingTicket, setEditingTicket] = useState(null);
  const [attendanceTicket, setAttendanceTicket] = useState(null);
  const [creatingTicket, setCreatingTicket] = useState(false);

  // Atualizar lista de chamados
  async function refreshTickets() {
    const updatedTickets = await getTickets();
    setTickets(updatedTickets);
  }

  // Buscar chamados na API
  useEffect(() => {
    async function loadTickets() {
      try {
        await refreshTickets();
      } catch (error) {
        console.error("Erro ao buscar chamados:", error);
        setError("Não foi possível carregar os chamados.");
      } finally {
        setLoading(false);
      }
    }

    loadTickets();
  }, []);

  // Excluir chamado
  async function handleDelete(ticket) {
    const confirmed = window.confirm(
      `Tem certeza que deseja excluir o chamado "${ticket.title}"?`
    );

    if (!confirmed) return;

    try {
      await deleteTicket(ticket.id);
      await refreshTickets();
      alert("Chamado excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir chamado:", error);
      alert("Não foi possível excluir o chamado.");
    }
  }

  // Contadores do Dashboard
  const openTickets = tickets.filter(
    (ticket) => ticket.status === "ABERTA"
  ).length;

  const progressTickets = tickets.filter(
    (ticket) => ticket.status === "EM_ANDAMENTO"
  ).length;

  const completedTickets = tickets.filter(
    (ticket) => ticket.status === "CONCLUIDA"
  ).length;

  // Filtragem dos chamados
  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch = ticket.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      !statusFilter || ticket.status === statusFilter;

    const matchesPriority =
      !priorityFilter || ticket.priority === priorityFilter;

    const matchesCategory =
      !categoryFilter || ticket.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
  });

  return (
    <div className="app">
      <Sidebar totalTickets={tickets.length} />

      <main className="main-content">

        {/* Cabeçalho */}
        <div className="dashboard-header">
          <div>
            <h1>Chamados de Suporte</h1>
            <p>
              Acompanhe e gerencie as solicitações da sua equipe.
            </p>
          </div>

          <button className="new-ticket-button" onClick={() => setCreatingTicket(true)}>
            + Novo Chamado
          </button>
        </div>

        {/* Conteúdo principal */}
        {loading ? (
          <p>Carregando chamados...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <>
            {/* Cards de resumo */}
            <section className="summary-grid">

              <SummaryCard
                title="Abertos"
                count={openTickets}
                description="Aguardando atendimento"
                icon={Inbox}
                color="blue"
              />

              <SummaryCard
                title="Em Andamento"
                count={progressTickets}
                description="Em atendimento pela equipe"
                icon={Clock}
                color="orange"
              />

              <SummaryCard
                title="Concluídos"
                count={completedTickets}
                description="Solicitações resolvidas"
                icon={CircleCheck}
                color="green"
              />

            </section>

            {/* Filtros e tabela */}
            <section className="tickets-section">

              <Filters
                search={search}
                setSearch={setSearch}
                status={statusFilter}
                setStatus={setStatusFilter}
                priority={priorityFilter}
                setPriority={setPriorityFilter}
                category={categoryFilter}
                setCategory={setCategoryFilter}
                total={filteredTickets.length}
              />

              <TicketsTable
                tickets={filteredTickets}
                onEdit={setEditingTicket}
                onAttendance={setAttendanceTicket}
                onDelete={handleDelete}
              />

              {/* Modal de edição */}
              <EditTicketModal
                ticket={editingTicket}
                onClose={() => setEditingTicket(null)}
                onSave={refreshTickets}
              />

              {/* Modal de atendimento */}
              <TicketAttendanceModal
                ticket={attendanceTicket}
                onClose={() => setAttendanceTicket(null)}
                onSave={refreshTickets}
              />

              <NewTicketDrawer
                open={creatingTicket}
                onClose={() => setCreatingTicket(false)}
                onSave={refreshTickets}
              />

            </section>
          </>
        )}

      </main>
    </div>
  );
}

export default App;
