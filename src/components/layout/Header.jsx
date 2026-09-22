import { useEffect, useState } from "react";
import { ExternalLink, Menu, X } from "lucide-react";
import { scheme } from "../../data/scheme";

const navItems = [
  ["home", "Guide", "/"],
  ["privacy", "Privacy", "/privacy"],
  ["faqs", "FAQs", "/faqs"],
];

export default function Header({ page, setPage }) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    document.body.classList.add("menu-open");
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.body.classList.remove("menu-open");
    };
  }, [menuOpen]);

  const navigate = (event, nextPage) => {
    event.preventDefault();
    setPage(nextPage);
    setMenuOpen(false);
  };

  return (
    <header className="site-header">
      <div className="wrap header-inner">
        <a className="brand" href="/" onClick={(event) => navigate(event, "home")} aria-label="9771 SMS Guide home">
          <span className="brand-mark brand-logo" aria-hidden="true">
            <img src="/brand/9771-mark.svg" alt="" />
          </span>
          <span className="brand-text">
            <strong>9771 SMS Guide</strong>
            <small>Independent registration helper</small>
          </span>
        </a>

        <div className="header-right">
          <nav className="main-nav" aria-label="Main navigation">
            {navItems.map(([value, label, href]) => (
              <a key={value} href={href} className={page === value ? "active" : ""} onClick={(event) => navigate(event, value)}>{label}</a>
            ))}
            <a href={scheme.officialUrl} target="_blank" rel="noreferrer" className="official-link">
              Official <ExternalLink size={13} />
            </a>
          </nav>
          <span className="header-status"><i /> Browser only</span>
          <button
            type="button"
            className={`mobile-menu-trigger ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen((value) => !value)}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <div className={`mobile-menu-layer ${menuOpen ? "open" : ""}`}>
        <button className="mobile-menu-backdrop" aria-label="Close menu" onClick={() => setMenuOpen(false)} />
        <nav id="mobile-navigation" className="mobile-menu" aria-label="Mobile navigation">
          <div className="mobile-menu-top">
            <span>Navigation</span>
            <span className="mobile-menu-badge"><i /> Browser only</span>
          </div>
          <div className="mobile-menu-links">
            {navItems.map(([value, label, href], index) => (
              <a key={value} href={href} className={page === value ? "active" : ""} onClick={(event) => navigate(event, value)}>
                <span>0{index + 1}</span>
                <strong>{label}</strong>
              </a>
            ))}
            <a href={scheme.officialUrl} target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}>
              <span>04</span>
              <strong>Official information</strong>
              <ExternalLink size={16} />
            </a>
          </div>
          <div className="mobile-menu-foot">
            <span>9771 SMS Guide</span>
            <small>No account. Nothing submitted.</small>
          </div>
        </nav>
      </div>
    </header>
  );
}
