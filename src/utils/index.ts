export const checkDate = (departureDate: string) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const selectedDate = new Date(departureDate);
  selectedDate.setHours(0, 0, 0, 0);

  // Проверка даты отправления
  if (selectedDate > today) {
    return "Дата отправления не может быть в будущем !";
  } else {
    return false;
  }
};
