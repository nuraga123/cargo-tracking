export type CargoStatus = "Ожидает отправки" | "В пути" | "Доставлен";

export interface Cargo {
  id: string;
  name: string;
  status: CargoStatus;
  origin: string;
  destination: string;
  departureDate: string;
}
