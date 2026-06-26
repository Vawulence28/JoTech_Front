export const metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="max-w-5xl mx-auto px-6 py-16">

        <h1 className="text-4xl font-bold text-blue-900">
          Privacy Policy
        </h1>

        <p className="mt-4 text-gray-600">
          Last Updated: June 2026
        </p>

        <div className="mt-12 space-y-10 text-gray-700 leading-8">

          <section>
            <h2 className="text-2xl font-semibold text-blue-900">
              Introduction
            </h2>

            <p className="mt-4">
              JO-Tech Learn is committed to protecting your privacy.
              This Privacy Policy explains what information we collect,
              how we use it, how we protect it, and the choices available
              to you when using our platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-blue-900">
              Information We Collect
            </h2>

            <ul className="list-disc ml-6 mt-4 space-y-2">
              <li>Name and profile information.</li>
              <li>Email address.</li>
              <li>Learning preferences.</li>
              <li>Learning progress.</li>
              <li>XP, badges and certificates.</li>
              <li>Telegram connection status.</li>
              <li>Device and browser information.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-blue-900">
              How We Use Your Information
            </h2>

            <p className="mt-4">
              Your information is used to generate personalized learning
              roadmaps, track your progress, maintain streaks, award
              achievements, create recovery plans, improve the platform,
              and provide customer support.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-blue-900">
              Data Security
            </h2>

            <p className="mt-4">
              We implement industry-standard security measures to protect
              your information against unauthorized access, disclosure,
              alteration, or destruction.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-blue-900">
              Third-Party Services
            </h2>

            <p className="mt-4">
              JO-Tech Learn integrates with trusted third-party services
              including Supabase, Groq AI, Telegram, and Vercel to deliver
              core functionality.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-blue-900">
              Cookies
            </h2>

            <p className="mt-4">
              Cookies may be used to keep you signed in, remember your
              preferences, and improve your overall experience.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-blue-900">
              Your Rights
            </h2>

            <ul className="list-disc ml-6 mt-4 space-y-2">
              <li>Access your personal information.</li>
              <li>Correct inaccurate information.</li>
              <li>Request deletion of your account.</li>
              <li>Withdraw consent where applicable.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-blue-900">
              Contact
            </h2>

            <p className="mt-4">
              Questions regarding this Privacy Policy may be sent through
              the Contact page available on this website.
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}