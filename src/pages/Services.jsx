import React from 'react';
import aiImg from '../assests/landing-blue.jpg';
import softwareImg from '../assests/services/software-development.jpg';
import analyticsImg from '../assests/services/data-analytics.jpg';

function Services() {
	return (
		<section className="section">
			<div className="section-content">
				<h1>Our Services</h1>

				<div className="service-card">
					<div className="service-body">
						<h2>🤖 AI/ML Solutions</h2>
						<p>
							Natural Language Processing (NLP): We create intelligent chatbots, sentiment
							analysis tools, and automated document classification systems that streamline
							customer service, boost engagement, and save time in processing large volumes
							of text. Computer Vision: Our computer vision solutions include object
							detection, image recognition, and quality inspection systems. Predictive
							Analytics: By analyzing historical data, we build models that forecast demand,
							optimize inventory, and manage risk. Automation Solutions: We specialize in
							automating repetitive tasks, such as data extraction and classification,
							through AI-driven workflows.
						</p>
						<a className="btn" href="/contact">CONTACT US</a>
					</div>
				</div>

				<div className="service-card reverse">
					<div className="service-body">
						<h2>💻 Software Development</h2>
						<p>
							Customized Solutions: We specialize in developing software tailored to address
							the unique requirements of each client, ensuring our solutions align with
							their business goals and user expectations. High Performance & Scalability:
							Our software products are designed for speed and scalability, enabling seamless
							handling of large data volumes and user growth. Reliable and Secure: We
							emphasize robust architecture and best security practices to protect data
							integrity and minimize downtime.
						</p>
						<a className="btn" href="/contact">CONTACT US</a>
					</div>
				</div>

				<div className="service-card">
					{/* <img src={analyticsImg} alt="Data Analytics" className="service-image" /> */}
					<div className="service-body">
						<h2>📊 Data Analytics & Insights</h2>
						<p>
							In-depth Data Analysis: We utilize advanced analytics to examine data
							thoroughly, revealing hidden patterns, trends, and outliers. Data
							Visualization: Our team transforms complex datasets into clear, engaging
							visualizations, making it easy for stakeholders to understand key insights.
							Strategic Insights for Decision-Making: By generating actionable insights,
							we enable businesses to make informed, data-driven decisions.
						</p>
						<a className="btn" href="/contact">CONTACT US</a>
					</div>
				</div>

				<div className="service-card">
					<div className="service-body">
						<h2>🧮 Algorithmic Design</h2>
						<p>
							Customized Solutions for Complex Problems: We build algorithms that are
							custom-designed to tackle your unique challenges. High-Performance and
							Efficiency: Our algorithms are engineered for peak performance, reducing
							computation time and resource consumption. Enhanced Accuracy and Reliability:
							Accuracy is at the core of our design philosophy, ensuring dependable results.
						</p>
						<a className="btn" href="/contact">CONTACT US</a>
					</div>
				</div>

			</div>
		</section>
	);
}

export default Services;

