"use client";

import { useEffect, useState } from "react";

import {
  getCertificates,
} from "@/services/adminApi";

export default function CertificatesPage() {

  const [certificates, setCertificates] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadCertificates();
  }, []);

  async function loadCertificates() {

    try {

      setLoading(true);

      const response =
        await getCertificates();

      setCertificates(
        response.data || []
      );

    } catch (error) {

      console.error(
        "Certificates Error:",
        error
      );

      setCertificates([]);

    } finally {

      setLoading(false);

    }

  }

  // ==========================================
  // SUMMARY
  // ==========================================

  const totalCertificates =
    certificates.length;

  const today =
    new Date().toDateString();

  const issuedToday =
    certificates.filter(
      (certificate) =>
        new Date(
          certificate.issued_at
        ).toDateString() === today
    ).length;

  const now =
    new Date();

  const issuedThisMonth =
    certificates.filter((certificate) => {

      const date =
        new Date(
          certificate.issued_at
        );

      return (

        date.getMonth() ===
          now.getMonth()

        &&

        date.getFullYear() ===
          now.getFullYear()

      );

    }).length;

  const uniqueLearners =
    new Set(

      certificates.map(
        (certificate) =>
          certificate.user_id
      )

    ).size;

  // ==========================================

  return (

    <div className="space-y-8">

      <div>

        <h1 className="text-3xl font-black text-blue-900">
          Certificates
        </h1>

        <p className="mt-2 text-gray-500">
          View all issued learner certificates.
        </p>

      </div>

      {/* ====================================== */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <Card
          title="Total Certificates"
          value={totalCertificates}
        />

        <Card
          title="Issued Today"
          value={issuedToday}
        />

        <Card
          title="Issued This Month"
          value={issuedThisMonth}
        />

        <Card
          title="Learners Certified"
          value={uniqueLearners}
        />

      </div>

      {/* ====================================== */}

      <div className="overflow-hidden rounded-2xl border bg-white shadow">

        <div className="overflow-x-auto">

          <table className="min-w-full">

            <thead className="bg-gray-50">

              <tr>

                <th className="px-6 py-4 text-left">
                  Certificate
                </th>

                <th className="px-6 py-4 text-left">
                  Learner
                </th>

                <th className="px-6 py-4 text-left">
                  Course
                </th>

                <th className="px-6 py-4 text-left">
                  Issued
                </th>

                <th className="px-6 py-4 text-left">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {loading && (

                <tr>

                  <td
                    colSpan={5}
                    className="px-6 py-12 text-center"
                  >
                    Loading certificates...
                  </td>

                </tr>

              )}

              {!loading &&
                certificates.length === 0 && (

                <tr>

                  <td
                    colSpan={5}
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    No certificates found.
                  </td>

                </tr>

              )}

              {!loading &&
                certificates.map((certificate) => (

                <tr
                  key={certificate.id}
                  className="border-t"
                >

                  <td className="px-6 py-4 font-medium">

                    {certificate.certificate_number}

                  </td>

                  <td className="px-6 py-4">

                    {certificate.user_name}

                  </td>

                  <td className="px-6 py-4">

                    {certificate.course_name}

                  </td>

                  <td className="px-6 py-4">

                    {new Date(
                      certificate.issued_at
                    ).toLocaleDateString()}

                  </td>

                  <td className="px-6 py-4">

                    <div className="flex gap-4">

                      <a
                        href={`${process.env.NEXT_PUBLIC_API_URL}/admin/certificates/download/${certificate.id}`}
                        target="_blank"
                        className="text-blue-600 hover:underline"
                      >
                        Download
                      </a>

                      <a
                        href={`${process.env.NEXT_PUBLIC_API_URL}/admin/certificates/verify/${certificate.certificate_number}`}
                        target="_blank"
                        className="text-green-600 hover:underline"
                      >
                        Verify
                      </a>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );

}

function Card({

  title,

  value

}) {

  return (

    <div className="rounded-2xl border bg-white p-6 shadow">

      <p className="text-sm text-gray-500">
        {title}
      </p>

      <h2 className="mt-3 text-3xl font-black text-blue-900">
        {value}
      </h2>

    </div>

  );

}