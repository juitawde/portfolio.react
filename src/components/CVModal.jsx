import React, { useState, useEffect } from 'react';

// EASILY CHANGE THIS URL TO YOUR ONLINE RESUME LINK (e.g., Google Drive link, Canva link, etc.)
const RESUME_URL = '/resume.png';

const SCAN_STEPS = [
  'ESTABLISHING_SECURE_CONNECTION...',
  'SCANNING_BIOMETRIC_DATA...',
  'VERIFYING_IDENTIFICATION...',
  'AUTHORIZING_ACCESS_LEVEL_5...',
  'DECRYPTING_RESUME_BLOB...',
  'ACCESS_GRANTED',
];

export default function CVModal({ isOpen, onClose }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [isScanning, setIsScanning] = useState(true);

  useEffect(() => {
    if (!isOpen) {
      setStepIndex(0);
      setIsScanning(true);
      return;
    }

    let interval;
    if (isScanning) {
      interval = setInterval(() => {
        setStepIndex((prev) => {
          if (prev < SCAN_STEPS.length - 1) {
            return prev + 1;
          } else {
            clearInterval(interval);
            setTimeout(() => {
              setIsScanning(false);
            }, 800);
            return prev;
          }
        });
      }, 700);
    }

    return () => clearInterval(interval);
  }, [isOpen, isScanning]);

  if (!isOpen) return null;

  return (
    <div id="cv-modal" className="modal-overlay" style={{ display: 'flex' }}>
      <div className="cv-content glass-panel">
        {isScanning ? (
          <div id="cv-scanning-zone" style={{ display: 'flex' }}>
            <div className="laser-grid"></div>
            <div className="scan-bar"></div>
            <div className="biometric-frame">
              <div className="corner tl"></div>
              <div className="corner tr"></div>
              <div className="corner bl"></div>
              <div className="corner br"></div>
            </div>
            <h2 className="scan-title">SYSTEM_SCANNING...</h2>
            <div id="cv-status" className="scan-status">
              {SCAN_STEPS[stepIndex]}
            </div>
          </div>
        ) : (
          <div id="cv-viewer" style={{ display: 'block', width: '100%', position: 'relative' }}>
            <div className="viewer-header">
              <span className="font-mono accent-text">JUI_TAWDE_CV.pdf</span>
              <button onClick={onClose} className="close-modal">
                &times;
              </button>
            </div>
            <div className="cv-image-container">
              <img src="/resume.png" alt="Resume" className="cv-img" />
            </div>
            <div className="viewer-actions">
              <a
                href={RESUME_URL}
                target={RESUME_URL.startsWith('http') ? '_blank' : undefined}
                rel={RESUME_URL.startsWith('http') ? 'noopener noreferrer' : undefined}
                download={RESUME_URL.startsWith('http') ? undefined : 'Jui_Tawde_CV.png'}
                className="btn primary full-width"
              >
                DOWNLOAD CV
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
