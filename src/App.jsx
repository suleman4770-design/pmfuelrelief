import { useEffect, useState } from "react";
import { ArrowDown, ArrowRight, Check, ChevronLeft, ShieldCheck, Smartphone } from "lucide-react";
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
    if (window.location.pathname !== target) window.history.pushState({}, "", target);
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
    document.documentElement.lang = "ur-PK";
    document.documentElement.dir = "rtl";
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
              <div className="hero-kicker"><span>9771</span><i /> PM Fuel Relief · SMS رجسٹریشن گائیڈ</div>
              <h1>PM Fuel Relief 9771<br /><em>SMS آسانی سے تیار کریں۔</em></h1>
              <p className="hero-lede">اگر آپ 9771 SMS رجسٹریشن، PM Fuel Relief یا پٹرول ریلیف کے طریقے کی تلاش میں ہیں تو یہ آسان گائیڈ استعمال کریں۔ اپنی CNIC، گاڑی نمبر، صوبہ کوڈ اور رجسٹریشن تاریخ درج کریں، SMS دیکھیں اور پھر خود بھیجیں۔</p>
              <div className="hero-actions">
                <button className="hero-primary" onClick={goBuilder}>SMS تیار کریں <ArrowDown size={17} /></button>
                <div className="hero-note"><ShieldCheck size={16} /><span>اکاؤنٹ نہیں۔ معلومات یہاں جمع نہیں ہوتیں۔</span></div>
              </div>
              <div className="hero-rail">
                <div><strong>01</strong><span>معلومات لکھیں</span></div><ChevronLeft size={15} /><div><strong>02</strong><span>SMS چیک کریں</span></div><ChevronLeft size={15} /><div><strong>03</strong><span>کاپی اور بھیجیں</span></div>
              </div>
            </div>

            <div className="hero-visual" aria-hidden="true">
              <div className="hero-number">9771</div>
              <div className="sms-receipt">
                <div className="receipt-topline"><span>SMS پیش منظر</span><span>تیار</span></div>
                <div className="receipt-destination"><div className="receipt-mark">9</div><div><strong>9771</strong><small>SMS نمبر</small></div><span className="receipt-time">9:41 PM</span></div>
                <div className="receipt-rule" />
                <div className="receipt-label">رجسٹریشن SMS</div>
                <div className="receipt-copy">REG 3520212345671<br />ALE-14-201 P 15082015</div>
                <div className="receipt-meta"><span>4 معلومات</span><span>1 پیغام</span></div>
                <div className="receipt-foot"><ShieldCheck size={14} /><span>آپ کے براؤزر میں تیار</span></div>
              </div>
              <div className="hero-annotation"><Smartphone size={15} /><span>سادہ، واضح اور استعمال میں آسان</span></div>
            </div>
          </div>
        </section>

        <section className="intro-band wrap">
          <div className="intro-stat"><strong>4</strong><span>ضروری معلومات</span></div>
          <div><p className="eyebrow">PM Fuel Relief · 9771</p><h2>9771 SMS رجسٹریشن فارمیٹ چاہیے؟</h2></div>
          <div className="intro-copy"><p>یہ آزاد گائیڈ آپ کو CNIC، گاڑی نمبر، صوبہ کوڈ اور رجسٹریشن تاریخ سے درست SMS تیار کرنے میں مدد دیتی ہے۔ پیغام بھیجنے سے پہلے مکمل متن آپ کو نظر آتا ہے۔</p></div>
        </section>

        <div className="wrap main-content"><RegistrationForm /></div>

        <section className="process-band">
          <div className="wrap">
            <div className="process-heading"><div><span className="eyebrow">03 / طریقہ</span><h2>صرف تین آسان مرحلے۔</h2></div><p>نہ اکاؤنٹ، نہ پیچیدہ فارم، نہ غیر ضروری معلومات۔</p></div>
            <HowItWorks />
          </div>
        </section>

        <section className="wrap after-section"><AfterRegistration /></section>

        <section className="wrap trust-section">
          <div className="trust-card"><div className="trust-card-icon"><Check size={18} /></div><div><span className="eyebrow">رازداری پہلے</span><h3>آپ کی درج کی گئی معلومات اسی براؤزر میں رہتی ہیں۔</h3><p>یہ گائیڈ مقامی طور پر SMS تیار کرتی ہے۔ لاگ اِن، فارم جمع کرانے یا اکاؤنٹ کی ضرورت نہیں۔</p></div><button type="button" onClick={() => setPage("privacy")}>رازداری پڑھیں <ArrowRight size={16} /></button></div>
        </section>

        <section className="wrap final-note"><span>آزاد گائیڈ</span><p>یہ ویب سائٹ PM Fuel Relief کی آزاد معلوماتی گائیڈ ہے، سرکاری پورٹل نہیں۔ سرکاری طریقہ، اہلیت اور کسی بھی نئی تبدیلی کے لیے ہمیشہ pmfuelrelief.pk اور سرکاری اعلانات کو ترجیح دیں۔</p></section>
      </main>
      <Footer setPage={setPage} />
    </div>
  );
}
