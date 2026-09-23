import { ArrowLeft, CheckCircle2, ClipboardCheck, Send } from "lucide-react";

const items = [
  { no: "01", title: "معلومات لکھیں", text: "چار ضروری معلومات درج کریں اور گاڑی نمبر کو اپنے کاغذات کے مطابق لکھیں۔", note: "CNIC · گاڑی نمبر · صوبہ · تاریخ", icon: ClipboardCheck },
  { no: "02", title: "SMS چیک کریں", text: "دائیں طرف تیار ہونے والا SMS دیکھیں تاکہ بھیجنے سے پہلے ترتیب درست ہو۔", note: "فارمیٹ بھیجنے سے پہلے نظر آئے گا", icon: CheckCircle2 },
  { no: "03", title: "خود بھیجیں", text: "SMS کاپی کریں اور اپنے فون سے 9771 پر بھیج دیں۔", note: "SMS بھیجنے کا اختیار آپ کے پاس ہے", icon: Send },
];

export default function HowItWorks() {
  return (
    <div className="flow-grid">
      {items.map(({ no, title, text, note, icon: Icon }, index) => (
        <article className="flow-card" key={no}>
          <div className="flow-card-top"><span>{no}</span><Icon size={18} strokeWidth={1.7} /></div>
          <h3>{title}</h3>
          <p>{text}</p>
          <small>{note}</small>
          {index < 2 && <ArrowLeft className="flow-arrow" size={18} />}
        </article>
      ))}
    </div>
  );
}
