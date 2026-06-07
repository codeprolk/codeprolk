import React from 'react';

const privacyItems = [
  {
    number: '01',
    title: 'Your Privacy Matters',
    body:
      'We respect your privacy and are committed to protecting the personal information you share with us. Any data collected through this website is used to improve your experience and provide the services you request.',
  },
  {
    number: '02',
    title: 'Secure Data Handling',
    body:
      'We do not sell your personal information to third parties. Any information collected is handled securely and in accordance with applicable privacy laws.',
  },
];

function Privacy() {
  return (
    <section className="privacy-page">
      <div className="privacy-grid-bg" aria-hidden="true" />
      <div className="privacy-orb privacy-orb-one" aria-hidden="true" />
      <div className="privacy-orb privacy-orb-two" aria-hidden="true" />

      <div className="privacy-inner">
        <header className="privacy-hero">
          <div className="privacy-hero-copy">
            <p className="privacy-tag">CODEPRO LK / PRIVACY</p>

            <h1>Privacy Policy</h1>

            <p>
              Your trust is important to us. This page explains how CODEPRO LK
              treats personal information, protects user data, and handles
              information shared through our website.
            </p>
          </div>

          <div className="privacy-shield-card" aria-hidden="true">
            <div className="privacy-shield-icon">
              <span>✓</span>
            </div>

            <p>Protected by Design</p>
          </div>
        </header>

        <div className="privacy-content-layout">
          <aside className="privacy-side-note">
            <span>Data Care</span>

            <h2>Simple, secure, and respectful.</h2>

            <p>
              We keep privacy clear and intentional. Information is used only to
              support user experience, communication, and service delivery.
            </p>
          </aside>

          <div className="privacy-card-list">
            {privacyItems.map((item) => (
              <article className="privacy-card" key={item.number}>
                <div className="privacy-card-number">{item.number}</div>

                <div>
                  <h2>{item.title}</h2>
                  <p>{item.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="privacy-bottom-panel">
          <div>
            <p className="privacy-tag">OUR COMMITMENT</p>

            <h2>We do not sell your personal information.</h2>

            <p>
              Any information collected is treated responsibly and used only for
              improving your experience or providing the services you request.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Privacy;