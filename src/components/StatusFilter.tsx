import { CargoStatus } from "../types/cargo";

function StatusFilter({
  statusFilter,
  setStatusFilter,
}: {
  statusFilter: CargoStatus | "all";
  setStatusFilter: (status: CargoStatus | "all") => void;
}) {
  return (
    <div>
      <label htmlFor="statusFilter" className="form-label text-center">
        Фильтр по статусу:
      </label>
      <select
        id="statusFilter"
        className="form-select"
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value as CargoStatus | "all")}
      >
        <option value="all" className="text-muted">
          Все
        </option>
        <option value="Ожидает отправки" className="text-warning">
          Ожидает отправки
        </option>
        <option value="В пути" className="text-primary">
          В пути
        </option>
        <option value="Доставлен" className="text-success">
          Доставлен
        </option>
      </select>
    </div>
  );
}

export default StatusFilter;
