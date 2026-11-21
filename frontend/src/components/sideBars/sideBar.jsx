import {
  LayoutDashboard,
  Plus,
  ChartColumn,
  CircleHelp,
  ChevronRight,
  LogOut
} from "lucide-react";

import "./Sidebar.css";

function Sidebar({ totalTickets }) {
  return (
    <aside className="sidebar">

      {/* Logo */}
      <div className="sidebar-logo">
        <h2>LOADING <span>.</span></h2>
        <p>Service Desk</p>
      </div>

      {/* Navegação */}
      <nav className="sidebar-navigation">
        <span className="sidebar-section-title">
          WORKSPACE
        </span>

        <a href="#" className="sidebar-link active">
          <LayoutDashboard size={17} />
          <span>Todos os Chamados</span>
          <span className="sidebar-counter">{totalTickets}</span>
        </a>

        <a href="#" className="sidebar-link">
          <Plus size={18} />
          <span>Novo Chamado</span>
        </a>

        <a href="#" className="sidebar-link">
          <ChartColumn size={17} />
          <span>Métricas</span>
        </a>
      </nav>

      {/* Rodapé */}
      <div className="sidebar-footer">

        <div className="sidebar-help">
          <div className="help-title">
            <CircleHelp size={16} />
            <strong>Precisa de ajuda?</strong>
          </div>

          <p>Consulte a central de suporte</p>

          <a href="#">
            Acessar central
            <ChevronRight size={15} />
          </a>
        </div>

        <div className="sidebar-profile">
          <div>
            <strong>Mariana Costa</strong>
            <span>Administradora</span>
          </div>

          <LogOut size={17} />
        </div>

      </div>
    </aside>
  );
}

export default Sidebar;
