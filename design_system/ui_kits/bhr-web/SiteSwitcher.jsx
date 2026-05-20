// Site-switcher bar — the thin top row above the main header.
// Links to sibling Becker's properties.
const BHR_SITES = [
  { id: 'bhr', label: 'BHR', active: true },
  { id: 'clinical', label: 'Clinical' },
  { id: 'hit', label: 'Health IT' },
  { id: 'cfo', label: 'CFO' },
  { id: 'asc', label: 'ASC' },
  { id: 'spine', label: 'Spine' },
  { id: 'dental', label: 'Dental' },
  { id: 'payer', label: 'Payer' },
  { id: 'behavioral', label: 'Behavioral' },
  { id: 'physician', label: 'Physician' },
];

function SiteSwitcher({ current = 'bhr', onChange }) {
  return (
    <div className="bh-sitesw">
      <div className="bh-sitesw__label">Site&nbsp;switcher</div>
      <nav className="bh-sitesw__list">
        {BHR_SITES.map(s => (
          <a
            key={s.id}
            href="#"
            className={'bh-sitesw__item' + (s.id === current ? ' is-active' : '')}
            onClick={(e) => { e.preventDefault(); onChange && onChange(s.id); }}
          >{s.label}</a>
        ))}
      </nav>
    </div>
  );
}

Object.assign(window, { SiteSwitcher, BHR_SITES });
