"use client";  // NOTE: might have to change layout similar to nus aerobics format

import "./globals.css";
import { HeroUIProvider } from "@heroui/react";

// export const metadata = {
//   title: "한날 한짤",
// };

export default function RootLayout({ children }) {
  return (
    <HeroUIProvider>
      <html lang="en">
      <body>
      { children }
      </body>
      </html>
    </HeroUIProvider>
  );
}
