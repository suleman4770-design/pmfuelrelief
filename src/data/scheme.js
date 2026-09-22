// IMPORTANT: Verify every scheme-specific value against current official sources before publishing.
export const scheme = {
  smsRecipient: "9771",
  command: "REG",
  tokenCommand: "TOK",
  updated: "21 September 2026",
  officialUrl: "https://pmfuelrelief.pk"
};

export const PROVINCES = [
  { code: "P", name: "Punjab" },
  { code: "S", name: "Sindh" },
  { code: "K", name: "Khyber Pakhtunkhwa" },
  { code: "B", name: "Balochistan" },
  { code: "I", name: "Islamabad" },
  { code: "A", name: "Azad Jammu & Kashmir" },
  { code: "G", name: "Gilgit-Baltistan" }
];

export const provinceCodes = PROVINCES;

export const faqs = [
  ["What is the 9771 SMS registration format for PM Fuel Relief?", "The guide prepares the REG message from your CNIC, vehicle number, province code and registration date. Check the latest official instructions before sending it."],
  ["How do I use 9771 for PM Fuel Relief registration?", "Use the browser builder to check the four fields, copy the finished SMS, and send it yourself only after confirming the current official instructions."],
  ["Does this website save my information?", "No. The form is processed in your browser only. It does not send the entered values to this website's server."],
  ["Can I edit my information before copying?", "Yes. Change any field and the SMS preview updates immediately."],
  ["What happens if I type lowercase letters in the vehicle number?", "The vehicle number is automatically displayed in uppercase. For example, ale-14-201 becomes ALE14201 in the generated SMS."],
  ["Are the document images official?", "Only images you place in public/images should be treated as your supplied source material. The built-in guide uses placeholders so it does not pretend to be an official document."],
  ["Does the site send the SMS for me?", "No. It prepares the text and copies it. You choose when and where to send it."],
  ["Which province code should I use for 9771 registration?", "Choose the province or region code shown for your vehicle record in the current instructions. The builder lets you select the code rather than type it manually."],
  ["What date format does the 9771 SMS use?", "The registration date field in this guide uses DDMMYYYY. Check the vehicle record and current official instructions before copying the message."],
  ["Can the PM Fuel Relief 9771 rules change?", "Yes. Government schemes and SMS requirements can change. Always check the latest official instructions before sending personal information."]
];

export const mistakes = [
  "Leaving the CNIC incomplete",
  "Using letters or punctuation in the CNIC field",
  "Entering a vehicle number with spaces or dashes when the required format does not allow them",
  "Using an unsupported province code",
  "Using a registration date that does not match the required format"
];
