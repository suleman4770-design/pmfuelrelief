import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqs } from "../../data/scheme";

export default function Faqs() {
  return (
    <main className="page wrap">
      <p className="eyebrow">PM Fuel Relief · 9771</p>
      <h1>9771 SMS رجسٹریشن کے عام سوالات</h1>
      <p className="page-lede">یہاں 9771 رجسٹریشن، گاڑی نمبر، پنجاب اور دوسرے صوبوں کے کوڈ، DDMMYYYY تاریخ اور SMS کے طریقے کے بارے میں آسان اردو میں جواب دیے گئے ہیں۔</p>
      <div className="faq-list">{faqs.map(([q, a], i) => <Faq key={q} q={q} a={a} openDefault={i === 0} />)}</div>
    </main>
  );
}

function Faq({ q, a, openDefault }) {
  const [open, setOpen] = useState(openDefault);
  return (
    <div className="faq">
      <button onClick={() => setOpen(!open)} aria-expanded={open}><span>{q}</span><ChevronDown className={open ? "rotate" : ""} size={19} /></button>
      {open && <p>{a}</p>}
    </div>
  );
}
