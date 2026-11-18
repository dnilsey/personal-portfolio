import type { Metadata } from "next";
import { Poppins, Zalando_Sans_Expanded } from "next/font/google";
import "./globals.css";
import { ThemeProvider, themeInitScript } from "../context/ThemeContext";

const poppins = Poppins({
  variable: "--next-font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const zalandoSansExpanded = Zalando_Sans_Expanded({
  variable: "--next-font-zalando-sans-expanded",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nilsey Diaz | Frontend Engineer Portfolio",
  description:
    "Portfolio of Nilsey Diaz, a Front-End Team Lead building web and mobile apps with Next.js, React, TypeScript, and React Native.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <meta name="format-detection" content="telephone=no" />

        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </head>
      <body
        className={`${poppins.variable} ${zalandoSansExpanded.variable} antialiased`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
