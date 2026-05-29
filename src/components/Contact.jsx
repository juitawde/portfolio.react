import React, { useState } from 'react';

import Magnetic from './Magnetic';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState({
    submitting: false,
    success: false,
    error: null,
  });

  const [iframeSubmitted, setIframeSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    setStatus({ submitting: true, success: false, error: null });
    setIframeSubmitted(true);
  };

  const handleIframeLoad = () => {
    if (iframeSubmitted) {
      setStatus({ submitting: false, success: true, error: null });
      setFormData({ name: '', email: '', age: '', subject: '', message: '' });
      setIframeSubmitted(false);
    }
  };

  const handleReset = () => {
    setStatus({ submitting: false, success: false, error: null });
    setIframeSubmitted(false);
  };

  return (
    <section className="panel" id="contact">
      {/* Hidden Iframe to handle seamless background submit with 100% success rate (no CORS blocks) */}
      <iframe
        name="hidden_iframe"
        id="hidden_iframe"
        style={{ display: 'none' }}
        onLoad={handleIframeLoad}
      ></iframe>

      <div className="panel-content flex-center text-center fade-in visible" style={{ flexDirection: 'column' }}>
        <div className="section-header center-align">
          <span className="eyebrow">GET IN TOUCH</span>
          <h2 className="section-title">
            Let's <span className="italic">Connect</span>
          </h2>
          <p className="section-desc">Open for opportunities, collaborations, or just a chat.</p>
        </div>

        <div className="flex-split row-reverse-mobile" style={{ width: '100%', alignItems: 'flex-start', gap: '3rem', marginTop: '2rem' }}>
          <div className="col-left flex-center" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div className="contact-card glass-panel" style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '2rem', padding: '3rem', margin: 0, maxWidth: '100%' }}>
              <Magnetic strength={0.25} range={50} style={{ display: 'block', width: '100%' }}>
                <a href="mailto:juitawde23@gmail.com" className="contact-email-link" style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ marginRight: '8px' }}
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                  <span>juitawde23@gmail.com</span>
                </a>
              </Magnetic>
              <div className="contact-divider"></div>
              <div className="social-links-col" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
                <Magnetic strength={0.35} range={60} style={{ display: 'block', width: '100%' }}>
                  <a
                    href="https://linkedin.com/in/jui-tawde-788210385"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-chip"
                    style={{ justifyContent: 'center' }}
                  >
                    <span>LinkedIn</span> <span className="arrow">↗</span>
                  </a>
                </Magnetic>
                <Magnetic strength={0.35} range={60} style={{ display: 'block', width: '100%' }}>
                  <a
                    href="https://github.com/juitawde"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-chip"
                    style={{ justifyContent: 'center' }}
                  >
                    <span>GitHub</span> <span className="arrow">↗</span>
                  </a>
                </Magnetic>
              </div>
            </div>
          </div>

          <div className="col-right" style={{ flex: 1.2, textAlign: 'left' }}>
            {/* Contact Form Container */}
            <div className="contact-form-container" style={{ width: '100%' }}>
              <div className="contact-form-card glass-panel" style={{ padding: '3rem' }}>
                <div className="section-header" style={{ marginBottom: '2rem' }}>
                  <span className="eyebrow">MESSAGE ME</span>
                  <h3 style={{ fontSize: '2.1rem', color: 'var(--text-main)' }}>
                    Feel free to <span className="italic">connect</span>
                  </h3>
                </div>

                {!status.success ? (
                  <form
                    action="https://formsubmit.co/juitawde23@gmail.com"
                    method="POST"
                    target="hidden_iframe"
                    onSubmit={handleSubmit}
                    className="form-grid"
                  >
                    {/* FormSubmit Configuration Fields */}
                    <input type="hidden" name="_captcha" value="false" />
                    <input type="hidden" name="_template" value="table" />
                    <input type="hidden" name="_next" value="https://juitawde.github.io/official_portfolio/" />

                    <div className="form-group">
                      <label htmlFor="name">Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="email@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="age">Age</label>
                      <input
                        type="number"
                        id="age"
                        name="age"
                        placeholder="Your Age"
                        value={formData.age}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="subject">Subject</label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        placeholder="Reason for contacting"
                        value={formData.subject}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group full-width">
                      <label htmlFor="message">Message</label>
                      <textarea
                        id="message"
                        name="message"
                        rows="4"
                        placeholder="How can I help you?"
                        value={formData.message}
                        onChange={handleChange}
                        required
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      disabled={status.submitting}
                      className="submit-btn full-width"
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
                    >
                      {status.submitting ? (
                        <>
                          <svg width="20" height="20" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" stroke="#fff">
                            <g fill="none" fillRule="evenodd">
                              <g transform="translate(1 1)" strokeWidth="3">
                                <circle strokeOpacity=".5" cx="18" cy="18" r="18"/>
                                <path d="M36 18c0-9.94-8.06-18-18-18">
                                  <animateTransform
                                    attributeName="transform"
                                    type="rotate"
                                    from="0 18 18"
                                    to="360 18 18"
                                    dur="1s"
                                    repeatCount="indefinite"
                                  />
                                </path>
                              </g>
                            </g>
                          </svg>
                          SENDING...
                        </>
                      ) : (
                        'Submit'
                      )}
                    </button>
                  </form>
                ) : (
                  <div
                    id="form-success"
                    style={{
                      padding: '3rem 1rem',
                      textAlign: 'center',
                      border: 'none !important',
                      background: 'none !important',
                      boxShadow: 'none !important',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      animation: 'fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                  >
                    <div 
                      className="success-icon-wrapper" 
                      style={{ 
                        margin: '0 auto 2rem', 
                        width: '80px', 
                        height: '80px', 
                        borderRadius: '50%', 
                        background: 'rgba(46, 216, 167, 0.1)', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        boxShadow: '0 0 30px rgba(46, 216, 167, 0.25)', 
                        border: '2px solid rgba(46, 216, 167, 0.4)' 
                      }}
                    >
                      <svg 
                        width="40" 
                        height="40" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="#2ed8a7" 
                        strokeWidth="3" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        className="checkmark-svg"
                        style={{ animation: 'dash 0.9s ease-in-out forwards' }}
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <h3 style={{ fontSize: '2.2rem', color: 'var(--text-main)', marginBottom: '1.2rem', fontWeight: '700' }}>
                      Message Sent!
                    </h3>
                    <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', maxWidth: '400px', margin: '0 auto', lineHeight: '1.6' }}>
                      Thank you for reaching out. I'll get back to you as soon as possible.
                    </p>
                    <button onClick={handleReset} className="unlock-btn" style={{ marginTop: '2.5rem', display: 'inline-flex', padding: '0.8rem 2rem' }}>
                      Send Another Message
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
