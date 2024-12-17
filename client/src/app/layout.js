// import React, { useState, useEffect } from 'react'

import Nav from "./_components/_shared/_shared/_nav/Nav";
import Footer from "./_components/_shared/_shared/_footer/Footer";
import { SEO } from "./_components/_shared/_shared/_seo/SEO";
import IconLogo from "./_components/_shared/_shared/_logos/IconLogo";

// import useWindowSize from '../../utils/useWindowSize';

import "./layout.css"

export const metadata = SEO

export default function RootLayout({ children }) {

  // const [menuVisibility, setMenuVisibility] = useState(false)
  
  // let windowSize = useWindowSize()

  // useEffect(() => {
  //   if (windowSize.width > 758) {
  //     setMenuVisibility(false)
  //   }
  // }, [windowSize])

  return (
    <html lang="en" data-arp="">
      <body>
        <div className="layout-container">

          {/* <Nav menuVisibility={menuVisibility} setMenuVisibility={setMenuVisibility} /> */}
          <Nav />

          <main className="main-container">
            {children}
          </main>

          <Footer />
          
        </div>
      </body>
    </html>
  );
}
