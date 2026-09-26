import type { Metadata } from "next";
import { Oswald, Inter } from "next/font/google";
import "./globals.css";
import { WorkoutProvider } from "@/context/WorkoutContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Toaster } from "sonner";
const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
export const metadata: Metadata = {
  title: "FitLog — Workout Library & Gym Companion",
  description:
    "FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${oswald.variable} ${inter.variable} dark`}>
      <body className="min-h-screen bg-[#090b0e] text-white flex flex-col font-sans antialiased selection:bg-[#ccff00] selection:text-black">
        <WorkoutProvider>
          <Navbar></Navbar>
          <main className="flex-1">{children}</main>
          <Footer></Footer>
          <Toaster position="bottom-right" theme="dark"
            toastOptions={{
              style: {
                background: "#161b26",
                border: "1px solid #222938",
                color: "#ffffff",
              },
            }}
          />
        </WorkoutProvider>
      </body>
    </html>
  );
};
