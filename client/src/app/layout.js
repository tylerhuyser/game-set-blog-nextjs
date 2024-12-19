import Nav from "./_components/_shared/_nav/Nav";
import Footer from "./_components/_shared/_footer/Footer";
import { SEO } from "./_components/_shared/_seo/SEO";

import "./globals.css"
import "./layout.css"

import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

export const metadata = SEO

export default function RootLayout({ children }) {

  return (
    <html lang="en" data-arp="">
      <body>
        <div className="layout-container">

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
