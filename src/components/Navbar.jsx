import React from 'react';

const NAV_ITEMS = [
  { id: 'hero', label: 'Home' },
  { id: 'about-me', label: 'About' },
  { id: 'toolkit', label: 'Skills' },
  { id: 'projects', label: 'Works' },
  { id: 'about', label: 'Journey' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];

export default function Navbar({ activeSection }) {
  const handleClick = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="floating-nav">
      {NAV_ITEMS.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          onClick={(e) => handleClick(e, item.id)}
          className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}
