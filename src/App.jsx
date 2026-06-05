import React, { useEffect, useRef, useState } from 'react';
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

import logo from './assests/logo.png';
import landingImage from './assests/landing-blue.jpg';
import siriSvg from './assests/Siri.svg';
import roadmapImage from './assests/how-to.jpg';

import facebookIcon from './assests/black-icons/facebook.png';
import linkedinIcon from './assests/black-icons/linkedin.png';
import whatsappIcon from './assests/black-icons/whatsapp.png';
import youtubeIcon from './assests/black-icons/youtube.png';
import tiktokIcon from './assests/black-icons/tiktok.png';

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
  { label: 'Subscribers', target: 55, suffix: 'K+' },
  { label: 'Uploads', target: 400, suffix: '+' },
  { label: 'Views', target: 5, suffix: 'M+' },
];

function AnimatedStat({ target, suffix, label, start }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    let animationFrame;
    const duration = 1800;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      setCount(Math.round(target * easedProgress));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [start, target]);

  return (
    <div className="stat-card">
      <span>
        {count}
        {suffix}
      </span>
      <p>{label}</p>
    </div>
  );
}

function HomePage() {
  const servicesRef = useRef(null);
  const statsRef = useRef(null);

  const [statsStarted, setStatsStarted] = useState(false);
  const [animatedStats, setAnimatedStats] = useState({
    Subscribers: 0,
    Uploads: 0,
    Views: 0,
  });

  const finalStats = [
    { label: 'Subscribers', target: 55, suffix: 'K+' },
    { label: 'Uploads', target: 400, suffix: '+' },
    { label: 'Views', target: 5, suffix: 'M+' },
  ];

  useEffect(() => {
    const servicesSection = servicesRef.current;

    if (!servicesSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          servicesSection.classList.add('services-swipe-visible');
        }
      },
      {
        threshold: 0.25,
      }
    );

    observer.observe(servicesSection);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const statsSection = statsRef.current;

    if (!statsSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsStarted(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.35,
      }
    );

    observer.observe(statsSection);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!statsStarted) return;

    let animationFrame;
    const duration = 1800;
    const startTime = performance.now();

    const animateNumbers = (currentTime) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      setAnimatedStats({
        Subscribers: Math.round(55 * easedProgress),
        Uploads: Math.round(400 * easedProgress),
        Views: Math.round(5 * easedProgress),
      });

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animateNumbers);
      }
    };

    animationFrame = requestAnimationFrame(animateNumbers);

    return () => cancelAnimationFrame(animationFrame);
  }, [statsStarted]);

  return (
    <>
      <section className="hero">
        <div className="hero-image-bg">
          <img src={landingImage} alt="CODEPRO LK landing visual" />
        </div>

        <div className="hero-copy">
          <p className="eyebrow">CODEPRO LK</p>

          <h1>Next Gen Tech.</h1>

          <p>
            Helping talented individuals reach the international market with
            modern technology, AI-powered services, and future-ready digital skills.
          </p>

          <div className="hero-explore">
            <span>Explore</span>
            <a href="#services">AI/ML</a>
            <a href="#services">Software</a>
            <a href="#roadmap">Roadmap</a>
          </div>
        </div>

        <a className="scroll-cue" href="#vision" aria-label="Scroll to next section">
          ↓
        </a>
      </section>

      <section id="vision" className="section section-dark">
        <div className="section-content">
          <div>
            <p className="section-tag">01 / Vision</p>

            <div className="vision-title-marquee">
              <div className="vision-title-track">
                <h2>Transform Your Vision with Next-Gen Tech</h2>
                <h2 aria-hidden="true">Transform Your Vision with Next-Gen Tech</h2>
                <h2 aria-hidden="true">Transform Your Vision with Next-Gen Tech</h2>
                <h2 aria-hidden="true">Transform Your Vision with Next-Gen Tech</h2>
              </div>
            </div>

            <p>
              CodePRO LK is a technology-driven platform dedicated to empowering
              individuals and businesses through innovative services and
              cutting-edge education.
            </p>

            <p>
              Our platform offers AI-powered services tailored to your needs,
              from automating routine tasks to making data-driven decisions,
              with educational resources that keep you ahead of the curve.
            </p>
          </div>
        </div>
      </section>

      <section className="section section-logo-blue">
        <div className="section-content split">
          <div>
            <p className="section-tag">02 / Automation</p>

            <h2>Boost Your Business with AI-Powered Chatbots!</h2>

            <p>
              Our AI-powered WhatsApp and Telegram chatbots help businesses
              automate interactions, handle customer inquiries instantly, and
              enhance engagement.
            </p>

            <ul>
              <li>24/7 Customer Support</li>
              <li>Instant Replies & Smart Conversations</li>
              <li>Easy Integration & Customization</li>
            </ul>

            <a className="button button-light" href="https://codeprolk.com/contact/">
              MORE INFO
            </a>
          </div>

          <div className="section-visual">
            <img
              className="siri-svg-visual"
              src={siriSvg}
              alt="Siri-style AI assistant animation"
            />
          </div>
        </div>
      </section>

      <section
        id="services"
        ref={servicesRef}
        className="section services-section services-swipe-section"
      >
        <div className="section-header">
          <p className="section-tag">03 / Services</p>

          <h2>Our Services</h2>

          <p>
            We create practical technology solutions for AI, software, algorithms,
            and data-driven business growth.
          </p>
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

      <section id="roadmap" className="section section-gradient-blue">
        <div className="section-content split reverse">
          <div>
            <p className="section-tag">04 / Roadmap</p>

            <h2>How to Become an AI/ML Engineer</h2>

            <p>
              Explore the ultimate roadmap to kickstart your journey in AI and
              Machine Learning. Take your first step toward an exciting tech
              career.
            </p>

            <ul>
              <li>Mathematical Foundations</li>
              <li>Programming Fundamentals</li>
              <li>Version Control with Git and GitHub</li>
              <li>Databases</li>
              <li>Data Manipulation and Analysis Libraries</li>
              <li>Machine Learning</li>
              <li>Deep Learning</li>
              <li>MLOps</li>
              <li>Generative AI</li>
            </ul>

            <a
              className="button button-light"
              href="https://github.com/dineshpiyasamara/ai-ml-engineer-roadmap"
            >
              EXPLORE MORE
            </a>
          </div>

          <div className="section-visual roadmap-visual">
            <img
              className="roadmap-image"
              src={roadmapImage}
              alt="Robotic hand on a blue background"
            />
          </div>
        </div>
      </section>

      <section className="section section-final" ref={statsRef}>
        <div className="section-content final-content">
          <div className="social-links-section final-heading-block">
            <h2>About CODEPRO LK</h2>
          </div>

          <div className="stats-cards">
            {finalStats.map((stat) => (
              <div className="stat-card" key={stat.label}>
                <span>
                  {animatedStats[stat.label]}
                  {stat.suffix}
                </span>

                <p>{stat.label}</p>
              </div>
            ))}
          </div>

          <p className="final-connect-text">
            Connect with CODEPRO LK on the platforms below for updates, support,
            and AI insights.
          </p>
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

  return (
    <Router>
      <div className="page-shell">
        <header className="site-header">
          <Link className="brand" to="/" onClick={() => setMenuOpen(false)}>
            <img src={logo} alt="CODEPRO LK logo" className="brand-logo" />
            <span>CODEPRO LK</span>
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
          <p className="footer-copy">Copyright © 2026 - CODEPRO LK</p>

          <nav className="footer-social-links" aria-label="CODEPRO LK social media links">
            <a
              href="https://www.youtube.com/@codeprolk"
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
            >
              <img src={youtubeIcon} alt="YouTube" />
            </a>

            <a
              href="https://wa.me/94770874042"
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
            >
              <img src={whatsappIcon} alt="WhatsApp" />
            </a>

            <a
              href="https://web.facebook.com/codeprolkofficial"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
            >
              <img src={facebookIcon} alt="Facebook" />
            </a>

            <a
              href="https://www.tiktok.com/@codeprolk"
              target="_blank"
              rel="noreferrer"
              aria-label="TikTok"
            >
              <img src={tiktokIcon} alt="TikTok" />
            </a>

            <a
              href="https://www.linkedin.com/company/codepro-lk/posts/?feedView=all"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <img src={linkedinIcon} alt="LinkedIn" />
            </a>
          </nav>
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

                <a
                  href={botUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button button-primary"
                >
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