// Masthead — logo, search, Subscribe CTA. Sits below the site-switcher.
function Masthead({ onSearch, onSubscribe }) {
  return (
    <div className="bh-masthead">
      <a className="bh-masthead__logo" href="#">
        <img src="../../assets/logos/beckers-hospital-review-logo.png" alt="Becker's Hospital Review" />
      </a>
      <div className="bh-masthead__spacer" />
      <button className="bh-iconbtn" aria-label="Search" onClick={onSearch}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>
        </svg>
      </button>
      <button className="bh-btn bh-btn--primary" onClick={onSubscribe}>Subscribe</button>
    </div>
  );
}

// Section nav — primary categories. Becker's uses these across the top.
const BHR_SECTIONS = ['Leadership', 'Finance', 'Health IT', 'Clinical Care', 'Specialties', 'Resources', 'Events'];

function SectionNav({ current = 'Leadership', onChange }) {
  return (
    <nav className="bh-sectnav">
      {BHR_SECTIONS.map(s => (
        <a
          key={s}
          href="#"
          className={'bh-sectnav__item' + (s === current ? ' is-active' : '')}
          onClick={(e) => { e.preventDefault(); onChange && onChange(s); }}
        >{s}</a>
      ))}
    </nav>
  );
}

Object.assign(window, { Masthead, SectionNav, BHR_SECTIONS });
