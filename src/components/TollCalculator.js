export const calculateToll = (
  distance,
  dayOfWeek,
  numberPlate,
  isSpecialDay
) => {
  const baseRate = 20;
  const perKmRate = 0.2;
  let total = baseRate + distance * perKmRate;

  if (dayOfWeek === "Saturday" || dayOfWeek === "Sunday") {
    total *= 1.5;
  }

  const isEven = numberPlate.split("-")[1] % 2 === 0;
  const isDiscountDay = ["Monday", "Wednesday"].includes(dayOfWeek)
    ? isEven
    : ["Tuesday", "Thursday"].includes(dayOfWeek)
    ? !isEven
    : false;

  if (isDiscountDay) {
    total *= 0.9;
  }

  if (isSpecialDay) {
    total *= 0.5;
  }

  return total.toFixed(2);
};
