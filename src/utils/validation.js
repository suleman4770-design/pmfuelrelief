export function validateRegistration(data) {
  const errors = {};

  if (!/^\d{13}$/.test(data.cnic)) {
    errors.cnic = "شناختی کارڈ نمبر 13 ہندسوں کا ہونا چاہیے۔";
  }

  if (!/^(?=.{3,12}$)[A-Z0-9]+(?:-[A-Z0-9]+)*$/.test(data.vehicle)) {
    errors.vehicle = "گاڑی نمبر میں 3 سے 12 حروف یا اعداد ہوں۔ درمیان میں - لگایا جا سکتا ہے۔";
  }

  if (!data.province) {
    errors.province = "اپنے گاڑی کے ریکارڈ کے مطابق صوبہ یا علاقہ منتخب کریں۔";
  }

  if (!/^\d{8}$/.test(data.date)) {
    errors.date = "رجسٹریشن کی تاریخ DDMMYYYY فارمیٹ میں 8 ہندسے ہونی چاہیے۔";
  } else {
    const day = Number(data.date.slice(0, 2));
    const month = Number(data.date.slice(2, 4));
    const year = Number(data.date.slice(4));
    const daysInMonth = new Date(year, month, 0).getDate();
    const validCalendarDate = year >= 1900 && year <= 2100 && month >= 1 && month <= 12 && day >= 1 && day <= daysInMonth;

    if (!validCalendarDate) {
      errors.date = "درست رجسٹریشن تاریخ درج کریں۔";
    } else {
      const registrationDate = new Date(year, month - 1, day);
      const minimumDate = new Date(2006, 0, 1);

      if (registrationDate < minimumDate) {
        errors.date = "رجسٹریشن یکم جنوری 2006 یا اس کے بعد کی ہونی چاہیے۔";
      }
    }
  }

  return errors;
}
