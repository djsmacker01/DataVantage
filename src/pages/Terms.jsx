import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
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

export default function Terms() {
  return (
    <PageTransition>
      <SEOHead
        title="Terms & Conditions"
        description="Terms and conditions governing the use of DataVantage — data consulting, training, blog, and video services by Muminah Omolara Shehu, Lagos, Nigeria."
        path="/terms"
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
            Terms &amp; Conditions
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
            These Terms &amp; Conditions ("Terms") govern your access to and use of{' '}
            <strong style={{ color: 'var(--color-text-base)' }}>datavantage.ng</strong> and all services offered by{' '}
            <strong style={{ color: 'var(--color-text-base)' }}>DataVantage</strong>, operated by{' '}
            <strong style={{ color: 'var(--color-text-base)' }}>Muminah Omolara Shehu</strong> ("we", "us", "our"), based in
            Lagos, Nigeria. By using this website or booking any service, you agree to be bound by these Terms.
          </motion.p>

          <Section title="1. Acceptance of Terms">
            <p>
              By accessing or using datavantage.ng, you confirm that you are at least 18 years of age and have the legal
              capacity to enter into a binding agreement. If you are accessing the site on behalf of a company or organisation,
              you represent that you have authority to bind that entity to these Terms.
            </p>
          </Section>

          <Section title="2. Services Offered">
            <p>DataVantage provides the following services:</p>
            <ul className="list-disc pl-5 flex flex-col gap-2">
              <li>
                <strong style={{ color: 'var(--color-text-base)' }}>Data Analysis Consulting</strong> — custom dashboards,
                reporting pipelines, and data quality services
              </li>
              <li>
                <strong style={{ color: 'var(--color-text-base)' }}>Business Analysis</strong> — process mapping, requirements
                documentation, and stakeholder alignment
              </li>
              <li>
                <strong style={{ color: 'var(--color-text-base)' }}>Data Engineering</strong> — ETL/ELT pipelines, data warehouse
                design, and cloud data infrastructure
              </li>
              <li>
                <strong style={{ color: 'var(--color-text-base)' }}>Training &amp; Workshops</strong> — individual coaching and
                corporate training in Power BI, SQL, Python, and Excel
              </li>
              <li>
                <strong style={{ color: 'var(--color-text-base)' }}>Free content</strong> — blog articles and video tutorials
                available at no charge
              </li>
            </ul>
            <p>
              The scope, timeline, deliverables, and pricing for paid services will be agreed in writing before any work
              commences.
            </p>
          </Section>

          <Section title="3. Bookings & Payments">
            <ul className="list-disc pl-5 flex flex-col gap-2">
              <li>
                Booking requests submitted via our website are not confirmed until you receive a written confirmation from us.
              </li>
              <li>
                Payment terms, methods, and schedules will be agreed separately for each engagement. We typically require a
                deposit before work begins.
              </li>
              <li>
                All prices are quoted in Nigerian Naira (₦) unless otherwise stated.
              </li>
              <li>
                We reserve the right to decline any booking at our discretion.
              </li>
            </ul>
          </Section>

          <Section title="4. Cancellations & Refunds">
            <ul className="list-disc pl-5 flex flex-col gap-2">
              <li>
                <strong style={{ color: 'var(--color-text-base)' }}>Cancellations by the client</strong> — if you cancel a
                confirmed booking more than 48 hours before a scheduled consultation or training session, any deposit paid may be
                applied to a rescheduled session. Cancellations within 48 hours forfeit the deposit.
              </li>
              <li>
                <strong style={{ color: 'var(--color-text-base)' }}>Cancellations by us</strong> — if we need to cancel, we will
                notify you as soon as possible and offer a full refund of any amounts paid or an alternative date.
              </li>
              <li>
                <strong style={{ color: 'var(--color-text-base)' }}>Project work</strong> — refund terms for consulting
                engagements will be specified in the project agreement.
              </li>
            </ul>
          </Section>

          <Section title="5. Intellectual Property">
            <p>
              All content on datavantage.ng — including blog posts, videos, course materials, design, and graphics — is the
              intellectual property of Muminah Omolara Shehu / DataVantage unless explicitly stated otherwise.
            </p>
            <ul className="list-disc pl-5 flex flex-col gap-2">
              <li>
                You may share links to our content and quote brief excerpts with proper attribution.
              </li>
              <li>
                You may not reproduce, republish, sell, or distribute our content in any form without prior written permission.
              </li>
              <li>
                Deliverables created under a paid engagement are governed by the terms of that specific project agreement.
                Typically, full ownership transfers to the client upon receipt of final payment.
              </li>
            </ul>
          </Section>

          <Section title="6. Acceptable Use">
            <p>When using our website or services, you agree not to:</p>
            <ul className="list-disc pl-5 flex flex-col gap-2">
              <li>Submit false, misleading, or fraudulent information in any form</li>
              <li>Use the site in any way that violates Nigerian law or applicable international law</li>
              <li>Attempt to gain unauthorised access to any part of the site or its backend systems</li>
              <li>Harass, threaten, or abuse other users in comments or community spaces</li>
              <li>Use automated tools to scrape, crawl, or download content in bulk without permission</li>
              <li>Submit spam or unsolicited commercial messages through our contact or booking forms</li>
            </ul>
            <p>
              We reserve the right to remove any content and block any user who violates these rules without prior notice.
            </p>
          </Section>

          <Section title="7. Comments & User-Generated Content">
            <p>
              When you post a comment on our blog or video pages, you grant DataVantage a non-exclusive, royalty-free licence to
              display and moderate that content on the site.
            </p>
            <p>
              You are solely responsible for the content of your comments. We reserve the right to remove any comment that is
              offensive, misleading, spam, or otherwise inappropriate.
            </p>
          </Section>

          <Section title="8. Newsletter">
            <p>
              By subscribing to our newsletter, you consent to receiving periodic emails from DataVantage. You may unsubscribe at
              any time by clicking the unsubscribe link in any email or by contacting us directly. We will not send you
              third-party marketing content.
            </p>
          </Section>

          <Section title="9. Disclaimer of Warranties">
            <p>
              The content on datavantage.ng is provided for informational purposes only and does not constitute professional
              financial, legal, or business advice. While we strive for accuracy, we make no representations or warranties of
              any kind regarding the completeness or accuracy of any content on this site.
            </p>
            <p>
              Our services are provided "as is." We do not guarantee that any specific business outcome will result from
              using our consulting, training, or advisory services.
            </p>
          </Section>

          <Section title="10. Limitation of Liability">
            <p>
              To the fullest extent permitted by Nigerian law, DataVantage and Muminah Omolara Shehu shall not be liable for
              any indirect, incidental, consequential, or punitive damages arising out of your use of our website or services.
            </p>
            <p>
              Our total liability to you for any claim arising from a service engagement shall not exceed the amount you paid
              for that specific service.
            </p>
          </Section>

          <Section title="11. Governing Law">
            <p>
              These Terms are governed by the laws of the Federal Republic of Nigeria. Any dispute arising from these Terms or
              your use of our services shall first be resolved through good-faith negotiation. If unresolved, disputes shall be
              subject to the jurisdiction of the courts of Lagos State, Nigeria.
            </p>
          </Section>

          <Section title="12. Changes to These Terms">
            <p>
              We may revise these Terms at any time. The updated version will be posted on this page with a new "Last updated"
              date. Continued use of the site after any changes constitutes your acceptance of the revised Terms.
            </p>
          </Section>

          <Section title="13. Contact">
            <p>
              For questions about these Terms, please contact:
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
              See also our{' '}
              <Link to="/privacy" style={{ color: '#01696f' }}>
                Privacy Policy
              </Link>
              .
            </p>
          </Section>
        </motion.div>
      </div>
    </PageTransition>
  )
}
