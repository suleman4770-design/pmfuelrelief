import { useEffect, useState } from "react";
import { ArrowDown, ArrowRight, Check, ChevronRight, ShieldCheck, Smartphone } from "lucide-react";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import RegistrationForm from "./components/forms/RegistrationForm";
import HowItWorks from "./components/information/HowItWorks";
import AfterRegistration from "./components/sections/AfterRegistration";
import Privacy from "./components/sections/Privacy";
import Faqs from "./components/sections/Faqs";
import { faqs } from "./data/scheme";
import { applySEO } from "./utils/seo";

function pageFromPath(pathname) {
  const normalized = pathname.replace(/\/+$/, "") || "/";
  if (normalized === "/privacy") return "privacy";
  if (normalized === "/faqs") return "faqs";
  return "home";
}

export default function App() {
  const [page, setPageState] = useState(() => pageFromPath(window.location.pathname));

  const setPage = (nextPage) => {
    const target = nextPage === "home" ? "/" : `/${nextPage}`;
    if (window.location.pathname !== target) {
      window.history.pushState({}, "", target);
    }
    setPageState(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const onPopState = () => setPageState(pageFromPath(window.location.pathname));
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    applySEO(page, faqs);
  }, [page]);

  const goBuilder = () => document.getElementById("sms-builder")?.scrollIntoView({ behavior: "smooth", block: "start" });

  if (page !== "home") {
    return <div className="app-shell"><Header page={page} setPage={setPage} />{page === "privacy" ? <Privacy /> : <Faqs />}<Footer setPage={setPage} /></div>;
  }

  return (
    <div className="app-shell">
      <Header page={page} setPage={setPage} />
      <main>
        <section className="hero-shell">
          <div className="hero-grid wrap">
            <div className="hero-copy">
              <div className="hero-kicker"><span>9771</span><i /> PM Fuel Relief · SMS registration guide</div>
              <h1>PM Fuel Relief 9771 SMS guide.<br /><em>Build it. Send it right.</em></h1>
              <p className="hero-lede">Looking for pmfuelrelief, PM Fuel Relief or the 9771 registration SMS format? Check your four details in this browser-only guide, then copy the finished message.</p>
              <div className="hero-actions">
                <button className="hero-primary" onClick={goBuilder}>Build my SMS <ArrowDown size={17} /></button>
                <div className="hero-note"><ShieldCheck size={16} /><span>No account. Nothing submitted.</span></div>
              </div>
              <div className="hero-rail">
                <div><strong>01</strong><span>Enter</span></div><ChevronRight size={15} /><div><strong>02</strong><span>Check</span></div><ChevronRight size={15} /><div><strong>03</strong><span>Copy &amp; send</span></div>
              </div>
            </div>

            <div className="hero-visual" aria-hidden="true">
              <div className="hero-number">9771</div>
              <div className="sms-receipt">
                <div className="receipt-topline"><span>MESSAGE PREVIEW</span><span>READY</span></div>
                <div className="receipt-destination"><div className="receipt-mark">9</div><div><strong>9771</strong><small>SMS destination</small></div><span className="receipt-time">9:41 PM</span></div>
                <div className="receipt-rule" />
                <div className="receipt-label">REGISTRATION SMS</div>
                <div className="receipt-copy">REG 3520212345671<br />ALE14201 P 15082015</div>
                <div className="receipt-meta"><span>4 details</span><span>1 message</span></div>
                <div className="receipt-foot"><ShieldCheck size={14} /><span>Prepared in your browser</span></div>
              </div>
              <div className="hero-annotation"><Smartphone size={15} /><span>Clear enough to trust. Fast enough to use.</span></div>
            </div>
          </div>
        </section>

        <section className="intro-band wrap">
          <div className="intro-stat"><strong>4</strong><span>details</span></div>
          <div><p className="eyebrow">PM Fuel Relief · 9771</p><h2>Need the 9771 SMS registration format?</h2></div>
          <div className="intro-copy"><p>This independent guide helps you prepare the registration SMS using your CNIC, vehicle number, province code and registration date, with the finished text visible before you copy it.</p></div>
        </section>

        <div className="wrap main-content"><RegistrationForm /></div>

        <section className="process-band">
          <div className="wrap">
            <div className="process-heading"><div><span className="eyebrow">03 / the flow</span><h2>Simple by design.</h2></div><p>No dashboard. No account. No learning curve.</p></div>
            <HowItWorks />
          </div>
        </section>

        <section className="wrap after-section"><AfterRegistration /></section>

        <section className="wrap trust-section">
          <div className="trust-card"><div className="trust-card-icon"><Check size={18} /></div><div><span className="eyebrow">Private by default</span><h3>Your details stay in your browser.</h3><p>This site prepares the text locally. It does not need a login, form submission or account.</p></div><button type="button" onClick={() => setPage("privacy")}>Read privacy <ArrowRight size={16} /></button></div>
        </section>

        <section className="wrap final-note"><span>Independent guide</span><p>Searching for pmfuelrelief or 9771 registration information? This website is an independent SMS guide, not the government portal. Always confirm the latest official instructions before sending personal information.</p></section>
      </main>
      <Footer setPage={setPage} />
    </div>
  );
}
