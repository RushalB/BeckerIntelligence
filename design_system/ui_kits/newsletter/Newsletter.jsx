// Newsletter email components — uses table-ish block layout since real emails do.
// In HTML previews we just use divs, styled inline-ish for visual fidelity.
function NewsletterMasthead({ date }) {
  return (
    <div className="nl-masthead">
      <img className="nl-logo" src="../../assets/logos/beckers-hospital-review-logo.png" alt="Becker's Hospital Review" />
      <div className="nl-date">{date}</div>
    </div>
  );
}

function NewsletterHero({ title, body, href }) {
  return (
    <a className="nl-hero" href={href || '#'}>
      <div className="nl-hero__kicker">Top Story</div>
      <h2 className="nl-hero__title">{title}</h2>
      <p className="nl-hero__body">{body}</p>
      <span className="nl-hero__cta">Read the full story →</span>
    </a>
  );
}

function NewsletterItem({ kicker, title, summary, href }) {
  return (
    <a className="nl-item" href={href || '#'}>
      <div className="nl-item__kicker">{kicker}</div>
      <div className="nl-item__title">{title}</div>
      {summary && <div className="nl-item__summary">{summary}</div>}
    </a>
  );
}

function NewsletterSection({ title, children }) {
  return (
    <section className="nl-section">
      <h3 className="nl-section__title">{title}</h3>
      <div className="nl-section__body">{children}</div>
    </section>
  );
}

function NewsletterFooter() {
  return (
    <footer className="nl-footer">
      <div>
        You're receiving this because you subscribed at beckershospitalreview.com.
      </div>
      <div className="nl-footer__links">
        <a href="#">Manage preferences</a> · <a href="#">Unsubscribe</a> · <a href="#">Forward to a colleague</a>
      </div>
      <div className="nl-footer__legal">
        © 2026 Becker's Healthcare · 17W 635 Butterfield Road, Oakbrook Terrace, IL 60181
      </div>
    </footer>
  );
}

Object.assign(window, { NewsletterMasthead, NewsletterHero, NewsletterItem, NewsletterSection, NewsletterFooter });
