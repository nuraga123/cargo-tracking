import React from "react";
import { toast } from "react-toastify";
import { Cargo, CargoStatus } from "../../types/cargo";
import StatusFilter from "../StatusFilter";
import { checkDate } from "../../utils";

interface CargoListProps {
  cargos: Cargo[];
  updateCargoStatus: (id: string, newStatus: CargoStatus) => void;
  statusFilter: CargoStatus | "all";
  setStatusFilter: (status: CargoStatus | "all") => void;
}

const CargoList: React.FC<CargoListProps> = ({
  cargos,
  updateCargoStatus,
  statusFilter,
  setStatusFilter,
}) => {
  const getStatusColor = (status: CargoStatus) => {
    switch (status) {
      case "Ожидает отправки":
        return "table-warning";
      case "В пути":
        return "table-primary";
      case "Доставлен":
        return "table-success";
      default:
        return "";
    }
  };

  const handleStatusChange = (id: string, newStatus: CargoStatus) => {
    const cargo = cargos.find((c) => c.id === id);
    if (cargo) {
      if (newStatus === "В пути") {
        toast('груз изменен на статус "В пути"');
      } else if (newStatus === "Доставлен" && checkDate(cargo.departureDate)) {
        toast.error(checkDate(cargo.departureDate));
        return;
      } else if (newStatus === "Доставлен") {
        toast.success(`Статус груза изменен на Доставлен`);
      } else if (newStatus === "Ожидает отправки") {
        toast.warning('груз изменен на статус "Ожидает отправки"');
      }

      updateCargoStatus(id, newStatus);
    }
  };

  return (
    <table className="table table-bordered table-hover">
      <thead className="sticky-top bg-light border border-secondary">
        <tr>
          <th className="sticky-header border border-secondary">№</th>
          <th className="sticky-header border border-secondary">Номер груза</th>
          <th className="sticky-header border border-secondary">Название</th>
          <th className="sticky-header border border-secondary">
            <StatusFilter
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
            />
          </th>
          <th className="sticky-header border border-secondary">
            Пункт отправления
          </th>
          <th className="sticky-header border border-secondary">
            Пункт назначения
          </th>
          <th className="sticky-header border border-secondary">
            Дата отправления
          </th>
        </tr>
      </thead>
      <tbody>
        {cargos.map((cargo, i) => (
          <tr key={cargo.id} className={getStatusColor(cargo.status)}>
            <td className="border border-secondary">{`${i + 1})`}</td>
            <td className="border border-secondary">{cargo.id}</td>
            <td className="border border-secondary">{cargo.name}</td>
            <td className="border border-secondary">
              <select
                className="form-select"
                value={cargo.status}
                onChange={(e) =>
                  handleStatusChange(cargo.id, e.target.value as CargoStatus)
                }
              >
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
            </td>
            <td className="border border-secondary">{cargo.origin}</td>
            <td className="border border-secondary">{cargo.destination}</td>
            <td className="border border-secondary">{cargo.departureDate}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CargoList;
