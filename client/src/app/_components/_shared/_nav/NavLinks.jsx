import Link from 'next/link';

import "./NavLinks.css"

export default function NavLinks({context, onLinkClick, navVisibility, isVisible }) {

  const links = [
    { name: 'HOME', path: '/', external: false },
    { name: 'ABOUT', path: '/about', external: false },
    { name: 'RANKINGS', path: 'https://rankings.gamesetblog.com/', external: true },
  ];

  const isDesktop = context === "desktop";
  const isMobile = context === 'mobile';
  const containerClass = isDesktop 
  ? `${context}-nav-links-container` 
  : `mobile-menu ${navVisibility ? 'mobile-menu-visible' : 'mobile-menu-hidden'}`;

  return (
    <div
      className={containerClass}
    >
      {links.map((link, index) => {
        const linkProps = {
          className: `${context}-nav-link ${link.external ? 'external-nav-link' : ''} ${isVisible ? 'nav-link-stagger' : ''}`,
          href: link.path,
          style: { 
            animationDelay: `${index * 100}ms`,
            opacity: isVisible ? undefined : 0
          },
          ...(isMobile && { onClick: onLinkClick }),
          ...(link.external && { 
            target: "_blank",
            rel: "noopener noreferrer" 
          })
        };

        return <Link key={index} {...linkProps}>{link.name}</Link>;
      })}
    </div>
  );
}
