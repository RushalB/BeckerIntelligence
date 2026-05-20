// Footer — dense link grid over white. Contact block + sister sites + more resources.
function Footer() {
  return (
    <footer className="bh-footer">
      <div className="bh-footer__inner">
        <div className="bh-footer__brand">
          <img className="bh-footer__logo" src="../../assets/logos/beckers-hospital-review-logo.png" alt="Becker's Hospital Review" />
          <h4>Contact Us</h4>
          <a className="bh-footer__phone" href="tel:18004172035">1-800-417-2035</a>
          <a className="bh-footer__mail" href="mailto:becker@beckershealthcare.com">becker@beckershealthcare.com</a>
          <div className="bh-footer__social">
            {['RSS','LinkedIn','Facebook','X','YouTube'].map(s => (
              <a key={s} href="#">{s}</a>
            ))}
          </div>
        </div>
        <div className="bh-footer__col">
          <h4>Other Becker's Sites</h4>
          <ul>
            {['ASC','Spine','Dental','Payer','Behavioral','Physician'].map(s => <li key={s}><a href="#">{s}</a></li>)}
          </ul>
        </div>
        <div className="bh-footer__col">
          <h4>More Resources</h4>
          <ul>
            {['Events','Whitepapers','Live Webinars','OnDemand Webinars','Podcasts','Print Issues'].map(s => <li key={s}><a href="#">{s}</a></li>)}
          </ul>
        </div>
        <div className="bh-footer__col">
          <h4>About</h4>
          <ul>
            {['About Becker\u2019s','Careers','Media Kit','Contact Us','Privacy Policy'].map(s => <li key={s}><a href="#">{s}</a></li>)}
          </ul>
        </div>
      </div>
      <div className="bh-footer__legal">
        <span>Copyright © 2026 Becker's Healthcare. All Rights Reserved.</span>
      </div>
    </footer>
  );
}

// Floating "Subscribe Today" pill — the bottom-right CTA from board 2.
function SubscribePill({ onClick }) {
  return (
    <button className="bh-subpill" onClick={onClick}>Subscribe Today</button>
  );
}

Object.assign(window, { Footer, SubscribePill });
