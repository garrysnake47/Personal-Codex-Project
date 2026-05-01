import "./styles.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Daily Work Log",
  description: "Track your daily work logs with a clean, modern interface."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
