import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import MainProviders from "@/Providers/MainProviders";
import { Toaster } from "sonner";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "AIVatar - Premium AI Avatar Generator",
  description:
    "Transform your ideas into stunning, high-quality digital avatars in seconds with our advanced AI generation engine.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
        <MainProviders>{children}</MainProviders>
        <Toaster position="top-right" closeButton />
      </body>
    </html>
  );
}
