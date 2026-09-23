import { ArrowUpRight, MessageCircleMore } from "lucide-react";
import { scheme } from "../../data/scheme";

export default function AfterRegistration() {
  return (
    <section className="after-card">
      <div className="after-main">
        <span className="eyebrow">04 / SMS کاپی کرنے کے بعد</span>
        <h2>آخری مرحلہ آپ خود کریں۔</h2>
        <p>ہم آپ کی طرف سے SMS نہیں بھیجتے۔ پیغام دوبارہ دیکھیں، اپنے فون کی Messages ایپ کھولیں اور اسے خود بھیجیں۔</p>
      </div>
      <div className="after-send">
        <div className="after-send-top"><span className="after-icon"><MessageCircleMore size={19} /></span><span>SMS کہاں بھیجنا ہے؟</span></div>
        <strong>{scheme.smsRecipient}</strong>
        <small>اپنی SMS ایپ کھولیں اور تیار کیا گیا پیغام بھیجیں۔</small>
        <a href={scheme.officialUrl} target="_blank" rel="noreferrer">سرکاری معلومات دیکھیں <ArrowUpRight size={14} /></a>
      </div>
    </section>
  );
}
