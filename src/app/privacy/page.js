export const metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-slate-50">

      {/* HERO */}

      <section className="bg-blue-900 text-white">

        <div className="max-w-6xl mx-auto px-6 py-16">

          <h1 className="text-4xl md:text-5xl font-bold">
            Privacy Policy
          </h1>

          <p className="mt-4 text-blue-100 text-lg">
            Last Updated: June 2026
          </p>

        </div>

      </section>

      <section className="max-w-5xl mx-auto px-6 py-16">

        <div className="bg-white rounded-3xl shadow-sm border border-blue-100 p-10">

          <div className="space-y-12 text-gray-700 leading-8">

            <section>

              <h2 className="text-2xl font-bold text-blue-900">
                1. Introduction
              </h2>

              <p className="mt-4">
                JO-Tech Learn is committed to protecting your privacy and
                safeguarding the personal information you share with us.
                This Privacy Policy explains what information we collect,
                why we collect it, how we use it, and the choices available
                to you when using our platform.
              </p>

            </section>

            <section>

              <h2 className="text-2xl font-bold text-blue-900">
                2. Information We Collect
              </h2>

              <p className="mt-4">
                Depending on how you use JO-Tech Learn, we may collect:
              </p>

              <ul className="list-disc ml-6 mt-4 space-y-2">

                <li>Full name and email address.</li>

                <li>
                  Learning goals, skill level and study preferences.
                </li>

                <li>
                  AI-generated learning roadmaps and lesson progress.
                </li>

                <li>
                  Daily streaks, XP, badges and certificates earned.
                </li>

                <li>
                  Recovery plans for missed learning sessions.
                </li>

                <li>
                  Telegram notification preferences.
                </li>

                <li>
                  Contact messages submitted through our support page.
                </li>

                <li>
                  Device, browser and technical information required to
                  improve the platform.
                </li>

              </ul>

            </section>

            <section>

              <h2 className="text-2xl font-bold text-blue-900">
                3. How We Use Your Information
              </h2>

              <p className="mt-4">
                Your information is used to personalize your learning
                experience, generate AI-powered learning roadmaps, monitor
                progress, maintain streaks, award achievements, provide
                reminders, generate certificates, improve platform
                performance, respond to support requests and enhance future
                versions of JO-Tech Learn.
              </p>

            </section>

            <section>

              <h2 className="text-2xl font-bold text-blue-900">
                4. Data Storage and Security
              </h2>

              <p className="mt-4">
                We use modern security practices to protect your data from
                unauthorized access, alteration, disclosure or destruction.
                While no internet service can guarantee absolute security,
                we continuously work to keep your information safe.
              </p>

            </section>

            <section>

              <h2 className="text-2xl font-bold text-blue-900">
                5. Third-Party Services
              </h2>

              <p className="mt-4">
                JO-Tech Learn relies on trusted third-party providers to
                deliver core functionality, including:
              </p>

              <ul className="list-disc ml-6 mt-4 space-y-2">

                <li>Supabase (Database)</li>

                <li>Groq AI (AI roadmap generation)</li>

                <li>Telegram (Learning reminders)</li>

                <li>Vercel (Frontend hosting)</li>

                <li>Render (Backend hosting)</li>

              </ul>

            </section>

            <section>

              <h2 className="text-2xl font-bold text-blue-900">
                6. Cookies and Local Storage
              </h2>

              <p className="mt-4">
                JO-Tech Learn may use cookies and browser storage to keep
                you signed in, remember your preferences, support PWA
                functionality and improve your overall experience.
              </p>

            </section>

            <section>

              <h2 className="text-2xl font-bold text-blue-900">
                7. Your Rights
              </h2>

              <p className="mt-4">
                You have the right to:
              </p>

              <ul className="list-disc ml-6 mt-4 space-y-2">

                <li>Access your personal information.</li>

                <li>Update inaccurate information.</li>

                <li>Delete your account permanently.</li>

                <li>Request clarification regarding your stored data.</li>

              </ul>

            </section>

            <section>

              <h2 className="text-2xl font-bold text-blue-900">
                8. Changes to this Policy
              </h2>

              <p className="mt-4">
                We may update this Privacy Policy from time to time as the
                platform evolves. Any significant changes will be reflected
                on this page with an updated revision date.
              </p>

            </section>

            <section>

              <h2 className="text-2xl font-bold text-blue-900">
                9. Contact Us
              </h2>

              <p className="mt-4">
                If you have any questions regarding this Privacy Policy or
                how your information is handled, please use the Contact
                page available on JO-Tech Learn or email us at
                <span className="font-semibold text-blue-900">
                  {" "}
                  joelconsult01@gmail.com
                </span>.
              </p>

            </section>

          </div>

        </div>

      </section>

    </main>
  );
}