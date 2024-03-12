import type { Metadata } from "next";
import "./globals.css";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import Header from "@/components/Header";
import { PiWaveformDuotone } from "react-icons/pi";
import Navbar from "@/components/Navbar";
import Player from "@/components/Player/Player";
import ReduxProvider from "@/redux/Provider";
import "./favicon.ico";
import { GoogleAnalytics } from "@next/third-parties/google";

const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
});

export const metadata: Metadata = {
    title: "VibeWave",
    description: "A Music Streaming Platform",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark">
            <ReduxProvider>
                <body
                    className={cn(
                        "min-h-screen bg-background font-sans antialiased",
                        fontSans.variable
                    )}
                >
                    <GoogleAnalytics gaId="G-EH2FHFYTR4" />
                    <Header />
                    <Navbar />
                    {children}
                    <Player />
                </body>
            </ReduxProvider>
        </html>
    );
}
