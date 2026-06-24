"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function ProtectedRoute({
  children,
}) {
  const {
    user,
    loading,
  } = useAuth();

  const router =
    useRouter();

  useEffect(() => {
    if (
      !loading &&
      !user
    ) {
      router.replace(
        "/auth/login"
      );
    }
  }, [
    user,
    loading,
    router,
  ]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-blue-900 border-t-transparent rounded-full animate-spin mx-auto"></div>

          <p className="mt-4 text-blue-900 font-medium">
            Loading...
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return children;
}