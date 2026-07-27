import type { Metadata } from "next";
import { JetBrains_Mono, Inter, Fraunces } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const display = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Harikrishnan K P — Data Engineer",
  description:
    "Data engineer building ETL pipelines, streaming systems, and reporting infrastructure across AWS, Airflow, Spark and Kafka.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <body
        className={`${mono.variable} ${sans.variable} ${display.variable} font-sans antialiased`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
