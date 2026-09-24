import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";
import {
  Check,
  CheckCircle2,
  ChevronDown,
  Clipboard,
  Copy,
  Image as ImageIcon,
  Link as LinkIcon,
  RotateCcw,
  Send,
  Share2,
  ShieldCheck,
  X,
} from "lucide-react";
import { PROVINCES, scheme } from "../../data/scheme";
import { buildSms, normalizeCnic, normalizeDate, normalizeVehicle } from "../../utils/format";
import { validateRegistration } from "../../utils/validation";

function FieldStatus({ state, count, total }) {
  if (state === "valid") return <span className="field-status valid"><Check size={13} /> درست ہے</span>;
  if (state === "error") return <span className="field-status error">چیک کریں</span>;
  if (count !== undefined && total !== undefined && count > 0) return <span className="field-status count">{count}/{total}</span>;
  return null;
}

function FieldExample({ src, alt, title }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const modal = (
    <AnimatePresence>
      {open && (
        <motion.div
          className="image-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={() => setOpen(false)}
        >
          <motion.div
            className="image-modal"
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.2, 0.8, 0.2, 1] }}
            onMouseDown={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={`${title} کی مثال`}
          >
            <button className="modal-close" type="button" onClick={() => setOpen(false)} aria-label="تصویر بند کریں">
              <X size={18} />
            </button>
            <div className="modal-kicker">مثال</div>
            <h3>{title}</h3>
            <div className="image-frame"><img src={src} alt={alt} /></div>
            <p>اپنی گاڑی کے کاغذات میں موجود یہی معلومات استعمال کریں۔</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <button className="example-button" type="button" onClick={() => setOpen(true)} aria-label={`${title} کی مثال دیکھیں`}>
        <ImageIcon size={14} /> <span>مثال دیکھیں</span>
      </button>
      {typeof document !== "undefined" ? createPortal(modal, document.body) : null}
    </>
  );
}

