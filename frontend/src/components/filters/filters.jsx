
import { Search } from "lucide-react";
import "./Filters.css";

function Filters({
  search,
  setSearch,
  status,
  setStatus,
  priority,
  setPriority,
  category,
  setCategory,
  total
}) {
  return (
    <div className="filters-container">

      <div className="search-box">
        <Search size={17} />

        <input
          type="text"
          placeholder="Buscar por título do chamado..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="">Status: Todos</option>
        <option value="ABERTA">Aberta</option>
        <option value="EM_ANDAMENTO">Em Andamento</option>
        <option value="CONCLUIDA">Concluída</option>
      </select>

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="">Prioridade: Todas</option>
        <option value="BAIXA">Baixa</option>
        <option value="MEDIA">Média</option>
        <option value="ALTA">Alta</option>
      </select>

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">Categoria: Todas</option>
        <option value="HARDWARE">Hardware</option>
        <option value="SOFTWARE">Software</option>
        <option value="REDE">Rede</option>
        <option value="ACESSO">Acesso</option>
        <option value="OUTROS">Outros</option>
      </select>

      <span className="filters-total">
        {total} chamados
      </span>

    </div>
  );
}

export default Filters;
