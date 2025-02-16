/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import sharedStyles from '@/styles/Shared.module.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Feature not ready yet, but we appreciate the thought! 🚀');
  };

  return (
    <div>
      <Header />

      {/* Introduction (Reusing Shared Styles) */}
      <section className={sharedStyles.introSection}>
        <h1>Contact Us</h1>
        <p>
          Got questions, feedback, or just want to say hi? We'd love to hear
          from you. Oh, and by "we," I mean me and ChatGPT. That’s the whole
          team. We’re a bit shy, but we’ll reply. Probably.
        </p>
      </section>

      {/* Contact Form */}
      <section className={sharedStyles.contactSection}>
        <form className={sharedStyles.contactForm} onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="What's your name?"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="How do we reach you?"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            placeholder="What's on your mind?"
            value={formData.message}
            onChange={handleChange}
            required
          />

          <button type="submit">Send Message</button>
        </form>
      </section>

      {/* Call-to-Action */}
      <section className={sharedStyles.ctaSection}>
        <h2>Not Ready to Message?</h2>
        <p>
          No worries. Just shout into the void and maybe we’ll hear it. Or, you
          know, come back later when you’re ready to type something.
        </p>

        {/* Optional: Add Social Media Links */}
        <p>
          Meanwhile, you can find us on:
          <br />
          <a
            href="https://twitter.com/yourhandle"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </a>{' '}
          |{' '}
          <a
            href="https://instagram.com/yourhandle"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
        </p>
      </section>

      <Footer />
    </div>
  );
}
