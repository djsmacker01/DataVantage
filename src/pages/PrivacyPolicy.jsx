import { motion } from 'framer-motion'
import PageTransition from '@/components/utils/PageTransition'
import SEOHead from '@/components/seo/SEOHead'

const fadeUp = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }

function Section({ title, children }) {
  return (
    <motion.section variants={fadeUp} className="mb-10">
      <h2
        className="text-xl mb-4 pb-3"
        style={{
          fontFamily: "'Instrument Serif', serif",
          color: 'var(--color-text-base)',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        {title}
      </h2>
      <div className="flex flex-col gap-3 text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
        {children}
      </div>
    </motion.section>
  )
}

export default function PrivacyPolicy() {
  return (
    <PageTransition>
      <SEOHead
        title="Privacy Policy"
        description="How DataVantage collects, uses, and protects your personal data in accordance with the Nigeria Data Protection Regulation (NDPR)."
        path="/privacy"
        noindex={false}
      />

      {/* Hero */}
      <section
        className="py-14 md:py-20 relative overflow-hidden"
        style={{ background: 'var(--color-surface-alt)', borderBottom: '1px solid var(--color-border)' }}
      >
        <div className="grain absolute inset-0 pointer-events-none" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-sm font-semibold mb-3 uppercase tracking-wide"
            style={{ color: '#01696f', letterSpacing: '0.06em' }}
          >
            Legal
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-3xl md:text-4xl mb-4"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Privacy Policy
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="text-sm"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Last updated: 14 June 2026 &nbsp;·&nbsp; Effective date: 14 June 2026
          </motion.p>
        </div>
      </section>

      {/* Body */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
        <motion.div
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          initial="hidden"
          animate="visible"
        >
          {/* Intro */}
          <motion.p
            variants={fadeUp}
            className="text-sm leading-relaxed mb-10 p-5 rounded-2xl"
            style={{ background: '#01696f0c', border: '1px solid #01696f20', color: 'var(--color-text-muted)' }}
          >
            This Privacy Policy explains how <strong style={{ color: 'var(--color-text-base)' }}>DataVantage</strong>, operated by{' '}
            <strong style={{ color: 'var(--color-text-base)' }}>Muminah Omolara Shehu</strong> ("we", "us", "our"), collects,
            uses, stores, and protects your personal information when you visit{' '}
            <strong style={{ color: 'var(--color-text-base)' }}>datavantage.ng</strong> or use any of our services. We are
            committed to complying with the{' '}
            <strong style={{ color: 'var(--color-text-base)' }}>Nigeria Data Protection Regulation (NDPR) 2019</strong> and the
            Nigeria Data Protection Act 2023.
          </motion.p>

          <Section title="1. Who We Are">
            <p>
              <strong style={{ color: 'var(--color-text-base)' }}>Business name:</strong> DataVantage
            </p>
            <p>
              <strong style={{ color: 'var(--color-text-base)' }}>Owner / Data Controller:</strong> Muminah Omolara Shehu
            </p>
            <p>
              <strong style={{ color: 'var(--color-text-base)' }}>Address:</strong> Lagos, Nigeria
            </p>
            <p>
              <strong style={{ color: 'var(--color-text-base)' }}>Email:</strong>{' '}
              <a href="mailto:muminahshehu@gmail.com" style={{ color: '#01696f' }}>
                muminahshehu@gmail.com
              </a>
            </p>
          </Section>

          <Section title="2. Information We Collect">
            <p>We collect the following categories of personal data:</p>
            <ul className="list-disc pl-5 flex flex-col gap-2">
              <li>
                <strong style={{ color: 'var(--color-text-base)' }}>Contact & booking information</strong> — name, email address,
                phone number, and message content when you fill out our contact or booking forms.
              </li>
              <li>
                <strong style={{ color: 'var(--color-text-base)' }}>Newsletter subscriptions</strong> — your email address when
                you subscribe to our mailing list.
              </li>
              <li>
                <strong style={{ color: 'var(--color-text-base)' }}>Blog and video comments</strong> — your name and comment
                content when you interact with our content.
              </li>
              <li>
                <strong style={{ color: 'var(--color-text-base)' }}>Usage data</strong> — pages visited, time spent, device type,
                and browser type, collected automatically via our hosting and analytics tools.
              </li>
              <li>
                <strong style={{ color: 'var(--color-text-base)' }}>Cookies</strong> — small files stored on your device for
                session management and site performance (see Section 7).
              </li>
            </ul>
            <p>We do not collect sensitive personal data (financial account details, health data, biometrics).</p>
          </Section>

          <Section title="3. How We Use Your Information">
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-5 flex flex-col gap-2">
              <li>Respond to your enquiries, booking requests, and messages</li>
              <li>Deliver newsletter content you have subscribed to</li>
              <li>Improve our website content and user experience</li>
              <li>Send service-related updates (booking confirmations, follow-ups)</li>
              <li>Comply with legal obligations under Nigerian law</li>
            </ul>
            <p>
              We will never sell your personal data to third parties or use it for unrelated commercial purposes without your
              explicit consent.
            </p>
          </Section>

          <Section title="4. Legal Basis for Processing">
            <p>Under the NDPR and Nigeria Data Protection Act 2023, we process your data on the following lawful bases:</p>
            <ul className="list-disc pl-5 flex flex-col gap-2">
              <li>
                <strong style={{ color: 'var(--color-text-base)' }}>Consent</strong> — for newsletter subscriptions and optional
                cookies
              </li>
              <li>
                <strong style={{ color: 'var(--color-text-base)' }}>Contract performance</strong> — when processing a booking or
                service request
              </li>
              <li>
                <strong style={{ color: 'var(--color-text-base)' }}>Legitimate interests</strong> — for site analytics and
                improving our services
              </li>
              <li>
                <strong style={{ color: 'var(--color-text-base)' }}>Legal obligation</strong> — where Nigerian law requires us to
                retain certain records
              </li>
            </ul>
          </Section>

          <Section title="5. Data Sharing & Third Parties">
            <p>We use the following third-party services that may process your data on our behalf:</p>
            <ul className="list-disc pl-5 flex flex-col gap-2">
              <li>
                <strong style={{ color: 'var(--color-text-base)' }}>Supabase</strong> — our database and backend provider
                (stores bookings, comments, subscribers). Data is stored on secure cloud infrastructure.
              </li>
              <li>
                <strong style={{ color: 'var(--color-text-base)' }}>Google Fonts / Fontshare</strong> — font delivery services
                (may log your IP to serve font files).
              </li>
              <li>
                <strong style={{ color: 'var(--color-text-base)' }}>YouTube</strong> — embedded video content; subject to Google's
                Privacy Policy when played.
              </li>
            </ul>
            <p>
              We do not share your personal data with any other third party without your consent, except where required by law or
              a court order in Nigeria.
            </p>
          </Section>

          <Section title="6. Data Retention">
            <p>
              We retain your personal data only for as long as necessary to fulfil the purpose it was collected for, or as
              required by Nigerian law:
            </p>
            <ul className="list-disc pl-5 flex flex-col gap-2">
              <li>Contact messages: 12 months from receipt</li>
              <li>Booking records: 3 years (for service delivery and tax/legal compliance)</li>
              <li>Newsletter subscriptions: until you unsubscribe</li>
              <li>Comments: until deleted by you or us</li>
            </ul>
          </Section>

          <Section title="7. Cookies">
            <p>
              We use essential cookies required for the site to function (e.g., session tokens). We do not use tracking or
              advertising cookies.
            </p>
            <p>
              You can disable cookies in your browser settings at any time, though some features of the site may not function
              correctly as a result.
            </p>
          </Section>

          <Section title="8. Your Rights Under NDPR">
            <p>As a data subject under Nigerian law, you have the right to:</p>
            <ul className="list-disc pl-5 flex flex-col gap-2">
              <li>
                <strong style={{ color: 'var(--color-text-base)' }}>Access</strong> — request a copy of the personal data we hold
                about you
              </li>
              <li>
                <strong style={{ color: 'var(--color-text-base)' }}>Correction</strong> — request that inaccurate data be
                corrected
              </li>
              <li>
                <strong style={{ color: 'var(--color-text-base)' }}>Deletion</strong> — request that your data be deleted
                ("right to erasure")
              </li>
              <li>
                <strong style={{ color: 'var(--color-text-base)' }}>Objection</strong> — object to processing of your data for
                certain purposes
              </li>
              <li>
                <strong style={{ color: 'var(--color-text-base)' }}>Withdraw consent</strong> — unsubscribe from our newsletter
                at any time
              </li>
            </ul>
            <p>
              To exercise any of these rights, email us at{' '}
              <a href="mailto:muminahshehu@gmail.com" style={{ color: '#01696f' }}>
                muminahshehu@gmail.com
              </a>
              . We will respond within 30 days.
            </p>
          </Section>

          <Section title="9. Data Security">
            <p>
              We implement appropriate technical and organisational measures to protect your personal data against unauthorised
              access, loss, or disclosure. Our database is hosted on Supabase with row-level security enabled.
            </p>
            <p>
              However, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security but we
              take all reasonable steps to protect your data.
            </p>
          </Section>

          <Section title="10. Links to Other Websites">
            <p>
              Our website may contain links to third-party websites (LinkedIn, YouTube, etc.). We are not responsible for the
              privacy practices of those sites and encourage you to read their own privacy policies.
            </p>
          </Section>

          <Section title="11. Children's Privacy">
            <p>
              Our services are not directed to children under 13 years of age. We do not knowingly collect personal data from
              children. If you believe a child has provided us with personal information, please contact us and we will delete it
              promptly.
            </p>
          </Section>

          <Section title="12. Changes to This Policy">
            <p>
              We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated "Last
              updated" date. We encourage you to review this page periodically.
            </p>
          </Section>

          <Section title="13. Contact Us">
            <p>
              If you have questions about this Privacy Policy or your personal data, please contact:
            </p>
            <p>
              <strong style={{ color: 'var(--color-text-base)' }}>Muminah Omolara Shehu — DataVantage</strong>
              <br />
              Lagos, Nigeria
              <br />
              <a href="mailto:muminahshehu@gmail.com" style={{ color: '#01696f' }}>
                muminahshehu@gmail.com
              </a>
            </p>
            <p>
              You may also report complaints to the{' '}
              <strong style={{ color: 'var(--color-text-base)' }}>
                Nigeria Data Protection Commission (NDPC)
              </strong>{' '}
              at{' '}
              <a
                href="https://ndpc.gov.ng"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#01696f' }}
              >
                ndpc.gov.ng
              </a>
              .
            </p>
          </Section>
        </motion.div>
      </div>
    </PageTransition>
  )
}
