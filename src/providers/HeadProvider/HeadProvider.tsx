import Head from "next/head"
import NextProgressBar from "nextjs-progressbar"
import React, { FC, ReactNode } from "react"

import Favicons from "./Favicons"

const HeadProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <NextProgressBar
        color={"#e98223"}
        startPosition={0.3}
        stopDelayMs={300}
        height={3}
      />
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#2b5797" />
        <link rel="manifest" href="/site.webmanifest"></link>
        <meta charSet={"UTF-8"} />
        <meta
          name={"viewport"}
          content={"width=device-width, initial-scale=1,maximum-scale=1.0"}
        />
        <Favicons />
        <meta name={"theme-color"} content={"#FFFFFF"} />
        <meta
          name={"apple-mobile-web-app-status-bar-style"}
          content={"#FFFFFF"}
        />
      </Head>
      {children}
    </>
  )
}

export default HeadProvider
