"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

export default function CertificatePage() {
  const { id } = useParams();

  const [certificate, setCertificate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =====================================
  // FETCH CERTIFICATE
  // =====================================

  useEffect(() => {
    const fetchCertificate = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/certificates/id/${id}`
        );

        setCertificate(res.data.data);

      } catch (err) {

        console.error(
          "Certificate Error:",
          err
        );

        setError(
          "Failed to load certificate"
        );

      } finally {

        setLoading(false);

      }
    };

    if (id) {
      fetchCertificate();
    }
  }, [id]);

  // =====================================
  // LOADING
  // =====================================

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-lg font-medium text-blue-900">
          Loading Certificate...
        </p>
      </div>
    );
  }

  // =====================================
  // ERROR
  // =====================================

  if (error || !certificate) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white px-6">
        <div className="text-center max-w-lg">

          <div className="w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl">⚠️</span>
          </div>

          <h1 className="text-4xl font-bold text-blue-900">
            Certificate Not Found
          </h1>

          <p className="mt-4 text-gray-600">
            {error ||
              "The requested certificate does not exist."}
          </p>

        </div>
      </div>
    );
  }

  // =====================================
  // SHARE CERTIFICATE
  // =====================================

  const handleShare = async () => {
    const shareUrl =
      `${window.location.origin}/certificate/share/${certificate.share_token}`;

    try {

      if (navigator.share) {

        await navigator.share({
          title: "My LearnFlow Certificate",
          text: "View my certificate",
          url: shareUrl
        });

      } else {

        await navigator.clipboard.writeText(
          shareUrl
        );

        alert(
          "Certificate link copied to clipboard."
        );

      }

    } catch (error) {

      console.error(
        "Share Error:",
        error
      );

    }
  };

  // =====================================
  // PAGE
  // =====================================

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">

      <div className="max-w-6xl mx-auto">

        {/* PAGE HEADER */}

        <div className="text-center mb-10">

          <span className="inline-block bg-orange-100 text-orange-600 px-4 py-2 rounded-full font-medium mb-4">
            LearnFlow Achievement
          </span>

          <h1 className="text-4xl font-bold text-blue-900">
            Digital Certificate
          </h1>

          <p className="text-gray-600 mt-3">
            Verify, download and share your achievement.
          </p>

        </div>

        {/* CERTIFICATE */}

        <div className="bg-white rounded-3xl shadow-xl border border-blue-100 overflow-hidden">

          {/* TOP BAR */}

          <div className="h-4 bg-blue-900"></div>

          <div className="p-12 md:p-16">

            <div className="text-center">

              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-orange-100 mb-8">
                <span className="text-5xl">🏆</span>
              </div>

              <p className="uppercase tracking-[0.3em] text-blue-700 font-semibold">
                LearnFlow
              </p>

              <h1 className="text-5xl md:text-6xl font-bold text-blue-900 mt-6">
                Certificate
              </h1>

              <p className="text-xl text-orange-600 font-medium mt-2">
                Of Completion
              </p>

              <div className="w-32 h-1 bg-orange-500 mx-auto my-8 rounded-full"></div>

              <p className="text-gray-600 text-lg">
                This certificate is proudly awarded for successfully completing
              </p>

              <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mt-8">
                {certificate.achievement_text}
              </h2>

              <p className="text-gray-600 mt-10">
                Issued on
              </p>

              <p className="text-xl font-semibold text-blue-900 mt-2">
                {new Date(
                  certificate.issued_at
                ).toDateString()}
              </p>

              <div className="mt-12 flex justify-center">

                <div className="border-t-2 border-blue-200 pt-3 w-64">
                  <p className="font-bold text-blue-900">
                    LearnFlow Certification
                  </p>
                </div>

              </div>

            </div>

          </div>

          {/* BOTTOM BAR */}

          <div className="h-4 bg-orange-500"></div>

        </div>

        {/* ACTION BUTTONS */}

        <div className="flex flex-wrap justify-center gap-4 mt-10">

          {certificate.certificate_url && (

            <a
              href={`http://localhost:5000${certificate.certificate_url}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-900 hover:bg-blue-800 text-white px-8 py-3 rounded-xl font-semibold transition"
            >
              Download PDF
            </a>

          )}

          <button
            onClick={handleShare}
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-semibold transition"
          >
            Share Certificate
          </button>

        </div>

        {/* VERIFICATION CARD */}

        <div className="bg-white border border-blue-100 rounded-3xl shadow-sm p-8 mt-12">

          <h3 className="text-2xl font-bold text-blue-900">
            Certificate Verification
          </h3>

          <p className="mt-2 text-gray-600">
            Verify the authenticity of this certificate using the details below.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mt-8">

            <div className="bg-blue-50 p-5 rounded-xl">
              <p className="text-sm text-blue-600 mb-2">
                Certificate ID
              </p>

              <p className="font-semibold text-blue-900 break-all">
                {certificate.id}
              </p>
            </div>

            <div className="bg-orange-50 p-5 rounded-xl">
              <p className="text-sm text-orange-600 mb-2">
                Verification Token
              </p>

              <p className="font-semibold text-orange-700 break-all">
                {certificate.share_token}
              </p>
            </div>

            <div className="bg-blue-50 p-5 rounded-xl">
              <p className="text-sm text-blue-600 mb-2">
                Issue Date
              </p>

              <p className="font-semibold text-blue-900">
                {new Date(
                  certificate.issued_at
                ).toDateString()}
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}