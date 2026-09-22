import { ArrowUpRight, MessageCircleMore } from "lucide-react";
import { scheme } from "../../data/scheme";

export default function AfterRegistration() {
  return (
    <section className="after-card">
      <div className="after-main">
        <span className="eyebrow">04 / after you copy</span>
        <h2>The last step is yours.</h2>
        <p>We don't send the SMS for you. Review the message, open your phone's messaging app and send it yourself.</p>
      </div>
      <div className="after-send">
        <div className="after-send-top"><span className="after-icon"><MessageCircleMore size={19} /></span><span>Send destination</span></div>
        <strong>{scheme.smsRecipient}</strong>
        <small>Open your SMS app and send the copied message.</small>
        <a href={scheme.officialUrl} target="_blank" rel="noreferrer">Check official information <ArrowUpRight size={14} /></a>
      </div>
    </section>
  );
}
