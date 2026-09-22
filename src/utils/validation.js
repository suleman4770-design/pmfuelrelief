export function validateRegistration(data) {
  const errors = {};

  if (!/^\d{13}$/.test(data.cnic)) {
    errors.cnic = "CNIC must contain exactly 13 digits.";
  }

  if (!/^[A-Z0-9]{3,12}$/.test(data.vehicle)) {
    errors.vehicle = "Enter a valid vehicle number using letters and numbers.";
  }

  if (!data.province) {
    errors.province = "Select your province or territory.";
  }

  if (!/^\d{8}$/.test(data.date)) {
    errors.date = "Registration date must contain 8 digits in DDMMYYYY format.";
  } else {
    const day = Number(data.date.slice(0,2));
    const month = Number(data.date.slice(2,4));
    const year = Number(data.date.slice(4));
    const valid = year >= 1900 && year <= 2100 && month >= 1 && month <= 12 && day >= 1 && day <= new Date(year, month, 0).getDate();
    if (!valid) errors.date = "Enter a real registration date in DDMMYYYY format.";
  }

  return errors;
}
