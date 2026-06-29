"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

export default function CertificatePage() {

  const { id } = useParams();

  const [certificate, setCertificate] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  // =====================================
  // FETCH CERTIFICATE
  // =====================================

  useEffect(() => {

    const fetchCertificate =
      async () => {

        try {

          const response =
            await axios.get(
              `https://jo-tech-b7lk.onrender.com/api/certificates/id/${id}`
            );

          setCertificate(
            response.data.data
          );

        } catch (err) {

          console.error(
            "Certificate Fetch Error:",
            err
          );

          setError(
            "Failed to load certificate."
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
  // DOWNLOAD CERTIFICATE
  // =====================================

  const handleDownload =
    async () => {

      try {

        const token =
          localStorage.getItem("token");

        const response =
          await axios.get(
            `https://jo-tech-b7lk.onrender.com/api/certificates/download/${certificate.id}`,
            {
              responseType: "blob",
              headers: {
                Authorization:
                  `Bearer ${token}`
              }
            }
          );

        const blob =
          new Blob(
            [response.data],
            {
              type:
                "application/pdf"
            }
          );

        const downloadUrl =
          window.URL.createObjectURL(
            blob
          );

        const link =
          document.createElement("a");

        link.href =
          downloadUrl;

        link.download =
          `${certificate.user_name.replace(/\s+/g, "_")}_Certificate.pdf`;

        document.body.appendChild(
          link
        );

        link.click();

        link.remove();

        window.URL.revokeObjectURL(
          downloadUrl
        );

      } catch (err) {

        console.error(
          "Download Error:",
          err
        );

        alert(
          "Unable to download certificate."
        );

      }

    };

  // =====================================
  // SHARE CERTIFICATE
  // =====================================

  const handleShare =
    async () => {

      const shareUrl =
        `${window.location.origin}/certificate/share/${certificate.share_token}`;

      try {

        if (navigator.share) {

          await navigator.share({

            title:
              "My Jo-Tech Certificate",

            text:
              "View my certificate of completion.",

            url:
              shareUrl

          });

        } else {

          await navigator.clipboard.writeText(
            shareUrl
          );

          alert(
            "Certificate link copied to clipboard."
          );

        }

      } catch (err) {

        console.error(
          "Share Error:",
          err
        );

      }

    };

  // =====================================
  // LOADING STATE
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
  // ERROR STATE
  // =====================================

  if (error || !certificate) {

    return (

      <div className="min-h-screen flex items-center justify-center bg-white px-6">

        <div className="max-w-lg text-center">

          <div className="w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-6">

            <span className="text-3xl">
              ⚠️
            </span>

          </div>

          <h1 className="text-4xl font-bold text-blue-900">
            Certificate Not Found
          </h1>

          <p className="mt-4 text-gray-600">
            {error ||
              "The requested certificate could not be found."}
          </p>

        </div>

      </div>

    );

  }

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

        <div className="w-full overflow-x-auto py-8">

          <div className="mx-auto w-[1188px] h-[840px] relative overflow-hidden rounded-2xl bg-[#fcfaf5] shadow-2xl border-[10px] border-blue-900">

            {/* INNER BORDER */}

            <div className="absolute inset-4 border-[4px] border-orange-400 rounded-xl"></div>

            {/* WATERMARK */}

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">

              <span className="text-[260px] font-black text-blue-100 opacity-10 select-none">
                JO
              </span>

            </div>

            {/* CORNER DECORATIONS */}

            <div className="absolute top-6 left-6 w-16 h-16 border-l-4 border-t-4 border-orange-400"></div>

            <div className="absolute top-6 right-6 w-16 h-16 border-r-4 border-t-4 border-orange-400"></div>

            <div className="absolute bottom-6 left-6 w-16 h-16 border-l-4 border-b-4 border-orange-400"></div>

            <div className="absolute bottom-6 right-6 w-16 h-16 border-r-4 border-b-4 border-orange-400"></div>

            <div className="relative flex flex-col justify-between h-full px-20 py-16">

              {/* HEADER */}

              <div className="text-center">

                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-orange-100 border-4 border-orange-400 shadow-lg">

                  <span className="text-5xl">
                    🏆
                  </span>

                </div>

                <p className="mt-5 uppercase tracking-[0.6em] text-blue-700 font-semibold">
                  JO-TECH
                </p>

                <h1 className="mt-3 text-6xl font-black tracking-wide text-blue-900">
                  CERTIFICATE
                </h1>

                <p className="text-2xl font-semibold text-orange-600">
                  OF COMPLETION
                </p>

              </div>

              {/* BODY */}

              <div className="text-center">

                <p className="text-2xl text-gray-700">
                  This certificate is proudly awarded to
                </p>

                <h2 className="mt-8 text-6xl font-bold text-blue-900">
                  {certificate.user_name}
                </h2>

                <div className="w-52 h-1 rounded-full bg-orange-500 mx-auto my-8"></div>

                <p className="text-2xl text-gray-700">
                  for successfully completing the course on
                </p>

                <h3 className="mt-6 text-4xl font-bold text-orange-600">
                  {certificate.course_name}
                </h3>

              </div>

              {/* FOOTER */}

              <div className="grid grid-cols-3 gap-8 items-end">

                {/* ISSUE DATE */}

                <div>

                  <p className="text-lg text-gray-500">
                    Issued on
                  </p>

                  <p className="mt-2 text-2xl font-semibold text-blue-900">
                    {new Date(
                      certificate.issued_at
                    ).toDateString()}
                  </p>

                </div>

                {/* CERTIFICATION */}

                <div className="flex flex-col items-center">

                  <div className="w-24 h-24 rounded-full bg-orange-500 flex items-center justify-center shadow-lg text-white text-5xl">

                    ✓

                  </div>

                  <div className="w-72 mt-6 pt-3 border-t-2 border-gray-400 text-center">

                    <p className="text-lg font-semibold text-blue-900">
                      JO-Tech Certification Authority
                    </p>

                  </div>

                </div>

                {/* CERTIFICATE DETAILS */}

                <div className="text-right">

                  <p className="text-lg text-gray-500">
                    Certificate Number
                  </p>

                  <p className="mt-2 text-xl font-bold text-blue-900">
                    {certificate.certificate_number}
                  </p>

                  <p className="mt-6 text-lg text-gray-500">
                    Verification Code
                  </p>

                  <p className="mt-2 text-xl font-bold tracking-[0.25em] text-orange-600">
                    {certificate.verification_code}
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* =====================================
            ACTION BUTTONS
        ====================================== */}

        <div className="flex flex-wrap justify-center gap-4 mt-10">

          <button
            onClick={handleDownload}
            className="bg-blue-900 hover:bg-blue-800 text-white px-8 py-3 rounded-xl font-semibold transition duration-200"
          >
            Download PDF
          </button>

          <button
            onClick={handleShare}
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-semibold transition duration-200"
          >
            Share Certificate
          </button>

        </div>

        {/* =====================================
            VERIFICATION CARD
        ====================================== */}

        <div className="bg-white border border-blue-100 rounded-3xl shadow-sm p-8 mt-12">

          <h3 className="text-2xl font-bold text-blue-900">
            Certificate Verification
          </h3>

          <p className="mt-2 text-gray-600">
            Verify the authenticity of this certificate using the details below.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mt-8">

            {/* CERTIFICATE ID */}

            <div className="bg-blue-50 rounded-xl p-5">

              <p className="text-sm text-blue-600 mb-2">
                Certificate ID
              </p>

              <p className="font-semibold text-blue-900 break-all">
                {certificate.id}
              </p>

            </div>

            {/* SHARE TOKEN */}

            <div className="bg-orange-50 rounded-xl p-5">

              <p className="text-sm text-orange-600 mb-2">
                Verification Token
              </p>

              <p className="font-semibold text-orange-700 break-all">
                {certificate.share_token}
              </p>

            </div>

            {/* ISSUE DATE */}

            <div className="bg-blue-50 rounded-xl p-5">

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