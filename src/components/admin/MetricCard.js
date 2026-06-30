"use client";

import Link from "next/link";

// ==========================================
// METRIC CARD
// ==========================================

export default function MetricCard({

  title,

  value,

  icon,

  color = "blue",

  subtitle,

  href

}) {

  const colors = {

    blue:
      "bg-blue-50 border-blue-200 text-blue-900",

    orange:
      "bg-orange-50 border-orange-200 text-orange-700",

    green:
      "bg-green-50 border-green-200 text-green-700",

    purple:
      "bg-purple-50 border-purple-200 text-purple-700",

    red:
      "bg-red-50 border-red-200 text-red-700",

    yellow:
      "bg-yellow-50 border-yellow-200 text-yellow-700"

  };

  const card = (

    <div

      className={`

      rounded-2xl

      border

      p-6

      transition-all

      duration-300

      hover:shadow-lg

      hover:-translate-y-1

      ${colors[color] || colors.blue}

      `}

    >

      {/* TOP */}

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm font-medium opacity-80">

            {title}

          </p>

          <h2 className="mt-3 text-4xl font-black">

            {value}

          </h2>

        </div>

        <div className="text-5xl">

          {icon}

        </div>

      </div>

      {/* FOOTER */}

      {

        subtitle && (

          <div className="mt-6">

            <p className="text-sm opacity-75">

              {subtitle}

            </p>

          </div>

        )

      }

    </div>

  );

  if (href) {

    return (

      <Link href={href}>

        {card}

      </Link>

    );

  }

  return card;

}