import "./globals.css";
import type { Metadata } from "next";
import { Providers } from "../provider";
import { AppbarClient } from "components/AppBarClient";


export const metadata: Metadata = {
  title: "MoneyTXN.User",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <Providers>
        <body className="font-sans">
          <div className="min-w-screen min-h-screen bg-[#f5f5f5]"> 
            <AppbarClient />
            {children}
          </div>
          </body>
      </Providers>
    </html>
  );
}
