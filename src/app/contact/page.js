"use client";

import { useState } from "react";
import axios from "axios";

export default function ContactPage() {
  const [form, setForm] = useState({
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("Please login to contact support.");
      return;
    }

    try {
      setLoading(true);

      await axios.post(
        "https://jo-tech-b7lk.onrender.com/api/contact",
        {
          subject: form.subject,
          message: form.message,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSubmitted(true);

      setForm({
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error(error);

      alert(
        error?.response?.data?.message ||
          "Unable to send your message."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-6 py-16">

        <h1 className="text-4xl font-bold text-blue-900">
          Contact Us
        </h1>

        <p className="mt-4 text-gray-600 max-w-2xl">
          Have a question, feedback, feature request, or need support?
          We'd love to hear from you.
        </p>

        <div className="grid lg:grid-cols-3 gap-10 mt-14">

          {/* Contact Information */}

          <div className="space-y-8">

            <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-6">
              <h2 className="text-xl font-semibold text-blue-900">
                Email
              </h2>

              <p className="mt-3 text-gray-600">
                joelconsult01@gmail.com
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-6">
              <h2 className="text-xl font-semibold text-blue-900">
                Website
              </h2>

              <a
                href="https://jo-tech-hub.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 block text-orange-600"
              >
                https://jo-tech-hub.vercel.app
              </a>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-6">
              <h2 className="text-xl font-semibold text-blue-900">
                Support Hours
              </h2>

              <p className="mt-3 text-gray-600">
                Monday – Friday
                <br />
                10:00 AM – 4:00 PM (WAT)
              </p>
            </div>

          </div>

          {/* Contact Form */}

          <div className="lg:col-span-2">

            <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-8">

              {submitted ? (

                <div className="rounded-xl bg-green-100 border border-green-300 p-5">
                  <h2 className="text-xl font-bold text-green-700">
                    Message Sent Successfully 🎉
                  </h2>

                  <p className="mt-2 text-green-700">
                    Thank you for contacting JoTech Learn.
                    We've received your message and will respond as soon as possible.
                  </p>
                </div>

              ) : (

                <form
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >

                  <div>

                    <label className="font-medium">
                      Subject
                    </label>

                    <input
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      required
                      placeholder="Briefly describe your issue"
                      className="w-full mt-2 border rounded-xl px-4 py-3"
                    />

                  </div>

                  <div>

                    <label className="font-medium">
                      Message
                    </label>

                    <textarea
                      rows="7"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      placeholder="Tell us how we can help you..."
                      className="w-full mt-2 border rounded-xl px-4 py-3"
                    />

                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-900 text-white px-8 py-3 rounded-xl hover:bg-blue-800 transition disabled:opacity-50"
                  >
                    {loading
                      ? "Sending..."
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