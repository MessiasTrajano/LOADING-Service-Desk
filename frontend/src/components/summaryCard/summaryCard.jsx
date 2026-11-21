import "./SummaryCard.css";

function SummaryCard({ title, count, description, icon: Icon, color }) {
  return (
    <div className="summary-card">

      <div className="summary-card-top">
        <span>{title}</span>

        <div className={`summary-icon ${color}`}>
          <Icon size={17} />
        </div>
      </div>

      <h2>{String(count).padStart(2, "0")}</h2>

      <p>{description}</p>

    </div>
  );
}

export default SummaryCard;
