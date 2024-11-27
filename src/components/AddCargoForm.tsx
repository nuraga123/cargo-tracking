import React, { useState } from "react";
import { toast } from "react-toastify";
import { Cargo, CargoStatus } from "../types/cargo";
import { cities } from "../store";
import { checkDate } from "../utils";

interface AddCargoFormProps {
  addCargo: (cargo: Omit<Cargo, "id">) => void;
  setIsAddCargo: (arg: boolean) => void;
}

const AddCargoForm: React.FC<AddCargoFormProps> = ({
  addCargo,
  setIsAddCargo,
}) => {
  const [name, setName] = useState("");
  const [origin, setOrigin] = useState(cities[0]);
  const [destination, setDestination] = useState(cities[1]);
  const [departureDate, setDepartureDate] = useState("");
  const [status, setStatus] = useState<CargoStatus>("Ожидает отправки");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Проверка на пустые поля
    if (!name.trim() || !origin || !destination || !departureDate) {
      toast.error("Пожалуйста, заполните все поля формы.");
      return;
    }

    if (checkDate(departureDate)) {
      toast.error(checkDate(departureDate));
      return;
    }

    if (origin === destination) {
      toast.error(
        "Пункт отправления и пункт назначения не могут быть одинаковыми !"
      );
      return;
    }

    // Добавление груза, если все поля корректны
    addCargo({ name, origin, destination, departureDate, status });

    // Очистка формы после успешного добавления
    setName("");
    setOrigin(cities[0]);
    setDestination(cities[1]);
    setDepartureDate("");
    setStatus("Ожидает отправки");
  };

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
        <h5>Форма добавления груза</h5>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => setIsAddCargo(false)}
        >
          X
        </button>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Название груза
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Введите название груза"
              required
            />
          </div>

          <div className="row g-3 mb-3">
            <div className="col-md-4">
              <label htmlFor="origin" className="form-label">
                Пункт отправления
              </label>
              <select
                className="form-select"
                id="origin"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                required
              >
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-4">
              <label htmlFor="destination" className="form-label">
                Пункт назначения
              </label>
              <select
                className="form-select"
                id="destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                required
              >
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-4">
              <label htmlFor="departureDate" className="form-label ">
                Дата отправления
              </label>
              <input
                type="date"
                className="form-control"
                id="departureDate"
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="text-end">
            <button type="submit" className="btn btn-primary">
              Добавить груз
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCargoForm;
