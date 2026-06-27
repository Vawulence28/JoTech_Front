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
          `https://jo-tech-b7lk.onrender.com/api/certificates/id/${id}`
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
            JoTech Achievement
          </span>

          <h1 className="text-4xl font-bold text-blue-900">
            Digital Certificate
          </h1>

          <p className="text-gray-600 mt-3">
            Verify, download and share your achievement.
          </p>

        </div>

        {/* CERTIFICATE */}

        <div className="flex justify-center">

          <div className="relative w-full max-w-7xl aspect-[1.414/1] overflow-hidden rounded-2xl bg-[#fcfaf5] shadow-2xl border-8 border-blue-900">

            {/* INNER BORDER */}

            <div className="absolute inset-4 border-4 border-orange-400 rounded-xl"></div>

            {/* WATERMARK */}

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">

              <span className="text-[18rem] md:text-[24rem] font-black text-blue-100 opacity-10 select-none">
                JO
              </span>

            </div>

            {/* CORNERS */}

            <div className="absolute top-6 left-6 w-14 h-14 border-l-4 border-t-4 border-orange-400"></div>

            <div className="absolute top-6 right-6 w-14 h-14 border-r-4 border-t-4 border-orange-400"></div>

            <div className="absolute bottom-6 left-6 w-14 h-14 border-l-4 border-b-4 border-orange-400"></div>

            <div className="absolute bottom-6 right-6 w-14 h-14 border-r-4 border-b-4 border-orange-400"></div>

            <div className="relative h-full flex flex-col justify-between px-16 py-12">

              {/* HEADER */}

              <div className="text-center">

                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-orange-100 border-4 border-orange-400 shadow">

                  <span className="text-5xl">
                    🏆
                  </span>

                </div>

                <p className="mt-4 uppercase tracking-[0.5em] text-blue-700 font-semibold">
                  JO-TECH
                </p>

                <h1 className="text-6xl font-extrabold text-blue-900 mt-3">
                  CERTIFICATE
                </h1>

                <p className="text-2xl text-orange-600 font-semibold">
                  OF COMPLETION
                </p>

              </div>

              {/* BODY */}

              <div className="text-center">

                <p className="text-xl text-gray-700">
                  This certificate is proudly awarded to
                </p>

                <h2 className="mt-6 text-6xl font-bold text-blue-900">
                  {certificate.user_name}
                </h2>

                <div className="w-40 h-1 bg-orange-500 rounded-full mx-auto my-8"></div>

                <p className="text-xl text-gray-700">
                  for successfully completing the course on
                </p>

                <h3 className="mt-5 text-4xl font-bold text-orange-600">
                  {certificate.course_name}
                </h3>

              </div>

              {/* FOOTER */}

              <div className="grid grid-cols-3 items-end">

                {/* LEFT */}

                <div className="text-left">

                  <p className="text-gray-500">
                    Issued on
                  </p>

                  <p className="mt-2 text-lg font-semibold text-blue-900">
                    {new Date(
                      certificate.issued_at
                    ).toDateString()}
                  </p>

                </div>

                {/* CENTER */}

                <div className="flex flex-col items-center">

                  <div className="w-20 h-20 rounded-full bg-orange-500 flex items-center justify-center text-white text-4xl shadow-lg">

                    ✓

                  </div>

                  <div className="border-t-2 border-gray-400 w-60 mt-6 pt-2 text-center">

                    <p className="font-semibold text-blue-900">
                      JO-Tech Certification Authority
                    </p>

                  </div>

                </div>

                {/* RIGHT */}

                <div className="text-right">

                  <p className="text-gray-500">
                    Certificate No.
                  </p>

                  <p className="mt-2 text-lg font-semibold text-blue-900">
                    {certificate.certificate_number}
                  </p>

                  <p className="mt-4 text-gray-500">
                    Verification Code
                  </p>

                  <p className="font-semibold text-orange-600 tracking-widest">
                    {certificate.verification_code}
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* ACTION BUTTONS */}

        <div className="flex flex-wrap justify-center gap-4 mt-10">

          {certificate.certificate_url && (

            <a
              href={`https://jo-tech-b7lk.onrender.com${certificate.certificate_url}`}
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