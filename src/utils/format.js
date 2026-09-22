export function normalizeVehicle(value) {
  return value.toUpperCase().replace(/[^A-Z0-9]/g, "");
}

export function normalizeCnic(value) {
  return value.replace(/\D/g, "").slice(0, 13);
}

export function normalizeDate(value) {
  return value.replace(/\D/g, "").slice(0, 8);
}

export function buildSms({ cnic, vehicle, province, date }) {
  return `REG ${cnic} ${vehicle} ${province} ${date}`;
}

export function formatCnic(value) {
  const digits = normalizeCnic(value);
  return digits.length <= 5 ? digits : `${digits.slice(0,5)}-${digits.slice(5,12)}-${digits.slice(12)}`;
}
