"use client";

import { useState } from "react";
import axios from "axios";

export default function ContactPage() {
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;

  const isAuthenticated = !!token;

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = isAuthenticated
        ? {
            subject: form.subject,
            message: form.message,
          }
        : {
            name: form.name,
            email: form.email,
            subject: form.subject,
            message: form.message,
          };

      await axios.post(
        "https://jo-tech-b7lk.onrender.com/api/contact",
        payload,
        {
          headers: token
            ? {
                Authorization: `Bearer ${token}`,
              }
            : {},
        }
      );

      setSubmitted(true);

      setForm({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Unable to send your message."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50">

      {/* HERO */}

      <section className="bg-blue-900 text-white">

        <div className="max-w-7xl mx-auto px-6 py-16">

          <h1 className="text-4xl md:text-5xl font-bold">
            Contact Us
          </h1>

          <p className="mt-5 text-blue-100 max-w-3xl text-lg">
            We'd love to hear from you. Whether you have a question,
            feedback, bug report, feature request, or simply want to say
            hello, we're here to help.
          </p>

        </div>

      </section>

      <div className="max-w-7xl mx-auto px-6 py-14">

        <div className="grid lg:grid-cols-3 gap-10">

          {/* LEFT COLUMN */}

          <div className="space-y-6">

            <div className="bg-white rounded-2xl border border-blue-100 shadow-sm p-6">

              <h2 className="text-xl font-bold text-blue-900">
                Email
              </h2>

              <p className="mt-3 text-gray-600 break-all">
                joelconsult01@gmail.com
              </p>

            </div>

            <div className="bg-white rounded-2xl border border-blue-100 shadow-sm p-6">

              <h2 className="text-xl font-bold text-blue-900">
                Website
              </h2>

              <a
                href="https://jo-tech-hub.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-3 text-orange-500 hover:underline break-all"
              >
                https://jo-tech-hub.vercel.app
              </a>

            </div>

            <div className="bg-white rounded-2xl border border-blue-100 shadow-sm p-6">

              <h2 className="text-xl font-bold text-blue-900">
                Support Hours
              </h2>

              <p className="mt-3 text-gray-600">
                Monday - Friday
                <br />
                10:00 AM - 4:00 PM (WAT)
              </p>

            </div>

            <div className="bg-blue-900 text-white rounded-2xl p-6">

              <h2 className="text-xl font-bold">
                Need Help?
              </h2>

              <p className="mt-3 text-blue-100">
                We usually respond within one business day.
              </p>

            </div>

          </div>

          {/* RIGHT COLUMN */}

          <div className="lg:col-span-2">

            <div className="bg-white rounded-2xl border border-blue-100 shadow-sm p-8">

              {submitted ? (

                <div className="bg-green-50 border border-green-200 rounded-xl p-6">

                  <h2 className="text-2xl font-bold text-green-700">
                    Message Sent Successfully 🎉
                  </h2>

                  <p className="mt-3 text-green-700">
                    Thank you for contacting JO-Tech Learn.
                    We have received your message and will get back to you
                    as soon as possible.
                  </p>

                </div>

              ) : (

                <form
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >

                  {!isAuthenticated && (

                    <>
                      <div>

                        <label className="block font-semibold text-blue-900">
                          Full Name
                        </label>

                        <input
                          type="text"
                          name="name"
                          required
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Enter your full name"
                          className="w-full mt-2 rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-900"
                        />

                      </div>

                      <div>

                        <label className="block font-semibold text-blue-900">
                          Email Address
                        </label>

                        <input
                          type="email"
                          name="email"
                          required
                          value={form.email}
                          onChange={handleChange}
                          placeholder="Enter your email"
                          className="w-full mt-2 rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-900"
                        />

                      </div>
                    </>

                  )}

                  <div>

                    <label className="block font-semibold text-blue-900">
                      Subject
                    </label>

                    <input
                      type="text"
                      name="subject"
                      required
                      value={form.subject}
                      onChange={handleChange}
                      placeholder="Briefly describe your issue"
                      className="w-full mt-2 rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-900"
                    />

                  </div>

                  <div>

                    <label className="block font-semibold text-blue-900">
                      Message
                    </label>

                    <textarea
                      rows={8}
                      name="message"
                      required
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us how we can help you..."
                      className="w-full mt-2 rounded-xl border border-gray-300 px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-900"
                    />

                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-900 hover:bg-blue-800 text-white px-8 py-3 rounded-xl font-semibold transition disabled:opacity-60"
                  >
                    {loading
                      ? "Sending Message..."
                      : "Send Message"}
                  </button>

                </form>

              )}

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}