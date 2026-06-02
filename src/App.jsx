import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from 'react-router-dom';
import About from './pages/About';
import Terms from './pages/Terms';
import Disclaimer from './pages/Disclaimer';
import Privacy from './pages/Privacy';

const heroImage =
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80';

const services = [
  {
    title: 'AI/ML Solutions',
    description:
      'We design and deploy advanced AI and ML solutions that enable automation, prediction, and optimization across industries.',
    image:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Software Development',
    description:
      'We build robust, user-friendly software products focused on performance, scalability, and intuitive experience.',
    image:
      'https://images.unsplash.com/photo-1555949963-aa79dcee981d?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Algorithmic Design',
    description:
      'We create customized algorithms that address complex problems efficiently with optimal performance.',
    image:
      'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Data Analytics & Insights',
    description:
      'We help organizations uncover trends through data analysis and visualization to support strategic decisions.',
    image:
      'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=900&q=80',
  },
];

const stats = [
  { label: 'Subscribers', value: '0K+' },
  { label: 'Uploads', value: '0+' },
  { label: 'Views', value: '0M+' },
];

function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Welcome to</p>
          <h1>Next Gen Tech</h1>
          <p>
            Helping talented individuals to reach the International Market with a
            Technological Background.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" to="/about">
              ABOUT US
            </Link>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-image-wrapper">
            <img src={heroImage} alt="Next generation technology workspace" />
          </div>
          <div className="hero-features">
            <div className="feature-card">Intelligent</div>
            <div className="feature-card">Scalable</div>
            <div className="feature-card">Secure</div>
            <div className="feature-card">Efficient</div>
            <div className="feature-card">Reliable</div>
          </div>
        </div>
      </section>

      <section className="section section-secondary">
        <div className="section-content">
          <div>
            <h2>Transform Your Vision with Next-Gen Tech</h2>
            <p>
              CodePRO LK is a technology-driven platform dedicated to empowering individuals
              and businesses through innovative services and cutting-edge education.
            </p>
            <p>
              Our platform offers AI-powered services tailored to your needs, from automating
              routine tasks to making data-driven decisions, with educational resources that
              keep you ahead of the curve.
            </p>
          </div>
        </div>
      </section>

      <section className="section section-highlight">
        <div className="section-content split">
          <div>
            <h2>Boost Your Business with AI-Powered Chatbots!</h2>
            <p>
              Our AI-powered WhatsApp and Telegram chatbots help businesses automate interactions,
              handle customer inquiries instantly, and enhance engagement.
            </p>
            <ul>
              <li>24/7 Customer Support</li>
              <li>Instant Replies & Smart Conversations</li>
              <li>Easy Integration & Customization</li>
            </ul>
            <a className="button button-secondary" href="https://codeprolk.com/contact/">
              MORE INFO
            </a>
          </div>          <div className="section-visual">
            <img
              src="https://images.unsplash.com/photo-1542831371-d531d36971e6?auto=format&fit=crop&w=900&q=80"
              alt="Chatbot conversation on mobile screen"
            />
          </div>        </div>
      </section>

      <section id="services" className="section services-section">
        <div className="section-header">
          <h2>Our Services</h2>
        </div>
        <div className="services-grid">
          {services.map((service) => (
            <article className="service-card" key={service.title}>
              <img className="service-image" src={service.image} alt={service.title} />
              <div className="service-card-content">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <a href="https://codeprolk.com/services/">LEARN MORE</a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="roadmap" className="section section-secondary">
        <div className="section-content split reverse">
          <div>
            <h2>How to Become an AI/ML Engineer</h2>
            <p>
              Explore the ultimate roadmap to kickstart your journey in AI and Machine Learning.
              Take your first step toward an exciting tech career.
            </p>
            <ul>
              <li>Mathematical Foundations</li>
              <li>Programming Fundamentals</li>
              <li>Version Control (Git and GitHub)</li>
              <li>Databases</li>
              <li>Data Manipulation and Analysis Libraries</li>
              <li>Machine Learning</li>
              <li>Deep Learning</li>
              <li>MLOps</li>
              <li>Generative AI</li>
            </ul>
            <a className="button button-primary" href="https://github.com/dineshpiyasamara/ai-ml-engineer-roadmap">
              EXPLORE MORE
            </a>
          </div>
          <div className="section-visual">
            <img
              src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80"
              alt="Person learning data science with laptop and charts"
            />
          </div>
        </div>
      </section>

      <section className="section stats-section">
        <div className="stats-cards">
          {stats.map((stat) => (
            <div className="stat-card" key={stat.label}>
              <span>{stat.value}</span>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section section-about">
        <div className="section-content">
          <h2>About</h2>
          <p>Helping talented individuals to reach the International Market.</p>
        </div>
      </section>
    </>
  );
}

function App() {
  const [botOpen, setBotOpen] = useState(false);
  const [botLoadError, setBotLoadError] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const botUrl =
    'https://copilotstudio.microsoft.com/environments/Default-534253fc-dfb6-462f-b5ca-cbe81939f5ee/bots/crad5_WelcometoCODEPROLK/webchat?__version__=2&enableFileAttachment=true';
    // 'https://copilotstudio.microsoft.com/environments/Default-534253fc-dfb6-462f-b5ca-cbe81939f5ee/bots/crad5_WelcometoCODEPROLK/canvas?__version__=2&enableFileAttachment=true&tenantId=534253fc-dfb6-462f-b5ca-cbe81939f5ee'

  return (
    <Router>
      <div className="page-shell">
        <header className="site-header">
          <Link className="brand" to="/" onClick={() => setMenuOpen(false)}>
            CODEPRO LK
          </Link>
          <button
            type="button"
            className={`nav-toggle ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen((current) => !current)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span className="nav-toggle-bar" />
            <span className="nav-toggle-bar" />
            <span className="nav-toggle-bar" />
          </button>
          <nav className={`site-nav ${menuOpen ? 'open' : ''}`}>
            <Link to="/" onClick={() => setMenuOpen(false)}>
              HOME
            </Link>
            <Link to="/about" onClick={() => setMenuOpen(false)}>
              ABOUT
            </Link>
            <Link to="/terms" onClick={() => setMenuOpen(false)}>
              TERMS
            </Link>
            <Link to="/disclaimer" onClick={() => setMenuOpen(false)}>
              DISCLAIMER
            </Link>
            <Link to="/privacy" onClick={() => setMenuOpen(false)}>
              PRIVACY
            </Link>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<About />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>

        <footer className="site-footer">
          <div className="footer-grid">
            <div>
              <h3>Pages</h3>
              <Link to="/about">About Us</Link>
              <Link to="/terms">Terms & Conditions</Link>
              <Link to="/disclaimer">Disclaimer</Link>
              <Link to="/privacy">Privacy Policy</Link>
            </div>
            <div>
              <h3>Contact</h3>
              <p>Minuwangoda, Western Province, Sri Lanka</p>
              <p>Email: info@codeprolk.com</p>
              <p>Mobile: +9477 087 4042</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>Copyright © 2026 - CODEPRO LK</p>
          </div>
        </footer>

        <button
          type="button"
          className="bot-toggle-button"
          onClick={() => setBotOpen(true)}
          aria-label="Open chat"
        >
          <span className="bot-icon">💬</span>
        </button>

        {botOpen && (
          <div className="bot-widget">
            <button
              type="button"
              className="bot-close-button"
              onClick={() => setBotOpen(false)}
              aria-label="Close chat"
            >
              ✕
            </button>
            {botLoadError ? (
              <div className="bot-error-state">
                <p>Unable to load chat widget inside the page.</p>
                <a href={botUrl} target="_blank" rel="noopener noreferrer" className="button button-primary">
                  Open chat in new tab
                </a>
              </div>
            ) : (
              <iframe
                title="CodePRO LK AI Bot"
                src={botUrl}
                frameBorder="0"
                loading="lazy"
                allow="microphone; camera; clipboard-read; clipboard-write; autoplay; encrypted-media"
                onError={() => setBotLoadError(true)}
              />
            )}
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
