import { Metadata } from "next";
import "@/app/_style/global.css";

export const metadata: Metadata = {
  title: "Quiz Master"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
