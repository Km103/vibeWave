import type { Metadata } from "next";
import "./globals.css";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import Header from "@/components/Header";
import { PiWaveformDuotone } from "react-icons/pi";
import Navbar from "@/components/Navbar";
import Player from "@/components/Player/Player";
import ReduxProvider from "@/redux/Provider";

const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
});

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark">
            <head>
                <title>Vibewave</title>
            </head>

            <ReduxProvider>
                <body
                    className={cn(
                        "min-h-screen bg-background font-sans antialiased",
                        fontSans.variable
                    )}
                >
                    <Header />
                    <Navbar />
                    {children}
                    <Player />
                </body>
            </ReduxProvider>
        </html>
    );
}
