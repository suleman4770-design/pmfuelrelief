import { ArrowRight, CheckCircle2, ClipboardCheck, Send } from "lucide-react";

const items = [
  { no: "01", title: "Enter", text: "Add the four details the message needs.", note: "CNIC · vehicle · province · date", icon: ClipboardCheck },
  { no: "02", title: "Check", text: "See the finished text update as you type.", note: "Format shown before you copy", icon: CheckCircle2 },
  { no: "03", title: "Send", text: "Copy the message and send it from your phone.", note: "You stay in control of sending", icon: Send },
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
          {index < 2 && <ArrowRight className="flow-arrow" size={18} />}
        </article>
      ))}
    </div>
  );
}
