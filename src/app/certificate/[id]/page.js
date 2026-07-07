"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

const API_URL =
  "https://jo-tech-b7lk.onrender.com/api";

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

    if (!id) return;

    const fetchCertificate =
      async () => {

        try {

          const token =
            localStorage.getItem("token");

          const response =
            await axios.get(

              `${API_URL}/certificates/id/${id}`,

              {

                headers: {

                  Authorization:
                    `Bearer ${token}`

                }

              }

            );

          setCertificate(
            response.data.data
          );

        }

        catch (err) {

          console.error(

            "Certificate Fetch Error:",

            err

          );

          setError(

            err.response?.data?.message ||

            "Failed to load certificate."

          );

        }

        finally {

          setLoading(false);

        }

      };

    fetchCertificate();

  }, [id]);

  // =====================================
  // DOWNLOAD CERTIFICATE
  // =====================================

  const handleDownload =
    () => {

      if (!certificate) return;

      const token =
        localStorage.getItem("token");

      if (!token) {

        alert(
          "Please login again."
        );

        return;

      }

      window.open(

        `${API_URL}/certificates/download/${certificate.id}?token=${encodeURIComponent(token)}`,

        "_blank"

      );

    };

  // =====================================
  // SHARE CERTIFICATE
  // =====================================

  const handleShare =
    async () => {

      if (!certificate) return;

      const shareUrl =
        `${window.location.origin}/certificate/share/${certificate.share_token}`;

      try {

        if (

          navigator.share

        ) {

          await navigator.share({

            title:
              "My JO TECH Certificate",

            text:
              "View my JO TECH certificate of completion.",

            url:
              shareUrl

          });

        }

        else {

          await navigator.clipboard.writeText(

            shareUrl

          );

          alert(

            "Certificate link copied to clipboard."

          );

        }

      }

      catch (error) {

        console.error(

          "Share Error:",

          error

        );

      }

    };

  // =====================================
  // LOADING
  // =====================================

  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center bg-white">

        <div className="text-center">

          <div className="w-16 h-16 mx-auto rounded-full border-4 border-blue-900 border-t-transparent animate-spin"></div>

          <p className="mt-6 text-lg font-medium text-blue-900">

            Loading Certificate...

          </p>

        </div>

      </div>

    );

  }

  // =====================================
  // ERROR
  // =====================================

  if (

    error ||

    !certificate

  ) {

    return (

      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">

        <div className="max-w-lg rounded-3xl bg-white shadow-xl border border-orange-100 p-10 text-center">

          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-orange-100">

            <span className="text-5xl">

              ⚠️

            </span>

          </div>

          <h1 className="mt-8 text-4xl font-bold text-blue-900">

            Certificate Not Found

          </h1>

          <p className="mt-4 text-lg text-gray-600">

            {

              error ||

              "The requested certificate could not be found."

            }

          </p>

        </div>

      </div>

    );

  }

  // =====================================
  // PAGE
  // =====================================

  return (

    <div className="min-h-screen bg-gray-100 py-12 px-6">

      <div className="mx-auto max-w-7xl">

        {/* PAGE HEADER */}

        <div className="mb-10 text-center">

          <span className="inline-flex rounded-full bg-orange-100 px-5 py-2 text-sm font-semibold text-orange-600">

            JO TECH Achievement

          </span>

          <h1 className="mt-5 text-5xl font-extrabold text-blue-900">

            Digital Certificate

          </h1>

          <p className="mt-4 text-lg text-gray-600">

            Verify, download and share your certificate of completion.

          </p>

        </div>

        {/* CERTIFICATE STARTS BELOW */}
        <div className="overflow-x-auto py-8">

          <div className="mx-auto w-[1188px] h-[840px] relative overflow-hidden rounded-3xl bg-[#fcfaf5] border-[10px] border-blue-900 shadow-2xl">

            {/* INNER BORDER */}

            <div className="absolute inset-5 rounded-2xl border-[4px] border-orange-400"></div>

            {/* WATERMARK */}

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">

              <span className="select-none text-[260px] font-black text-blue-100 opacity-10">

                JO

              </span>

            </div>

            {/* CORNER DECORATIONS */}

            <div className="absolute top-6 left-6 h-16 w-16 border-l-4 border-t-4 border-orange-400"></div>

            <div className="absolute top-6 right-6 h-16 w-16 border-r-4 border-t-4 border-orange-400"></div>

            <div className="absolute bottom-6 left-6 h-16 w-16 border-l-4 border-b-4 border-orange-400"></div>

            <div className="absolute bottom-6 right-6 h-16 w-16 border-r-4 border-b-4 border-orange-400"></div>

            <div className="relative flex h-full flex-col justify-between px-20 py-16">

              {/* HEADER */}

              <div className="text-center">

                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border-4 border-orange-400 bg-orange-100 shadow-lg">

                  <span className="text-5xl">

                    🏆

                  </span>

                </div>

                <p className="mt-6 uppercase tracking-[0.6em] font-semibold text-blue-700">

                  JO TECH

                </p>

                <h2 className="mt-4 text-6xl font-black tracking-wide text-blue-900">

                  CERTIFICATE

                </h2>

                <p className="mt-2 text-2xl font-bold text-orange-500">

                  OF COMPLETION

                </p>

              </div>

              {/* BODY */}

              <div className="text-center">

                <p className="text-2xl text-gray-700">

                  This certificate is proudly presented to

                </p>

                <h1 className="mt-8 text-6xl font-black text-blue-900">

                  {certificate.user_name}

                </h1>

                <div className="mx-auto my-8 h-1 w-56 rounded-full bg-orange-500"></div>

                <p className="text-2xl text-gray-700">

                  for successfully completing

                </p>

                <h3 className="mt-6 text-4xl font-bold text-orange-600">

                  {certificate.course_name}

                </h3>

                <p className="mt-8 max-w-3xl mx-auto text-lg leading-8 text-gray-600">

                  This certificate confirms that the learner has successfully completed all learning objectives, practical activities and assessments required for the programme and has demonstrated the knowledge and skills expected by JO TECH.

                </p>

              </div>

              {/* FOOTER */}

              <div className="grid grid-cols-3 items-end gap-10">

                {/* ISSUE DATE */}

                <div>

                  <p className="text-lg text-gray-500">

                    Issued On

                  </p>

                  <p className="mt-2 text-2xl font-bold text-blue-900">

                    {new Date(

                      certificate.issued_at

                    ).toDateString()}

                  </p>

                </div>

                {/* SIGNATURE */}

                <div className="flex flex-col items-center">

                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-orange-500 text-5xl font-bold text-white shadow-xl">

                    ✓

                  </div>

                  <div className="mt-6 w-72 border-t-2 border-gray-400 pt-3 text-center">

                    <p className="font-semibold text-blue-900">

                      JO TECH Certification Authority

                    </p>

                  </div>

                </div>

                {/* DETAILS */}

                <div className="text-right">

                  <p className="text-lg text-gray-500">

                    Certificate Number

                  </p>

                  <p className="mt-2 text-xl font-bold text-blue-900 break-all">

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

        {/* ACTION BUTTONS */}
        <div className="mt-12 flex flex-wrap justify-center gap-5">

          <button
            onClick={handleDownload}
            className="rounded-xl bg-blue-900 px-8 py-3 font-semibold text-white transition hover:bg-blue-800"
          >
            Download PDF
          </button>

          <button
            onClick={handleShare}
            className="rounded-xl bg-orange-500 px-8 py-3 font-semibold text-white transition hover:bg-orange-600"
          >
            Share Certificate
          </button>

        </div>

        {/* =====================================
            VERIFICATION
        ====================================== */}

        <div className="mt-14 rounded-3xl border border-blue-100 bg-white p-8 shadow-sm">

          <h3 className="text-2xl font-bold text-blue-900">

            Certificate Verification

          </h3>

          <p className="mt-2 text-gray-600">

            Use the information below to verify the authenticity of this certificate.

          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-3">

            {/* CERTIFICATE ID */}

            <div className="rounded-xl bg-blue-50 p-5">

              <p className="mb-2 text-sm text-blue-600">

                Certificate ID

              </p>

              <p className="break-all font-semibold text-blue-900">

                {certificate.id}

              </p>

            </div>

            {/* SHARE TOKEN */}

            <div className="rounded-xl bg-orange-50 p-5">

              <p className="mb-2 text-sm text-orange-600">

                Share Token

              </p>

              <p className="break-all font-semibold text-orange-700">

                {certificate.share_token}

              </p>

            </div>

            {/* ISSUE DATE */}

            <div className="rounded-xl bg-blue-50 p-5">

              <p className="mb-2 text-sm text-blue-600">

                Issue Date

              </p>

              <p className="font-semibold text-blue-900">

                {new Date(
                  certificate.issued_at
                ).toDateString()}

              </p>

            </div>

          </div>

          <div className="mt-8 rounded-2xl border border-green-200 bg-green-50 p-6">

            <div className="flex items-center gap-3">

              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-600 text-xl text-white">

                ✓

              </div>

              <div>

                <h4 className="font-bold text-green-700">

                  Verified Certificate

                </h4>

                <p className="mt-1 text-sm text-green-600">

                  This certificate was issued by JO TECH and its verification details are stored securely.

                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}