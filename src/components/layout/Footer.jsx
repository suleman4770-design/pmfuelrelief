import { ArrowUpRight, ShieldCheck } from "lucide-react";

export default function Footer({ setPage }) {
  return (
    <footer className="site-footer">
      <div className="wrap footer-main">
        <div className="footer-brand"><span className="brand-mark brand-logo" aria-hidden="true"><img src="/brand/9771-mark.svg" alt="" /></span><div><strong>9771 SMS گائیڈ</strong><p>9771 رجسٹریشن SMS تیار کرنے کی آسان گائیڈ۔</p></div></div>
        <div className="footer-links">
          <a href="/privacy" onClick={(event) => { event.preventDefault(); setPage("privacy"); }}>رازداری</a>
          <a href="/faqs" onClick={(event) => { event.preventDefault(); setPage("faqs"); }}>سوالات</a>
        </div>
        <div className="footer-privacy"><ShieldCheck size={16} /><span>آپ کی درج کی گئی معلومات یہ ویب سائٹ محفوظ نہیں کرتی۔</span></div>
      </div>
      <div className="wrap footer-bottom"><span>آزاد معلوماتی گائیڈ · تازہ سرکاری ہدایات ضرور چیک کریں۔</span><button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>اوپر جائیں <ArrowUpRight size={13} /></button></div>
    </footer>
  );
}
