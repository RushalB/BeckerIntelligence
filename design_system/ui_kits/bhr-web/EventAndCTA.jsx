// Event card — navy surface, red CTA. Used in the Upcoming Events rail.
function EventCard({ kicker = 'Upcoming Event', title, venue, dates, href = '#' }) {
  return (
    <div className="bh-event">
      <div className="bh-event__kicker">{kicker}</div>
      <div className="bh-event__title">{title}</div>
      {venue && <div className="bh-event__venue">{venue}</div>}
      {dates && <div className="bh-event__dates">{dates}</div>}
      <a className="bh-btn bh-btn--primary bh-btn--sm" href={href}>Register</a>
    </div>
  );
}

// Offerings tile — the four big-icon tiles ("Events / Webinars / Whitepapers / Podcasts").
function OfferingTile({ icon, title, description, cta = 'View All' }) {
  return (
    <a className="bh-offering" href="#">
      <div className="bh-offering__icon">
        <img src={'../../assets/icons/' + icon + '.svg'} alt="" />
      </div>
      <div className="bh-offering__title">{title}</div>
      <div className="bh-offering__desc">{description}</div>
      <div className="bh-offering__cta">{cta} →</div>
    </a>
  );
}

// Newsletter CTA — the signature capture block.
function NewsletterCTA({ onSubmit }) {
  const [email, setEmail] = React.useState('');
  const [done, setDone] = React.useState(false);
  const submit = (e) => {
    e.preventDefault();
    if (email.includes('@')) { setDone(true); onSubmit && onSubmit(email); }
  };
  return (
    <div className="bh-news">
      <div className="bh-news__kicker">Newsletter</div>
      <h2 className="bh-news__headline">Stay Informed with <em>Becker's Hospital Review</em></h2>
      <p className="bh-news__sub">
        Join the 500,000+ healthcare executives who start their day with Becker's. Top hospital and healthcare articles, delivered daily.
      </p>
      {done ? (
        <div className="bh-news__success">Thanks — check your inbox to confirm.</div>
      ) : (
        <form className="bh-news__form" onSubmit={submit}>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-label="Email address"
          />
          <button type="submit" className="bh-btn bh-btn--primary">Subscribe Today</button>
        </form>
      )}
    </div>
  );
}

Object.assign(window, { EventCard, OfferingTile, NewsletterCTA });
