import "@mantine/core/styles.css";
import React from "react";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import { theme } from "../../theme";
import "./global.css";
import { HeaderMenu } from "../components/headers";

export const metadata = {
  title: "Monitoring Produksi",
  description: "I am using Mantine with Next.js!",
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body className="bg-[#2f2c50]">
        <MantineProvider theme={theme}>
          <HeaderMenu />
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
