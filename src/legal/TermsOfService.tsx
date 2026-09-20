import React from 'react';
import { LegalPage } from './LegalPage';

const UPDATED = 'September 20, 2026';

export const TermsOfService: React.FC = () => (
  <LegalPage title="Terms of Service" updated={UPDATED}>
    <p>
      These terms cover your use of this website (eckintosh.com) — browsing it, and submitting the
      project planner form. They don't cover any software, system or contract we deliver to a client;
      that work is governed by the separate agreement signed for that engagement.
    </p>

    <h2>Using this site</h2>
    <p>
      The content here — copy, case studies, product walkthroughs, screenshots and code samples — is
      provided to describe our work and help you evaluate working with us. You're welcome to browse
      and share links to it. Please don't scrape, copy, or reuse the design, copy or case study
      content to represent it as your own work.
    </p>

    <h2>Case studies and figures</h2>
    <p>
      Metrics, timelines and outcomes described in our case studies reflect what a specific client
      experienced with a specific system in specific conditions. They illustrate what's possible, not
      a guarantee of what any future project will achieve — actual results depend on your data,
      processes and how a system is rolled out.
    </p>

    <h2>The project planner</h2>
    <p>
      Submitting the planner form is an enquiry, not a contract, purchase, or commitment on either
      side. A real project only begins once we've agreed scope, pricing and timeline in writing.
    </p>

    <h2>No warranty on the site itself</h2>
    <p>
      We keep this site up and working as best we can, but it's provided "as is" without warranty of
      uninterrupted availability. We're not liable for loss arising from the site being temporarily
      unavailable or from decisions made solely on marketing content published here.
    </p>

    <h2>Intellectual property</h2>
    <p>
      Eckintosh Technologies owns the Eckintosh name, logo, and the content on this site unless stated
      otherwise. Product and company names mentioned as clients or integrations belong to their
      respective owners.
    </p>

    <h2>Changes</h2>
    <p>
      We may update these terms as the site changes. The date at the top of this page shows when it
      was last revised.
    </p>

    <h2>Contact</h2>
    <p>
      Questions about these terms can be sent via WhatsApp at{' '}
      <a href="https://wa.me/233531152121" target="_blank" rel="noopener noreferrer">
        +233 53 115 2121
      </a>{' '}
      or through the project planner form.
    </p>
  </LegalPage>
);

export default TermsOfService;
