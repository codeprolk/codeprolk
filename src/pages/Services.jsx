import React from 'react';

const whatsappLink =
  'https://wa.me/94770874042?text=Hello%20CODEPRO%20LK%2C%20I%20would%20like%20to%20know%20more%20about%20your%20services.';

const serviceItems = [
  {
    number: '01',
    eyebrow: 'AI / Machine Learning',
    title: 'AI/ML Solutions',
    description:
      'Natural Language Processing (NLP): We create intelligent chatbots, sentiment analysis tools, and automated document classification systems that streamline customer service, boost engagement, and save time in processing large volumes of text. Computer Vision: Our computer vision solutions include object detection, image recognition, and quality inspection systems. Predictive Analytics: By analyzing historical data, we build models that forecast demand, optimize inventory, and manage risk. Automation Solutions: We specialize in automating repetitive tasks, such as data extraction and classification, through AI-driven workflows.',
  },
  {
    number: '02',
    eyebrow: 'Custom Software',
    title: 'Software Development',
    description:
      'Customized Solutions: We specialize in developing software tailored to address the unique requirements of each client, ensuring our solutions align with their business goals and user expectations. High Performance & Scalability: Our software products are designed for speed and scalability, enabling seamless handling of large data volumes and user growth. Reliable and Secure: We emphasize robust architecture and best security practices to protect data integrity and minimize downtime.',
  },
  {
    number: '03',
    eyebrow: 'Analytics / Insights',
    title: 'Data Analytics & Insights',
    description:
      'In-depth Data Analysis: We utilize advanced analytics to examine data thoroughly, revealing hidden patterns, trends, and outliers. Data Visualization: Our team transforms complex datasets into clear, engaging visualizations, making it easy for stakeholders to understand key insights. Strategic Insights for Decision-Making: By generating actionable insights, we enable businesses to make informed, data-driven decisions.',
  },
  {
    number: '04',
    eyebrow: 'Problem Solving',
    title: 'Algorithmic Design',
    description:
      'Customized Solutions for Complex Problems: We build algorithms that are custom-designed to tackle your unique challenges. High-Performance and Efficiency: Our algorithms are engineered for peak performance, reducing computation time and resource consumption. Enhanced Accuracy and Reliability: Accuracy is at the core of our design philosophy, ensuring dependable results.',
  },
];

function Services() {
  return (
    <section className="services-page">
      <div className="services-page-bg-grid" aria-hidden="true" />
      <div className="services-page-glow services-page-glow-one" aria-hidden="true" />
      <div className="services-page-glow services-page-glow-two" aria-hidden="true" />

      <div className="services-page-inner">
        <header className="services-page-header">
          <p className="services-page-tag">CODEPRO LK / SERVICES</p>

          <h1>Our Services</h1>

          <p>
            We create practical, modern, and scalable technology solutions for
            AI, software development, data analytics, and algorithmic problem
            solving.
          </p>
        </header>

        <div className="services-page-list">
          {serviceItems.map((service) => (
            <article className="services-page-card" key={service.title}>
              <div className="services-page-card-number">
                {service.number}
              </div>

              <div className="services-page-card-body">
                <p className="services-page-card-eyebrow">
                  {service.eyebrow}
                </p>

                <h2>{service.title}</h2>

                <p>{service.description}</p>

                <a
                  className="services-page-contact-btn"
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  CONTACT US
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;