function SharePanel() {
  const [copied, setCopied] = useState(false);
  const url = window.location.href;
  const encodedUrl = encodeURIComponent(url);
  const shareText = "9771 رجسٹریشن SMS تیار کرنے کے لیے یہ گائیڈ دیکھیں۔";
  const encodedText = encodeURIComponent(`${shareText} ${url}`);
  const openShare = (target) => window.open(target, "_blank", "noopener,noreferrer,width=720,height=640");
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  return (
    <div className="share-panel">
      <div className="share-panel-head">
        <div>
          <span className="eyebrow">گائیڈ شیئر کریں</span>
          <strong>لنک شیئر کریں، اپنی ذاتی معلومات نہیں۔</strong>
        </div>
        <LinkIcon size={16} />
      </div>
      <div className="share-grid">
        <button type="button" className="share-card whatsapp" onClick={() => openShare(`https://wa.me/?text=${encodedText}`)}><b>WA</b><span>واٹس ایپ</span></button>
        <button type="button" className="share-card facebook" onClick={() => openShare(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`)}><b>f</b><span>فیس بک</span></button>
        <button type="button" className="share-card telegram" onClick={() => openShare(`https://t.me/share/url?url=${encodedUrl}&text=${encodeURIComponent(shareText)}`)}><b>↗</b><span>ٹیلیگرام</span></button>
        <button type="button" className="share-card copy-link" onClick={copyLink}><b><LinkIcon size={15} /></b><span>{copied ? "کاپی ہو گیا" : "لنک کاپی کریں"}</span></button>
      </div>
    </div>
  );
}

function SuccessModal({ sms, onClose }) {
  const [shareOpen, setShareOpen] = useState(false);
  return (
    <AnimatePresence>
      <motion.div className="success-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
        <motion.div
          className="success-modal"
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 14, scale: 0.98 }}
          transition={{ duration: 0.24, ease: [0.2, 0.9, 0.2, 1] }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="success-title"
          onClick={(event) => event.stopPropagation()}
        >
          <button className="modal-close" type="button" onClick={onClose} aria-label="تصدیق بند کریں"><X size={18} /></button>
          <div className="success-icon-stage" aria-hidden="true">
            <motion.div className="success-icon-ring" initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }} />
            <motion.div className="success-icon" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.05, type: "spring", stiffness: 420, damping: 24 }}>
              <motion.svg viewBox="0 0 32 32" width="34" height="34" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                <motion.path d="M8 16.5 13.2 22 24 10.8" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.18, duration: 0.38, ease: "easeOut" }} />
              </motion.svg>
            </motion.div>
          </div>
          <span className="success-kicker">کلپ بورڈ میں کاپی ہو گیا</span>
          <h2 id="success-title">آپ کا SMS تیار ہے۔</h2>
          <p className="success-subtitle">نیچے دیا گیا بالکل یہی متن کاپی ہو گیا ہے۔ اب اسے اپنے فون سے بھیجیں۔</p>

          <div className="success-sms">
            <span>SMS برائے {scheme.smsRecipient}</span>
            <code>{sms}</code>
          </div>

          <div className="next-step">
            <div className="next-step-icon"><Send size={16} /></div>
            <div><strong>پیغام بھیجیں</strong><p>اپنے فون کی Messages ایپ کھولیں اور یہی پیغام اس نمبر پر بھیجیں: <b>{scheme.smsRecipient}</b>.</p></div>
          </div>

          <button type="button" className="share-toggle" onClick={() => setShareOpen((value) => !value)}>
            <Share2 size={16} /> {shareOpen ? "شیئر کے آپشن بند کریں" : "یہ گائیڈ شیئر کریں"}
          </button>
          <AnimatePresence initial={false}>{shareOpen && <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}><SharePanel /></motion.div>}</AnimatePresence>
          <button type="button" className="done-button" onClick={onClose}>ٹھیک ہے</button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function TextField({ id, label, hint, placeholder, value, onChange, onBlur, error, touched, valid, count, total, inputMode, example }) {
  const state = error && touched ? "error" : valid ? "valid" : "neutral";
  return (
    <div className={`field ${state}`}>
      <div className="field-head">
        <div><label htmlFor={id}>{label}</label><span>{hint}</span></div>
        <FieldStatus state={state} count={count} total={total} />
      </div>
      <div className="input-wrap">
        <input id={id} value={value} onChange={(event) => onChange(event.target.value)} onBlur={onBlur} inputMode={inputMode} autoComplete="off" placeholder={placeholder} aria-invalid={Boolean(error && touched)} aria-describedby={error && touched ? `${id}-error` : undefined} className={value ? "has-value" : ""} />
        {!String(value ?? "").trim() && example && <span className="input-example">{example}</span>}
        {valid && <span className="input-valid"><Check size={15} /></span>}
      </div>
      <div className="field-footer">
        <span>{valid ? "SMS کے لیے تیار" : hint}</span>
      </div>
      {error && touched && <p className="field-error" id={`${id}-error`}><span>غلطی:</span> {error}</p>}
    </div>
  );
}

