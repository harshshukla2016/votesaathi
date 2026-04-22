"use client";

import { useEffect, useRef } from "react";

export default function GoogleTranslate() {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    
    // Add Google Translate script
    const script = document.createElement("script");
    script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);

    // Initialize the widget
    (window as any).googleTranslateElementInit = () => {
      new (window as any).google.translate.TranslateElement(
        {
          pageLanguage: "en",
          layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE,
          includedLanguages: "en,hi,bn,te,mr,ta,gu,kn,ml,pa,as,ur", // Major Indian languages
        },
        "google_translate_element"
      );
    };

    initialized.current = true;
  }, []);

  return (
    <div className="flex items-center gap-3 bg-surface-container-high/50 px-4 py-2 rounded-full border border-outline-variant/10">
      <span className="material-symbols-outlined text-[14px] text-primary">language</span>
      <div id="google_translate_element" className="google-translate-container"></div>
      
      <style jsx global>{`
        .google-translate-container {
          min-width: 140px;
        }
        .goog-te-gadget-simple {
          background-color: transparent !important;
          border: none !important;
          padding: 0 !important;
          font-family: inherit !important;
          display: flex !important;
          align-items: center !important;
        }
        .goog-te-gadget-simple span {
          color: var(--on-surface-variant) !important;
          font-size: 10px !important;
          font-weight: 900 !important;
          text-transform: uppercase !important;
          letter-spacing: 0.1em !important;
        }
        .goog-te-gadget-icon {
          display: none !important;
        }
        .goog-te-menu-value span:nth-child(3) {
          display: none !important;
        }
        .goog-te-menu-value span:nth-child(5) {
          display: none !important;
        }
        .goog-te-menu-value:after {
          content: 'expand_more';
          font-family: 'Material Symbols Outlined';
          font-size: 14px;
          margin-left: 4px;
          color: var(--primary);
        }
        /* Hide Google branding if desired, though usually required by TOS */
        .goog-logo-link {
          display: none !important;
        }
        .goog-te-gadget {
          color: transparent !important;
        }
      `}</style>
    </div>
  );
}
