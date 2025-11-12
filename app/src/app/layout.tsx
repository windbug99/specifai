import type { Metadata } from "next";
import "./globals.css";
import { ProjectProvider } from "@/lib/context";

export const metadata: Metadata = {
  title: "Specifai - AI 기반 요구사항 명세서 작성 플랫폼",
  description: "분쟁 없는 외주 개발을 위한 명확한 요구사항 명세서 작성 플랫폼",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        <ProjectProvider>
          {children}
        </ProjectProvider>
      </body>
    </html>
  );
}
