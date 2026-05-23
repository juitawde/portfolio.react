import React from 'react';

const SECTIONS = ['hero', 'about-me', 'toolkit', 'projects', 'about', 'education', 'contact'];

export default function BottomPagination({ activeSection }) {
  const activeIndex = SECTIONS.indexOf(activeSection);

  const handleDotClick = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bottom-pagination">
      {SECTIONS.map((sectionId, idx) => (
        <div
          key={sectionId}
          onClick={() => handleDotClick(sectionId)}
          className={`nav-dot ${activeIndex === idx ? 'active' : ''}`}
          data-index={idx}
          style={{ cursor: 'pointer' }}
        ></div>
      ))}
    </div>
  );
}
