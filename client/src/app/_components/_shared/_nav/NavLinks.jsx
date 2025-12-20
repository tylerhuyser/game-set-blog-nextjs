import Link from 'next/link';

import "./NavLinks.css"

export default function NavLinks({context, onLinkClick, navVisibility}) {

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
      <div className={containerClass}>
        {links.map((link, index) => {
          const linkProps = {
            key: index,
            className: `${context}-nav-link ${link.external ? 'external-nav-link' : ''}`,
            href: link.path,
            ...(isMobile && { onClick: onLinkClick }),
            ...(link.external && { 
              target: "_blank",
              rel: "noopener noreferrer" 
            })
          }

          return <Link {...linkProps}>{link.name}</Link>;
        })}
      </div>
    );
  };
