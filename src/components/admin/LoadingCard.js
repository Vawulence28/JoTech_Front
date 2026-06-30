"use client";

// ==========================================
// LOADING CARD
// ==========================================

export default function LoadingCard() {

  return (

    <div className="rounded-2xl border bg-white p-6 animate-pulse">

      <div className="flex justify-between items-start">

        <div className="space-y-4 w-full">

          <div className="h-4 w-28 rounded bg-gray-200"></div>

          <div className="h-10 w-24 rounded bg-gray-300"></div>

          <div className="h-3 w-36 rounded bg-gray-200"></div>

        </div>

        <div className="w-12 h-12 rounded-full bg-gray-200"></div>

      </div>

    </div>

  );

}