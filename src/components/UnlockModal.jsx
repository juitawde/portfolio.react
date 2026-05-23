import React, { useState, useEffect } from 'react';

const CERT_DATA = {
  hsc: [
    { title: '10th Marksheet (SSC)', file: '/WhatsApp Image 2025-12-21 at 17.35.04 copy 2.jpeg' },
    { title: '12th Marksheet (HSC)', file: '/WhatsApp Image 2025-12-21 at 17.21.39 copy 2.jpeg' },
  ],
  btech: [
    { title: 'HTML Course Certificate', file: '/Screenshot 2026-02-24 at 12.28.59 AM copy 2.png' },
  ],
};

const DECRYPT_STEPS = [
  'INITIALIZING_SECURITY_PROTOCOL...',
  'AUTHENTICATING_USER_IDENTITY...',
  'DECRYPTING_PROTECTED_ASSETS...',
  'UNWINDING_CERTIFICATES...',
  'ACCESS_GRANTED_BY_JUI_TAWDE',
];

export default function UnlockModal({ isOpen, type, onClose }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [isDecrypting, setIsDecrypting] = useState(true);
  const [certIndex, setCertIndex] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      setStepIndex(0);
      setIsDecrypting(true);
      setCertIndex(0);
      return;
    }

    let interval;
    if (isDecrypting) {
      interval = setInterval(() => {
        setStepIndex((prev) => {
          if (prev < DECRYPT_STEPS.length - 1) {
            return prev + 1;
          } else {
            clearInterval(interval);
            setTimeout(() => {
              setIsDecrypting(false);
            }, 800);
            return prev;
          }
        });
      }, 600);
    }

    return () => clearInterval(interval);
  }, [isOpen, isDecrypting]);

  if (!isOpen || !type) return null;

  const data = CERT_DATA[type] || [];
  const currentCert = data[certIndex] || {};
  const hasMultiple = data.length > 1;

  const handlePrev = () => {
    setCertIndex((prev) => (prev - 1 + data.length) % data.length);
  };

  const handleNext = () => {
    setCertIndex((prev) => (prev + 1) % data.length);
  };

  const handleDownload = () => {
    if (!currentCert.file) return;
    const link = document.createElement('a');
    link.href = currentCert.file;
    link.download = currentCert.title + currentCert.file.substring(currentCert.file.lastIndexOf('.'));
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div id="unlock-modal" style={{ display: 'flex' }}>
      <div className="unlock-content">
        {isDecrypting ? (
          <div id="unlock-intro" style={{ display: 'block' }}>
            <div className="scanner-line"></div>
            <h2 style={{ color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)', letterSpacing: '4px' }}>
              SECURITY_ACCESS
            </h2>
            <div className="unlock-loader"></div>
            <div id="unlock-status" className="unlock-status">
              {DECRYPT_STEPS[stepIndex]}
            </div>
          </div>
        ) : (
          <div id="certificate-viewer" style={{ display: 'block', width: '100%', textAlign: 'center' }}>
            <div
              className="viewer-header"
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}
            >
              <span
                id="cert-title"
                style={{
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--accent-primary)',
                  fontSize: '0.9rem',
                  letterSpacing: '2px',
                }}
              >
                {currentCert.title}
              </span>
              <button
                onClick={onClose}
                className="close-modal"
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-main)',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                }}
              >
                &times;
              </button>
            </div>
            <div
              className="cert-image-wrapper"
              style={{ background: 'rgba(0,0,0,0.05)', borderRadius: '12px', padding: '10px', marginBottom: '1.5rem' }}
            >
              <img
                id="cert-img"
                src={currentCert.file}
                alt={currentCert.title}
                style={{ maxWidth: '100%', maxHeight: '55vh', borderRadius: '8px', display: 'block', margin: '0 auto' }}
              />
            </div>
            <div
              className="viewer-controls"
              style={{ display: 'flex', justifyContent: 'center', gap: '1rem', alignItems: 'center' }}
            >
              {hasMultiple && (
                <button
                  id="prev-cert"
                  onClick={handlePrev}
                  className="nav-btn"
                  style={{
                    padding: '0.8rem 1.5rem',
                    borderRadius: '8px',
                    background: 'var(--bg-panel)',
                    border: '1px solid var(--border-light)',
                    color: 'var(--text-main)',
                    fontFamily: 'var(--font-mono)',
                    cursor: 'pointer',
                  }}
                >
                  PREV
                </button>
              )}
              <button
                id="download-cert"
                onClick={handleDownload}
                className="nav-btn primary"
                style={{
                  padding: '0.8rem 1.5rem',
                  borderRadius: '8px',
                  background: 'var(--accent-primary)',
                  border: 'none',
                  color: 'white',
                  fontFamily: 'var(--font-mono)',
                  cursor: 'pointer',
                  flex: 1,
                  maxWidth: '200px',
                }}
              >
                DOWNLOAD
              </button>
              {hasMultiple && (
                <button
                  id="next-cert"
                  onClick={handleNext}
                  className="nav-btn"
                  style={{
                    padding: '0.8rem 1.5rem',
                    borderRadius: '8px',
                    background: 'var(--bg-panel)',
                    border: '1px solid var(--border-light)',
                    color: 'var(--text-main)',
                    fontFamily: 'var(--font-mono)',
                    cursor: 'pointer',
                  }}
                >
                  NEXT
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
