import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Orbyte - AI Copilot for Cloud Compliance",
    description: "Unify compliance and sustainability with the power of Vertex AI",
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
