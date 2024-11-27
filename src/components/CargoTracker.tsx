import React, { useState } from "react";
import { toast } from "react-toastify";

import AddCargoForm from "./AddCargoForm";
import CargoList from "./CargoList/CargoList";
import { Cargo, CargoStatus } from "../types/cargo";
import { stateCargos } from "../store";

const CargoTracker: React.FC = () => {
  const start: Cargo[] = JSON.parse(`${localStorage.getItem("cargos")}`);

  const [cargos, setCargos] = useState<Cargo[]>(
    start?.length ? start : stateCargos
  );

  const [statusFilter, setStatusFilter] = useState<CargoStatus | "all">("all");
  const [isAddCargo, setIsAddCargo] = useState<boolean>(true);

  const addCargo = (newCargo: Omit<Cargo, "id">) => {
    const cargo: Cargo = {
      ...newCargo,
      id: `CARGO${String(cargos.length + 1).padStart(3, "0")}`,
    };
    setCargos([...cargos, cargo]);
    localStorage.setItem("cargos", JSON.stringify([...cargos, cargo]));
    toast.success(`Новый груз добавлен: ${cargo.name}`);
  };

  const updateCargoStatus = (id: string, newStatus: CargoStatus) => {
    setCargos(
      cargos.map((cargo) => {
        if (cargo.id === id) {
          const updateCargos = {
            ...cargo,
            status: newStatus,
          };

          return updateCargos;
        } else {
          return cargo;
        }
      })
    );

    localStorage.setItem(
      "cargos",
      JSON.stringify(
        cargos.map((cargo) => {
          if (cargo.id === id) {
            const updateCargos = {
              ...cargo,
              status: newStatus,
            };

            return updateCargos;
          } else {
            return cargo;
          }
        })
      )
    );
  };

  const filteredCargos =
    statusFilter === "all"
      ? cargos
      : cargos.filter((cargo) => cargo.status === statusFilter);

  return (
    <div className="container">
      <header className="bg-primary text-white mb-2 border border-light rounded">
        <h1 className="text-center mb-2 display-10 font-weight-bold">
          Система отслеживания грузов
        </h1>
      </header>

      {/* Добавляем форму добавления груза */}
      <div className="mb-4">
        {isAddCargo ? (
          <div>
            <AddCargoForm addCargo={addCargo} setIsAddCargo={setIsAddCargo} />
          </div>
        ) : (
          <div>
            <button
              onClick={() => setIsAddCargo(true)}
              className="btn btn-success"
            >
              Добавить груз
            </button>
          </div>
        )}
      </div>

      {/* Список грузов */}
      <div className="list-group">
        <CargoList
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          cargos={filteredCargos}
          updateCargoStatus={updateCargoStatus}
        />
      </div>
    </div>
  );
};

export default CargoTracker;
