import React from "react";
import { Link } from "react-router-dom";
import "./home-page.scss";

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <section className="hero-section">
        <h1>Welcome to Friday AI</h1>
        <p className="tagline">
          Your Intelligent Voice Assistant for Everyday Tasks
        </p>
        <div className="cta-buttons">
          <Link to="/assistant" className="primary-button">
            Start Using Friday
          </Link>
          <Link to="/features" className="secondary-button">
            Learn More
          </Link>
        </div>
      </section>

      <section className="features-section">
        <h2>Key Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <span className="emoji-icon">🎯</span>
            <h3>Smart Assistance</h3>
            <p>
              Get instant help with tasks, information, and decision-making
              through natural conversation.
            </p>
          </div>
          <div className="feature-card">
            <span className="emoji-icon">👁️</span>
            <h3>Visual Analysis</h3>
            <p>
              Upload images for instant analysis and get detailed insights about
              what you see.
            </p>
          </div>
          <div className="feature-card">
            <span className="emoji-icon">🎙️</span>
            <h3>Voice Interaction</h3>
            <p>
              Communicate naturally through voice commands and get spoken
              responses.
            </p>
          </div>
          <div className="feature-card">
            <span className="emoji-icon">🔍</span>
            <h3>Smart Search</h3>
            <p>
              Find information quickly with advanced search capabilities and
              context-aware results.
            </p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2>Ready to Experience the Future?</h2>
        <p>
          Start using Friday AI today and discover how artificial intelligence
          can transform your daily life.
        </p>
        <Link to="/assistant" className="cta-button">
          Get Started Now
        </Link>
      </section>
    </div>
  );
};

export default HomePage; 