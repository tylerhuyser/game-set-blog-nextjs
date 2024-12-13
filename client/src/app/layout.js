import Footer from "./_components/_shared/_footer/Footer";
import { SEO } from "./_components/_shared/_seo/SEO";

import "./layout.css"

export const metadata = SEO

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="layout-container">

          {/* <Header /> */}

          <main className="main-container">
            {children}
          </main>

          <Footer />
          
        </div>
      </body>
    </html>
  );
}
