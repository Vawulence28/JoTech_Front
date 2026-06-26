export const metadata = {
  title: "Terms of Service",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="max-w-5xl mx-auto px-6 py-16">

        <h1 className="text-4xl font-bold text-blue-900">
          Terms of Service
        </h1>

        <p className="mt-4 text-gray-600">
          Last Updated: June 2026
        </p>

        <div className="mt-12 space-y-10 text-gray-700 leading-8">

          <section>
            <h2 className="text-2xl font-semibold text-blue-900">
              Acceptance of Terms
            </h2>

            <p className="mt-4">
              By accessing or using JO-Tech Learn, you agree to comply with
              these Terms of Service. If you do not agree with any part of
              these terms, you should discontinue use of the platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-blue-900">
              User Accounts
            </h2>

            <p className="mt-4">
              You are responsible for maintaining the confidentiality of
              your account credentials and for all activities carried out
              under your account. You agree to provide accurate information
              during registration and keep it up to date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-blue-900">
              Use of the Platform
            </h2>

            <ul className="list-disc ml-6 mt-4 space-y-2">
              <li>Use the platform only for lawful purposes.</li>
              <li>Do not attempt unauthorized access to any system.</li>
              <li>Do not interfere with the operation or security of the platform.</li>
              <li>Do not misuse AI-generated learning resources.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-blue-900">
              AI-Generated Content
            </h2>

            <p className="mt-4">
              Learning roadmaps, recovery plans, and recommendations are
              generated using artificial intelligence. While we strive for
              high-quality results, we cannot guarantee that every suggestion
              will be complete, accurate, or suitable for every learner.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-blue-900">
              Intellectual Property
            </h2>

            <p className="mt-4">
              All platform content, branding, software, and design remain
              the property of JO-Tech Learn unless otherwise stated. You may
              not reproduce, distribute, or commercially exploit any part of
              the platform without prior written permission.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-blue-900">
              Account Suspension
            </h2>

            <p className="mt-4">
              We reserve the right to suspend or terminate accounts that
              violate these Terms of Service or engage in activities that
              threaten the security or integrity of the platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-blue-900">
              Limitation of Liability
            </h2>

            <p className="mt-4">
              JO-Tech Learn is provided on an "as is" basis. To the maximum
              extent permitted by law, we are not liable for any indirect,
              incidental, or consequential damages arising from the use of
              the platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-blue-900">
              Changes to These Terms
            </h2>

            <p className="mt-4">
              We may update these Terms of Service from time to time. The
              latest version will always be available on this page, and your
              continued use of the platform constitutes acceptance of any
              updates.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-blue-900">
              Contact
            </h2>

            <p className="mt-4">
              If you have questions about these Terms of Service, please use
              the Contact page available on this website.
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}