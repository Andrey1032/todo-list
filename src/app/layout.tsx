import type { Metadata } from "next";
import { Bad_Script } from "next/font/google";
import "./globals.scss";

const badScript = Bad_Script({
    variable: "--font-bad-script",
    weight: "400",
    preload: true,
    subsets: ["cyrillic"],
});

export const metadata: Metadata = {
    title: "Доска заметок",
    description: "Создано с помощью Next.js 14",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ru">
            <body className={`${badScript.variable}`}>{children}</body>
        </html>
    );
}
