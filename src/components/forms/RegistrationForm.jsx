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
  if (state === "valid") return <span className="field-status valid"><Check size={13} /> Looks good</span>;
  if (state === "error") return <span className="field-status error">Check this</span>;
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
            aria-label={`${title} example`}
          >
            <button className="modal-close" type="button" onClick={() => setOpen(false)} aria-label="Close image">
              <X size={18} />
            </button>
            <div className="modal-kicker">Example</div>
            <h3>{title}</h3>
            <div className="image-frame"><img src={src} alt={alt} /></div>
            <p>Use the matching information from your vehicle document.</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <button className="example-button" type="button" onClick={() => setOpen(true)} aria-label={`View ${title} example`}>
        <ImageIcon size={14} /> <span>See example</span>
      </button>
      {typeof document !== "undefined" ? createPortal(modal, document.body) : null}
    </>
  );
}

function SharePanel() {
  const [copied, setCopied] = useState(false);
  const url = window.location.href;
  const encodedUrl = encodeURIComponent(url);
  const shareText = "Use this guide to prepare the 9771 registration SMS.";
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
          <span className="eyebrow">Share the guide</span>
          <strong>Send the link, not your personal details.</strong>
        </div>
        <LinkIcon size={16} />
      </div>
      <div className="share-grid">
        <button type="button" className="share-card whatsapp" onClick={() => openShare(`https://wa.me/?text=${encodedText}`)}><b>WA</b><span>WhatsApp</span></button>
        <button type="button" className="share-card facebook" onClick={() => openShare(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`)}><b>f</b><span>Facebook</span></button>
        <button type="button" className="share-card telegram" onClick={() => openShare(`https://t.me/share/url?url=${encodedUrl}&text=${encodeURIComponent(shareText)}`)}><b>↗</b><span>Telegram</span></button>
        <button type="button" className="share-card copy-link" onClick={copyLink}><b><LinkIcon size={15} /></b><span>{copied ? "Copied" : "Copy link"}</span></button>
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
          <button className="modal-close" type="button" onClick={onClose} aria-label="Close confirmation"><X size={18} /></button>
          <div className="success-icon-stage" aria-hidden="true">
            <motion.div className="success-icon-ring" initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }} />
            <motion.div className="success-icon" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.05, type: "spring", stiffness: 420, damping: 24 }}>
              <motion.svg viewBox="0 0 32 32" width="34" height="34" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                <motion.path d="M8 16.5 13.2 22 24 10.8" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.18, duration: 0.38, ease: "easeOut" }} />
              </motion.svg>
            </motion.div>
          </div>
          <span className="success-kicker">Copied to clipboard</span>
          <h2 id="success-title">Your message is ready.</h2>
          <p className="success-subtitle">The exact text below is now on your clipboard. One step remains.</p>

          <div className="success-sms">
            <span>SMS TO {scheme.smsRecipient}</span>
            <code>{sms}</code>
          </div>

          <div className="next-step">
            <div className="next-step-icon"><Send size={16} /></div>
            <div><strong>Send the message</strong><p>Open your phone's Messages app and send this exact text to <b>{scheme.smsRecipient}</b>.</p></div>
          </div>

          <button type="button" className="share-toggle" onClick={() => setShareOpen((value) => !value)}>
            <Share2 size={16} /> {shareOpen ? "Close share options" : "Share this guide"}
          </button>
          <AnimatePresence initial={false}>{shareOpen && <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}><SharePanel /></motion.div>}</AnimatePresence>
          <button type="button" className="done-button" onClick={onClose}>Done</button>
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
        <span>{valid ? "Ready for the SMS" : hint}</span>
      </div>
      {error && touched && <p className="field-error" id={`${id}-error`}><span>Error:</span> {error}</p>}
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
      if (navigator.share) await navigator.share({ title: "9771 SMS Guide", text: "Prepare your 9771 registration SMS.", url });
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
            <span className="eyebrow">01 / SMS builder</span>
            <h2>Enter the details once.</h2>
            <p>We format the message locally in your browser. Nothing is submitted from this page.</p>
          </div>
          <div className="progress-block" aria-label={`${readyCount} of 4 details complete`}>
            <div className="progress-meta"><span>{readyCount}/4 complete</span><strong>{progress}%</strong></div>
            <div className="progress-track"><span style={{ width: `${progress}%` }} /></div>
          </div>
        </div>

        <div className="builder-shell">
          <div className="builder-fields">
            <div className="builder-heading-row">
              <div><span className="section-chip">Your information</span><h3>Let's build your message.</h3></div>
              <div className="browser-only"><ShieldCheck size={15} /> Browser only</div>
            </div>

            {submitted && Object.keys(errors).length > 0 && (
              <div className="error-summary" role="alert">
                <div><strong>Check the highlighted fields.</strong><span>Each message below tells you exactly what to change.</span></div>
              </div>
            )}

            <form noValidate onSubmit={(event) => { event.preventDefault(); copySms(); }}>
              <TextField
                id="cnic"
                label="CNIC"
                hint="13 digits"
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
                label="Vehicle number"
                hint="3–12 letters or numbers"
                placeholder="ALE-14-201"
                value={form.vehicle}
                onChange={(value) => update("vehicle", value)}
                onBlur={() => markTouched("vehicle")}
                error={errors.vehicle}
                touched={touched.vehicle || submitted}
                valid={/^[A-Z0-9]{3,12}$/.test(form.vehicle)}
                count={form.vehicle.length}
                total={12}
                example={<FieldExample src="/images/vehicle-registration.jpg" alt="Example showing a vehicle registration number" title="Vehicle number" />}
              />

              <div className={`field ${errors.province && (touched.province || submitted) ? "error" : form.province ? "valid" : "neutral"}`}>
                <div className="field-head">
                  <div><label htmlFor="province">Province / region</label><span>Choose one</span></div>
                  <FieldStatus state={form.province ? "valid" : "neutral"} />
                </div>
                <div className="select-wrap">
                  <select id="province" value={form.province} onChange={(event) => update("province", event.target.value)} onBlur={() => markTouched("province")} aria-invalid={Boolean(errors.province && (touched.province || submitted))}>
                    <option value="">Select province / region</option>
                    {PROVINCES.map((item) => <option key={item.code} value={item.code}>{item.name} ({item.code})</option>)}
                  </select>
                  <ChevronDown size={17} />
                </div>
                <div className="field-footer"><span>{form.province ? "Ready for the SMS" : "Select the region shown on your vehicle record"}</span></div>
                {errors.province && (touched.province || submitted) && <p className="field-error"><span>Error:</span> {errors.province}</p>}
              </div>

              <TextField
                id="date"
                label="Vehicle registration date"
                hint="DDMMYYYY"
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
                example={<FieldExample src="/images/registration-date.jpg" alt="Example showing the vehicle registration date" title="Registration date" />}
              />

              <div className="builder-actions">
                <button className="primary-action" type="submit"><Copy size={17} /> Copy SMS</button>
                <button className="secondary-action" type="button" onClick={shareSite}><Share2 size={17} /> Share guide</button>
                <button className="text-action" type="button" onClick={reset}><RotateCcw size={15} /> Reset</button>
              </div>
            </form>
          </div>

          <aside className={`preview-panel ${sms ? "ready" : ""}`} aria-live="polite">
            <div className="preview-panel-top">
              <div><span className="eyebrow">02 / live preview</span><h3>Message to {scheme.smsRecipient}</h3></div>
              <span className={`preview-state ${sms ? "ready" : ""}`}><i /> {sms ? "Ready" : "Waiting"}</span>
            </div>

            <div className="sms-sheet">
              <div className="sms-sheet-head"><div className="recipient-avatar">9</div><div><strong>{scheme.smsRecipient}</strong><span>SMS destination</span></div></div>
              <div className="sms-sheet-body">
                <AnimatePresence mode="wait">
                  {sms ? (
                    <motion.div className="sms-complete" key={sms} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}>
                      <span className="sms-badge">Ready</span>
                      <code>{sms}</code>
                    </motion.div>
                  ) : (
                    <motion.div className="sms-placeholder" key="placeholder" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <span className="placeholder-line wide" /><span className="placeholder-line" /><span className="placeholder-line short" />
                      <p>Complete the four fields and your finished message will appear here.</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className="sms-sheet-footer"><span>Send exactly this text</span><strong>{scheme.smsRecipient}</strong></div>
            </div>

            <div className="preview-callout">
              <div className="preview-callout-icon"><CheckCircle2 size={16} /></div>
              <div><strong>{sms ? "Everything checks out." : "Nothing is sent from here."}</strong><span>{sms ? "Copy the message, then send it using your phone's SMS app." : "This page only prepares text. You stay in control of sending."}</span></div>
            </div>

            <div className="preview-privacy"><ShieldCheck size={15} /><span>Your entered details remain on this page and are not submitted to this website.</span></div>
          </aside>
        </div>

        <div className="builder-footnote"><Clipboard size={15} /><span>Your browser handles the formatting. No account, form submission or database is needed.</span></div>
      </section>

      {success && <SuccessModal sms={sms} onClose={() => setSuccess(false)} />}
    </>
  );
}
