import React from 'react';

function About() {
  return (
    <section className="section section-secondary">
      <div className="section-content">
        <h1>About Us</h1>
        <p>
          CodePRO LK is a technology-driven platform dedicated to empowering individuals
          and businesses through innovative services and cutting-edge education. In today’s
          AI-driven world, every industry is leveraging the power of artificial intelligence
          to revolutionize operations and enhance capabilities. We at CodePRO LK are
          committed to keeping you ahead of the curve.
        </p>

        <h2>Our Mission</h2>
        <p>
          Helping talented individuals to reach the international market with a
          strong technological background. We offer a comprehensive suite of
          AI-powered services tailored to specific needs, from automating routine
          tasks to making data-driven decisions, alongside educational resources
          that enable practitioners to acquire the skills necessary to thrive.
        </p>

        <h2>What We Offer</h2>
        <ul>
          <li>AI/ML Solutions — custom models and automation pipelines.</li>
          <li>Software Development — performant, scalable applications.</li>
          <li>Algorithmic Design — optimized solutions for complex problems.</li>
          <li>Data Analytics & Insights — actionable intelligence for decision making.</li>
        </ul>

        <h2>Contact</h2>
        <p>
          For inquiries, collaborations or hiring, reach us at <strong>info@codeprolk.com</strong>.
        </p>

        <h2>Follow Us</h2>
        <p>Stay connected across our most active channels for insights, updates, and direct support.</p>

        <div className="social-grid about-social-grid">
          <a href="https://www.youtube.com/example" target="_blank" rel="noreferrer" className="social-link">
            <span className="social-icon">▶</span>
            YouTube
          </a>
          <a href="https://wa.me/94770874042" target="_blank" rel="noreferrer" className="social-link">
            <span className="social-icon">💬</span>
            WhatsApp
          </a>
          <a href="https://www.facebook.com/example" target="_blank" rel="noreferrer" className="social-link">
            <span className="social-icon">📘</span>
            Facebook
          </a>
          <a href="https://www.tiktok.com/@example" target="_blank" rel="noreferrer" className="social-link">
            <span className="social-icon">🎵</span>
            TikTok
          </a>
          <a href="https://www.linkedin.com/company/example" target="_blank" rel="noreferrer" className="social-link">
            <span className="social-icon">🔗</span>
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}

export default About;
