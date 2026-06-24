"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function CertificatePage({ params }) {
  const [cert, setCert] = useState(null);

  useEffect(() => {
    axios
      .get(
        `http://jo-tech-b7lk.onrender.com/api/certificates/${params.token}`
      )
      .then((res) => setCert(res.data.data))
      .catch((err) =>
        console.error("Certificate Error:", err)
      );
  }, []);

  // =====================================
  // LOADING
  // =====================================

  if (!cert) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-lg font-medium text-blue-900">
          Loading Certificate...
        </p>
      </div>
    );
  }

  // =====================================
  // PAGE
  // =====================================

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">

      <div className="max-w-5xl mx-auto">

        {/* HEADER */}

        <div className="text-center mb-10">

          <span className="inline-block bg-orange-100 text-orange-600 px-4 py-2 rounded-full font-medium mb-4">
            Verified Achievement
          </span>

          <h1 className="text-4xl font-bold text-blue-900">
            Public Certificate
          </h1>

          <p className="text-gray-600 mt-3">
            This certificate has been issued and shared through JoTech.
          </p>

        </div>

        {/* CERTIFICATE */}

        <div className="bg-white rounded-3xl shadow-xl border border-blue-100 overflow-hidden">

          {/* TOP STRIPE */}

          <div className="h-4 bg-blue-900"></div>

          <div className="p-12 md:p-16">

            <div className="text-center">

              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-orange-100 mb-8">
                <span className="text-5xl">🏆</span>
              </div>

              <p className="uppercase tracking-[0.3em] text-blue-700 font-semibold">
                JoTech
              </p>

              <h2 className="text-5xl font-bold text-blue-900 mt-6">
                Certificate
              </h2>

              <p className="text-xl text-orange-600 font-medium mt-2">
                Of Completion
              </p>

              <div className="w-32 h-1 bg-orange-500 mx-auto my-8 rounded-full"></div>

              <p className="text-lg text-gray-600">
                This certificate is awarded for successfully completing
              </p>

              <h3 className="text-3xl md:text-4xl font-bold text-blue-900 mt-8">
                {cert.achievement_text}
              </h3>

              <p className="mt-10 text-gray-600">
                Issued On
              </p>

              <p className="text-xl font-semibold text-blue-900 mt-2">
                {new Date(cert.issued_at).toDateString()}
              </p>

              <div className="mt-12 flex justify-center">

                <div className="border-t-2 border-blue-200 pt-3 w-64">
                  <p className="font-bold text-blue-900">
                    JoTech Certification
                  </p>
                </div>

              </div>

            </div>

          </div>

          {/* BOTTOM STRIPE */}

          <div className="h-4 bg-orange-500"></div>

        </div>

        {/* ACTIONS */}

        <div className="flex flex-wrap justify-center gap-4 mt-10">

          <a
            href={`http://jo-tech-b7lk.onrender.com${cert.certificate_url}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-900 hover:bg-blue-800 text-white px-8 py-3 rounded-xl font-semibold transition"
          >
            Download PDF
          </a>

          <button
            onClick={() =>
              navigator.share?.({
                title: "My LearnFlow Certificate",
                url: window.location.href,
              })
            }
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-semibold transition"
          >
            Share Certificate
          </button>

        </div>

        {/* VERIFICATION */}

        <div className="bg-white border border-blue-100 rounded-3xl shadow-sm p-8 mt-10">

          <h3 className="text-2xl font-bold text-blue-900">
            Verification Details
          </h3>

          <p className="text-gray-600 mt-2">
            This certificate can be independently verified.
          </p>

          <div className="grid md:grid-cols-2 gap-5 mt-6">

            <div className="bg-blue-50 p-5 rounded-xl">
              <p className="text-sm text-blue-600 mb-2">
                Certificate ID
              </p>

              <p className="font-semibold text-blue-900 break-all">
                {cert.id}
              </p>
            </div>

            <div className="bg-orange-50 p-5 rounded-xl">
              <p className="text-sm text-orange-600 mb-2">
                Issue Date
              </p>

              <p className="font-semibold text-orange-700">
                {new Date(cert.issued_at).toDateString()}
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}