export default function RegistrationForm() {
  const [form, setForm] = useState({ cnic: "", vehicle: "", province: "", date: "" });
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [success, setSuccess] = useState(false);
  const errors = useMemo(() => validateRegistration(form), [form]);
  const readyCount = ["cnic", "vehicle", "province", "date"].filter((key) => !errors[key]).length;
  const sms = readyCount === 4 ? buildSms(form) : "";
  const progress = Math.round((readyCount / 4) * 100);

  const update = (key, rawValue) => {
    const value = key === "cnic" ? normalizeCnic(rawValue) : key === "vehicle" ? normalizeVehicle(rawValue) : key === "date" ? normalizeDate(rawValue) : rawValue;
    setForm((current) => ({ ...current, [key]: value }));
  };
  const markTouched = (key) => setTouched((current) => ({ ...current, [key]: true }));

  const copySms = async () => {
    setSubmitted(true);
    setTouched({ cnic: true, vehicle: true, province: true, date: true });
    if (!sms) return;
    try {
      await navigator.clipboard.writeText(sms);
      setSuccess(true);
    } catch {}
  };

  const shareSite = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) await navigator.share({ title: "9771 SMS گائیڈ", text: "اپنا 9771 رجسٹریشن SMS تیار کریں۔", url });
      else await navigator.clipboard.writeText(url);
    } catch {}
  };

  const reset = () => {
    setForm({ cnic: "", vehicle: "", province: "", date: "" });
    setTouched({});
    setSubmitted(false);
    setSuccess(false);
  };

  return (
    <>
      <section className="builder-section" id="sms-builder">
        <div className="builder-topline">
          <div>
            <span className="eyebrow">01 / SMS تیار کریں</span>
            <h2>اپنی معلومات ایک بار درج کریں۔</h2>
            <p>SMS آپ کے براؤزر میں ہی تیار ہوتا ہے۔ اس صفحے سے کوئی درخواست جمع نہیں ہوتی۔</p>
          </div>
          <div className="progress-block" aria-label={`${readyCount} میں سے 4 معلومات مکمل`}>
            <div className="progress-meta"><span>{readyCount}/4 مکمل</span><strong>{progress}%</strong></div>
            <div className="progress-track"><span style={{ width: `${progress}%` }} /></div>
          </div>
        </div>

        <div className="builder-shell">
          <div className="builder-fields">
            <div className="builder-heading-row">
              <div><span className="section-chip">آپ کی معلومات</span><h3>اپنا SMS تیار کریں۔</h3></div>
              <div className="data-safety-inline" role="note" aria-label="NO DATA SAVED">
                <ShieldCheck size={16} aria-hidden="true" />
                <div>
                  <strong>NO DATA SAVED</strong>
                  <span>آپ کی معلومات اس ویب سائٹ پر محفوظ نہیں کی جاتیں۔</span>
                </div>
              </div>
            </div>

            {submitted && Object.keys(errors).length > 0 && (
              <div className="error-summary" role="alert">
                <div><strong>جن خانوں کو نشان زد کیا گیا ہے انہیں چیک کریں۔</strong><span>نیچے دیا گیا پیغام بتاتا ہے کہ کیا درست کرنا ہے۔</span></div>
              </div>
            )}

            <form noValidate onSubmit={(event) => { event.preventDefault(); copySms(); }}>
              <TextField
                id="cnic"
                label="شناختی کارڈ نمبر (CNIC)"
                hint="13 ہندسے"
                placeholder="3520212345671"
                value={form.cnic}
                onChange={(value) => update("cnic", value)}
                onBlur={() => markTouched("cnic")}
                error={errors.cnic}
                touched={touched.cnic || submitted}
                valid={/^\d{13}$/.test(form.cnic)}
                count={form.cnic.length}
                total={13}
                inputMode="numeric"
              />

              <TextField
                id="vehicle"
                label="گاڑی نمبر"
                hint="3–12 حروف، اعداد یا -"
                placeholder="ALE-14-201 یا ALE14201"
                value={form.vehicle}
                onChange={(value) => update("vehicle", value)}
                onBlur={() => markTouched("vehicle")}
                error={errors.vehicle}
                touched={touched.vehicle || submitted}
                valid={/^(?=.{3,12}$)[A-Z0-9]+(?:-[A-Z0-9]+)*$/.test(form.vehicle)}
                count={form.vehicle.length}
                total={12}
                example={<FieldExample src="/images/vehicle-registration.jpg" alt="گاڑی نمبر کی مثال" title="گاڑی نمبر" />}
              />

              <div className={`field ${errors.province && (touched.province || submitted) ? "error" : form.province ? "valid" : "neutral"}`}>
                <div className="field-head">
                  <div><label htmlFor="province">صوبہ / علاقہ</label><span>ایک منتخب کریں</span></div>
                  <FieldStatus state={form.province ? "valid" : "neutral"} />
                </div>
                <div className="select-wrap">
                  <select id="province" value={form.province} onChange={(event) => update("province", event.target.value)} onBlur={() => markTouched("province")} aria-invalid={Boolean(errors.province && (touched.province || submitted))}>
                    <option value="">صوبہ / علاقہ منتخب کریں</option>
                    {PROVINCES.map((item) => <option key={item.code} value={item.code}>{item.name} ({item.code})</option>)}
                  </select>
                  <ChevronDown size={17} />
                </div>
                <div className="field-footer"><span>{form.province ? "SMS کے لیے تیار" : "اپنے گاڑی کے ریکارڈ والا صوبہ یا علاقہ منتخب کریں"}</span></div>
                {errors.province && (touched.province || submitted) && <p className="field-error"><span>غلطی:</span> {errors.province}</p>}
              </div>

              <TextField
                id="date"
                label="گاڑی کی رجسٹریشن کی تاریخ"
                hint="DDMMYYYY · یکم جنوری 2006 یا بعد کی"
                placeholder="15082015"
                value={form.date}
                onChange={(value) => update("date", value)}
                onBlur={() => markTouched("date")}
                error={errors.date}
                touched={touched.date || submitted}
                valid={/^\d{8}$/.test(form.date) && !errors.date}
                count={form.date.length}
                total={8}
                inputMode="numeric"
                example={<FieldExample src="/images/registration-date.jpg" alt="رجسٹریشن کی تاریخ کی مثال" title="رجسٹریشن کی تاریخ" />}
              />

              <div className="builder-actions">
                <button className="primary-action" type="submit"><Copy size={17} /> SMS کاپی کریں</button>
                <button className="secondary-action" type="button" onClick={shareSite}><Share2 size={17} /> گائیڈ شیئر کریں</button>
                <button className="text-action" type="button" onClick={reset}><RotateCcw size={15} /> دوبارہ شروع کریں</button>
              </div>
            </form>
          </div>

          <aside className={`preview-panel ${sms ? "ready" : ""}`} aria-live="polite">
            <div className="preview-panel-top">
              <div><span className="eyebrow">02 / SMS کا پیش منظر</span><h3>SMS برائے {scheme.smsRecipient}</h3></div>
              <span className={`preview-state ${sms ? "ready" : ""}`}><i /> {sms ? "تیار" : "انتظار"}</span>
            </div>

            <div className="sms-sheet">
              <div className="sms-sheet-head"><div className="recipient-avatar">9</div><div><strong>{scheme.smsRecipient}</strong><span>SMS نمبر</span></div></div>
              <div className="sms-sheet-body">
                <AnimatePresence mode="wait">
                  {sms ? (
                    <motion.div className="sms-complete" key={sms} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}>
                      <span className="sms-badge">تیار</span>
                      <code>{sms}</code>
                    </motion.div>
                  ) : (
                    <motion.div className="sms-placeholder" key="placeholder" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <span className="placeholder-line wide" /><span className="placeholder-line" /><span className="placeholder-line short" />
                      <p>چاروں معلومات مکمل کریں، تیار SMS یہاں نظر آئے گا۔</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className="sms-sheet-footer"><span>یہی متن بھیجیں</span><strong>{scheme.smsRecipient}</strong></div>
            </div>

            <div className="preview-callout">
              <div className="preview-callout-icon"><CheckCircle2 size={16} /></div>
              <div><strong>{sms ? "تمام معلومات درست ہیں۔" : "یہاں سے کچھ نہیں بھیجا جاتا۔"}</strong><span>{sms ? "SMS کاپی کریں اور اپنے فون کی SMS ایپ سے خود بھیجیں۔" : "یہ صفحہ صرف متن تیار کرتا ہے۔ SMS آپ خود بھیجتے ہیں۔"}</span></div>
            </div>

            <div className="data-safety-badge" aria-label="فارم کا ڈیٹا محفوظ نہیں کیا جاتا">
              <ShieldCheck size={18} aria-hidden="true" />
              <strong>NO DATA SAVED</strong>
              <span>آپ کی CNIC، گاڑی نمبر اور تاریخ اس ویب سائٹ کے فارم بیک اینڈ میں محفوظ نہیں کی جاتیں۔</span>
            </div>

            <div className="preview-privacy"><ShieldCheck size={15} /><span>آپ کی درج کردہ معلومات اسی صفحے پر رہتی ہیں اور اس ویب سائٹ کو جمع نہیں کرائی جاتیں۔</span></div>
          </aside>
        </div>

        <div className="builder-footnote"><Clipboard size={15} /><span>فارمیٹ آپ کا براؤزر تیار کرتا ہے۔ اکاؤنٹ، فارم جمع کرانے یا ڈیٹا بیس کی ضرورت نہیں۔</span></div>
      </section>

      {success && <SuccessModal sms={sms} onClose={() => setSuccess(false)} />}
    </>
  );
}
