import { ArrowUpRight, ShieldCheck } from "lucide-react";

export default function Footer({ setPage }) {
  return (
    <footer className="site-footer">
      <div className="wrap footer-main">
        <div className="footer-brand"><span className="brand-mark brand-logo" aria-hidden="true"><img src="/brand/9771-mark.svg" alt="" /></span><div><strong>9771 SMS Guide</strong><p>A simple browser tool for preparing your SMS.</p></div></div>
        <div className="footer-links">
          <a href="/privacy" onClick={(event) => { event.preventDefault(); setPage("privacy"); }}>Privacy</a>
          <a href="/faqs" onClick={(event) => { event.preventDefault(); setPage("faqs"); }}>FAQs</a>
        </div>
        <div className="footer-privacy"><ShieldCheck size={16} /><span>Your entered details are not saved by this website.</span></div>
      </div>
      <div className="wrap footer-bottom"><span>Independent guide · Always confirm the latest official instructions.</span><button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Back to top <ArrowUpRight size={13} /></button></div>
    </footer>
  );
}
