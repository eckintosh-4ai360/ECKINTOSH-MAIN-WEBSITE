import React from 'react';
import { LegalPage } from './LegalPage';

const UPDATED = 'September 20, 2026';

export const PrivacyPolicy: React.FC = () => (
  <LegalPage title="Privacy Policy" updated={UPDATED}>
    <p>
      This policy explains what Eckintosh Technologies ("Eckintosh", "we", "us") collects through
      this website, why, and how it's handled. It covers eckintosh.com and the project planner form
      on it. It does not cover the separate systems we build and deploy for clients (school
      management, POS, e-commerce and the rest) — each of those has its own privacy terms set by the
      organisation that runs it.
    </p>

    <h2>What we collect</h2>
    <p>We collect information in two ways:</p>
    <ul>
      <li>
        <strong>What you submit.</strong> The project planner ("Start a project") asks for your name,
        organisation, phone number, email address, and any notes about what you want built. We only
        collect this when you fill in and submit that form yourself.
      </li>
      <li>
        <strong>Basic technical data.</strong> Our server and hosting provider log standard request
        data (IP address, browser user agent, timestamps) for security and debugging, the way most
        web servers do. We do not run third-party analytics, advertising pixels, or tracking cookies
        on this site.
      </li>
    </ul>

    <h2>How we use it</h2>
    <ul>
      <li>To respond to your enquiry and discuss the project you described.</li>
      <li>To keep a record of enquiries in our admin system so nothing gets lost.</li>
      <li>To operate, secure and improve the site itself.</li>
    </ul>
    <p>We do not sell your information, and we do not share it with third parties for marketing.</p>

    <h2>Where it's stored</h2>
    <p>
      Enquiry details are stored in our PostgreSQL database (hosted on Neon) and are visible only to
      Eckintosh staff through a password-protected admin console. Media files uploaded by our own
      team through that console (product screenshots, case study images) are hosted on Cloudinary —
      this does not involve visitor data.
    </p>

    <h2>Cookies</h2>
    <p>
      The public site sets no cookies. The admin console sets a single, essential, httpOnly session
      cookie once an authorised staff member logs in — it identifies the session and is not used for
      tracking visitors.
    </p>

    <h2>Your choices</h2>
    <p>
      You can ask us what information we hold about you, ask us to correct it, or ask us to delete it.
      Reach us via WhatsApp at{' '}
      <a href="https://wa.me/233531152121" target="_blank" rel="noopener noreferrer">
        053 115 2121
      </a>{' '}
      or through the project planner form, and we'll action the request.
    </p>

    <h2>Changes to this policy</h2>
    <p>
      If this policy changes materially, we'll update the date at the top of this page. Continued use
      of the site after a change means you accept the updated policy.
    </p>
  </LegalPage>
);

export default PrivacyPolicy;
