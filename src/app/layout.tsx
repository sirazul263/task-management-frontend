import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import ProgressBarProvider from "@/components/progress-bar-provider";
import QueryProviders from "@/components/query-provider";
import { Toaster } from "@/components/ui/sonner";
import { NuqsAdapter } from "nuqs/adapters/next/app";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Task Management",
  description: "A task management system",
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "antialiased min-h-screen")}>
        <ProgressBarProvider>
          <QueryProviders>
            <Toaster />
            <NuqsAdapter>{children}</NuqsAdapter>
          </QueryProviders>
        </ProgressBarProvider>
      </body>
    </html>
  );
}
