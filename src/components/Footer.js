// src/components/Footer.js
import React from 'react';
import { FaCode, FaExternalLinkAlt } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const portfolioUrl = "https://nadeer-ansari.netlify.app/";

  return (
    <footer style={{
      marginTop: '2rem',
      padding: '1rem 0',
      backgroundColor: 'var(--bg-secondary)',
      borderTop: '1px solid var(--border-color)',
      color: 'var(--text-secondary)',
      fontSize: '0.75rem'
    }}>
      <div className="container">
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '1rem',
          flexWrap: 'wrap',
          rowGap: '0.5rem'
        }}>
          {/* CineStack Brand */}
          <span>
            🎬 <strong>CineScope</strong>
          </span>
          
          <span>•</span>
          
          {/* Developer Credit */}
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
            <FaCode style={{ fontSize: '0.7rem' }} />
            <span>by</span>
            <a 
              href={portfolioUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: 'var(--accent)',
                textDecoration: 'none',
                fontWeight: '500',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.25rem'
              }}
            >
              Nadeer Ansari
              <FaExternalLinkAlt style={{ fontSize: '0.6rem' }} />
            </a>
          </span>
          
          <span>•</span>
          
          {/* Data Source */}
          <span>
            Data: <a 
              href="https://www.themoviedb.org/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--text-secondary)', textDecoration: 'underline' }}
            >
              TMDB
            </a>
          </span>
          
          <span>•</span>
          
          {/* Copyright */}
          <span>© {currentYear}</span>
          
          <span>•</span>
          
          {/* Disclaimer */}
          <span style={{ opacity: 0.7 }}>Discovery only</span>
        </div>
      </div>
    </footer>
  );
}