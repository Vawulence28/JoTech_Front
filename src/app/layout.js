import "./globals.css";

import { AuthProvider } from "@/contexts/AuthContext";
import Navbar from "@/components/layout/Navbar";

export const metadata = {
  title: "LearnFlow",
  description: "AI Learning Path Generator",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white text-black">

        <AuthProvider>

          {/* GLOBAL NAVBAR */}
          <Navbar />

          {/* PAGE CONTENT */}
          <main className="min-h-screen">
            {children}
          </main>

        </AuthProvider>

      </body>
    </html>
  );
}